#!/usr/bin/env node
/**
 * sync-project-images.mjs
 *
 * Fetches images from the Cloudinary "code projects" folder and patches
 * content/projects.ts with the correct image URLs.
 *
 * Usage:
 *   CLOUDINARY_API_KEY=your_key CLOUDINARY_API_SECRET=your_secret node scripts/sync-project-images.mjs
 */

import { readFileSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const CLOUD = "dyqdtpd3b"
const FOLDER = "code projects"

const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

if (!API_KEY || !API_SECRET) {
  console.error("Missing credentials. Run as:")
  console.error("  CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=yyy node scripts/sync-project-images.mjs")
  process.exit(1)
}

const AUTH = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64")

// Maps the filename stem (what the user named the file) to the project title in projects.ts
const FILENAME_TO_TITLE = {
  finalyearproject:   "Murrieta: Connected",
  website:            "Personal Portfolio",
  Metronome:          "Metronome",
  ambients:           "Ambient Reverie",
  affirmations:       "The Affirmation Garden",
  cherished_memories: "Cherished Memories Photography",
  infowink:           "Metronome",
}

function cdnUrl(publicId, format) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_800/${publicId}.${format}`
}

async function fetchFolder(folder) {
  const params = new URLSearchParams({
    expression: `asset_folder="${folder}"`,
    max_results: "100",
  })
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/resources/search?${params}`,
    { headers: { Authorization: `Basic ${AUTH}` } }
  )
  const data = await res.json()
  if (data.error) throw new Error(`Cloudinary: ${data.error.message}`)
  return data.resources ?? []
}

async function main() {
  console.log(`Fetching "${FOLDER}" folder from Cloudinary...`)
  const resources = await fetchFolder(FOLDER)
  console.log(`Found ${resources.length} image(s):\n`)

  // Build a map of title → URL
  const urlMap = {}
  for (const r of resources) {
    // public_id looks like "finalyearproject_abc123" — strip the Cloudinary suffix
    // by matching against known stems
    const stem = Object.keys(FILENAME_TO_TITLE).find((s) =>
      r.public_id === s || r.public_id.startsWith(s + "_") || r.public_id.endsWith("/" + s) || r.public_id.includes("/" + s + "_")
    )
    if (!stem) {
      console.log(`  [skipped] ${r.public_id} — no matching project stem`)
      continue
    }
    const title = FILENAME_TO_TITLE[stem]
    const url = cdnUrl(r.public_id, r.format)
    urlMap[title] = url
    console.log(`  ${title} → ${url}`)
  }

  if (Object.keys(urlMap).length === 0) {
    console.log("\nNo matching images found. Check that filenames match:", Object.keys(FILENAME_TO_TITLE).join(", "))
    process.exit(1)
  }

  // Patch projects.ts: for each project title found, insert or update its image field
  const projectsPath = resolve(ROOT, "content", "projects.ts")
  let content = readFileSync(projectsPath, "utf8")

  for (const [title, url] of Object.entries(urlMap)) {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    // Match the full project block from title to its closing },
    const blockRegex = new RegExp(
      `(title:\\s*"${escapedTitle}"[\\s\\S]*?)(\\s*},)`,
    )
    const blockMatch = content.match(blockRegex)
    if (!blockMatch) {
      console.log(`\n  ${title}: block not found in projects.ts, skipping`)
      continue
    }
    const block = blockMatch[1]
    if (block.includes("image:")) {
      // Already has an image — replace the existing URL instead of adding a duplicate
      content = content.replace(blockRegex, (_, b, close) =>
        b.replace(/image:\s*"[^"]*"/, `image: "${url}"`) + close
      )
      console.log(`  ${title}: image updated`)
    } else {
      // Inject image field before featured:
      const titleRegex = new RegExp(
        `(title:\\s*"${escapedTitle}"[\\s\\S]*?)(featured:)`
      )
      content = content.replace(titleRegex, `$1image: "${url}",\n    $2`)
      console.log(`  ${title}: image added`)
    }
  }

  writeFileSync(projectsPath, content, "utf8")
  console.log("\n✓ content/projects.ts updated. Commit and push to deploy.")
}

main().catch((err) => { console.error(err); process.exit(1) })
