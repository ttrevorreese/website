#!/usr/bin/env node
/**
 * migrate-cloudinary-to-b2.mjs
 *
 * One-time migration: downloads every photo from Cloudinary and uploads it to
 * Backblaze B2. Then rewrites all content/ files to use the new B2 URLs.
 * Safe to re-run — already-uploaded files are skipped.
 *
 * Usage (PowerShell):
 *   $env:B2_KEY_ID="xxx"; $env:B2_APPLICATION_KEY="yyy"
 *   node scripts/migrate-cloudinary-to-b2.mjs
 */

import { readFileSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { createHash } from "crypto"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const B2_KEY_ID = process.env.B2_KEY_ID
const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY
const BUCKET_NAME = "ttrevorreese-photos"

if (!B2_KEY_ID || !B2_APPLICATION_KEY) {
  console.error("Missing credentials. In PowerShell:")
  console.error('  $env:B2_KEY_ID="xxx"; $env:B2_APPLICATION_KEY="yyy"')
  console.error("  node scripts/migrate-cloudinary-to-b2.mjs")
  process.exit(1)
}

const CONTENT_FILES = [
  "content/locations.ts",
  "content/hero-photos.ts",
  "content/projects.ts",
  "content/profile.ts",
]

// ─── URL helpers ──────────────────────────────────────────────────────────────

// Extract all unique Cloudinary URLs from a block of text
function extractCloudinaryUrls(text) {
  const regex = /https:\/\/res\.cloudinary\.com\/dyqdtpd3b\/image\/upload\/[^"'\s]+/g
  return [...new Set(text.match(regex) ?? [])]
}

// Strip Cloudinary transform params to get the original file URL
// https://...upload/f_auto,q_auto,w_800/IMG_xxx.jpg → https://...upload/IMG_xxx.jpg
function stripTransforms(url) {
  return url.replace(/\/image\/upload\/[^/]+\//, "/image/upload/")
}

// Derive the B2 object key from a Cloudinary URL (e.g. "IMG_xxx.jpg")
function getB2Key(url) {
  const clean = stripTransforms(url)
  const match = clean.match(/\/image\/upload\/(.+)$/)
  if (!match) throw new Error(`Cannot parse Cloudinary URL: ${url}`)
  return match[1]
}

function getContentType(filename) {
  const ext = filename.split(".").pop().toLowerCase()
  return (
    { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" }[ext] ??
    "application/octet-stream"
  )
}

// ─── B2 API ───────────────────────────────────────────────────────────────────

async function authorize() {
  const res = await fetch("https://api.backblazeb2.com/b2api/v2/b2_authorize_account", {
    headers: {
      Authorization: `Basic ${Buffer.from(`${B2_KEY_ID}:${B2_APPLICATION_KEY}`).toString("base64")}`,
    },
  })
  if (!res.ok) throw new Error(`Auth failed: ${await res.text()}`)
  return res.json()
  // Returns: { accountId, authorizationToken, apiUrl, downloadUrl, ... }
}

async function getBucketId(apiUrl, authToken, accountId) {
  const res = await fetch(`${apiUrl}/b2api/v2/b2_list_buckets`, {
    method: "POST",
    headers: { Authorization: authToken, "Content-Type": "application/json" },
    body: JSON.stringify({ accountId, bucketName: BUCKET_NAME }),
  })
  if (!res.ok) throw new Error(`Failed to list buckets: ${await res.text()}`)
  const { buckets } = await res.json()
  if (!buckets?.length) throw new Error(`Bucket "${BUCKET_NAME}" not found — check the name and credentials`)
  return buckets[0].bucketId
}

async function getUploadUrl(apiUrl, authToken, bucketId) {
  const res = await fetch(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
    method: "POST",
    headers: { Authorization: authToken, "Content-Type": "application/json" },
    body: JSON.stringify({ bucketId }),
  })
  if (!res.ok) throw new Error(`Failed to get upload URL: ${await res.text()}`)
  return res.json()
}

// Load all existing file names from B2 into a Set in one paginated sweep.
// Far cheaper than one b2_list_file_names call per file.
async function loadExistingFiles(apiUrl, authToken, bucketId) {
  const existing = new Set()
  let startFileName = undefined
  while (true) {
    const params = new URLSearchParams({ bucketId, maxFileCount: "1000" })
    if (startFileName) params.set("startFileName", startFileName)
    const res = await fetch(`${apiUrl}/b2api/v2/b2_list_file_names?${params}`, {
      headers: { Authorization: authToken },
    })
    if (!res.ok) break
    const { files, nextFileName } = await res.json()
    for (const f of files ?? []) existing.add(f.fileName)
    if (!nextFileName) break
    startFileName = nextFileName
  }
  return existing
}

async function uploadFile(uploadUrl, uploadAuthToken, fileName, buffer) {
  const sha1 = createHash("sha1").update(buffer).digest("hex")
  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: uploadAuthToken,
      "X-Bz-File-Name": encodeURIComponent(fileName),
      "Content-Type": getContentType(fileName),
      "Content-Length": String(buffer.length),
      "X-Bz-Content-Sha1": sha1,
    },
    body: buffer,
  })
  if (!res.ok) throw new Error(`Upload failed for ${fileName}: ${await res.text()}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Read all content files
  const fileContents = {}
  let allText = ""
  for (const f of CONTENT_FILES) {
    const text = readFileSync(resolve(ROOT, f), "utf8")
    fileContents[f] = text
    allText += text
  }

  const allUrls = extractCloudinaryUrls(allText)
  console.log(`Found ${allUrls.length} Cloudinary URLs across content files`)

  // Group by B2 key — multiple URLs with different transforms point to the same file
  const keyToUrls = {}
  for (const url of allUrls) {
    const key = getB2Key(url)
    if (!keyToUrls[key]) keyToUrls[key] = []
    keyToUrls[key].push(url)
  }
  const uniqueKeys = Object.keys(keyToUrls)
  console.log(`${uniqueKeys.length} unique files to migrate\n`)

  // Connect to B2
  console.log("Connecting to B2...")
  const auth = await authorize()
  const bucketId = await getBucketId(auth.apiUrl, auth.authorizationToken, auth.accountId)
  let { uploadUrl, authorizationToken: uploadAuthToken } = await getUploadUrl(
    auth.apiUrl,
    auth.authorizationToken,
    bucketId
  )

  const downloadBase = `${auth.downloadUrl}/file/${BUCKET_NAME}`
  console.log(`Download base URL: ${downloadBase}`)

  console.log("Loading existing files from B2...")
  const existingFiles = await loadExistingFiles(auth.apiUrl, auth.authorizationToken, bucketId)
  console.log(`${existingFiles.size} files already in bucket\n`)

  let uploaded = 0
  let skipped = 0
  let failed = 0
  const urlMapping = {}

  for (const [key, cloudinaryUrls] of Object.entries(keyToUrls)) {
    const b2Url = `${downloadBase}/${key}`

    // All transform variants of this file map to the same B2 URL
    for (const url of cloudinaryUrls) urlMapping[url] = b2Url

    if (existingFiles.has(key)) {
      process.stdout.write(`  [skip] ${key}\n`)
      skipped++
      continue
    }

    try {
      const originalUrl = stripTransforms(cloudinaryUrls[0])
      const res = await fetch(originalUrl)
      if (!res.ok) throw new Error(`Download returned ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())

      await uploadFile(uploadUrl, uploadAuthToken, key, buffer)
      process.stdout.write(`  [ok]   ${key}\n`)
      uploaded++
    } catch (err) {
      process.stdout.write(`  [fail] ${key}: ${err.message}\n`)
      failed++
      // B2 invalidates the upload URL after a failure — get a fresh one
      try {
        const fresh = await getUploadUrl(auth.apiUrl, auth.authorizationToken, bucketId)
        uploadUrl = fresh.uploadUrl
        uploadAuthToken = fresh.authorizationToken
      } catch {}
    }
  }

  console.log(`\nMigration complete: ${uploaded} uploaded, ${skipped} skipped, ${failed} failed`)

  if (failed > 0) {
    console.warn(
      `\n⚠  ${failed} file(s) could not be fetched from Cloudinary (likely deleted).` +
      "\n   Their URLs will remain unchanged in content files — those images will be broken." +
      "\n   All other URLs will still be rewritten to B2.\n"
    )
  }

  // Rewrite content files (only URLs that mapped successfully are replaced)
  console.log("Updating content files...")
  for (const [filePath, originalText] of Object.entries(fileContents)) {
    let updated = originalText
    for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
      updated = updated.replaceAll(oldUrl, newUrl)
    }
    if (updated !== originalText) {
      writeFileSync(resolve(ROOT, filePath), updated, "utf8")
      console.log(`  Updated ${filePath}`)
    }
  }

  // next.config.ts already has `unoptimized: true` — no remotePatterns needed for B2.

  console.log("\nAll done. Run `npm run dev` to verify images load correctly.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
