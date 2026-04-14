#!/usr/bin/env node
/**
 * sync-cloudinary.mjs
 *
 * Fetches every photo from every Cloudinary location folder and
 * regenerates content/locations.ts with real URLs and dimensions.
 *
 * Usage:
 *   CLOUDINARY_API_KEY=your_key CLOUDINARY_API_SECRET=your_secret node scripts/sync-cloudinary.mjs
 *
 * Find your key + secret at:
 *   Cloudinary Dashboard → Settings → API Keys
 */

import { writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const CLOUD = "dyqdtpd3b"
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

if (!API_KEY || !API_SECRET) {
  console.error("Missing credentials. Run as:")
  console.error("  CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=yyy node scripts/sync-cloudinary.mjs")
  process.exit(1)
}

const AUTH = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64")

// ─── Static location metadata ─────────────────────────────────────────────────
// galleryStyle, featured, camera — edit these here, not in locations.ts
const LOCATIONS = [
  { slug: "chicago",              name: "Chicago",                 country: "USA",          year: 2019, featured: false, galleryStyle: "editorial", camera: null, folder: "2019 chicago",                   coverKey: "2019_chicago_cover_hfl94t",                     heroKey: "2019_chicago_hero_oasna0" },
  { slug: "edinburgh",            name: "Edinburgh",               country: "Scotland",     year: 2021, featured: true,  galleryStyle: "editorial", camera: null, folder: "2021 edinburgh",                 coverKey: "2021_edinburgh_cover_pqaxvp",                    heroKey: "2021_edinburgh_hero_tnsqmi" },
  { slug: "lake-tahoe",           name: "Lake Tahoe",              country: "USA",          year: 2021, featured: false, galleryStyle: "masonry",   camera: null, folder: "2021 lake tahoe",                coverKey: "2021_lake_tahoe_cover_f6lkzh",                   heroKey: "2021_lake_tahoe_hero_t5xibs" },
  { slug: "shrewsbury-ironbridge",name: "Shrewsbury & Ironbridge", country: "England",      year: 2021, featured: false, galleryStyle: "editorial", camera: null, folder: "2021 shrewsbury and ironbridge", coverKey: "2021_shrewsbury_and_ironbridge_cover_naakhn",    heroKey: "2021_shrewsbury_and_ironbridge_hero_eevzoz" },
  { slug: "berlin",               name: "Berlin",                  country: "Germany",      year: 2022, featured: false, galleryStyle: "editorial", camera: null, folder: "2022 berlin",                    coverKey: "2022_berlin_cover_xjw0gf",                       heroKey: "2022_berlin_hero_f4dc37" },
  { slug: "copenhagen",           name: "Copenhagen",              country: "Denmark",      year: 2022, featured: false, galleryStyle: "editorial", camera: null, folder: "2022 copenhagen",                coverKey: "2022_copenhagen_cover_nv8ver",                   heroKey: "2022_copenhagen_hero_nus1qq" },
  { slug: "hamburg",              name: "Hamburg",                 country: "Germany",      year: 2022, featured: false, galleryStyle: "masonry",   camera: null, folder: "2022 hamburg",                   coverKey: "2022_hamburg_cover_oegrxq",                      heroKey: "2022_hamburg_hero_lc1fbq" },
  { slug: "murrieta-car-show-2022",name:"Murrieta Car Show",       country: "USA",          year: 2022, featured: false, galleryStyle: "masonry",   camera: null, folder: "2022 murrieta car show",         coverKey: "2022_murrieta_car_show_cover_qkzxjr",            heroKey: "2022_murrieta_car_show_hero_vjmcyk" },
  { slug: "prague",               name: "Prague",                  country: "Czech Republic",year:2022, featured: true,  galleryStyle: "editorial", camera: null, folder: "2022 prague",                    coverKey: "2022_prague_cover_bsgwo5",                       heroKey: "2022_prague_hero_gup77d" },
  { slug: "roehampton-snow",      name: "Snow in Roehampton",      country: "England",      year: 2022, featured: false, galleryStyle: "masonry",   camera: null, folder: "2022 roehampton snow",           coverKey: "2022_snow_in_roehampton_cover_nwbqts",           heroKey: "2022_snow_in_roehampton_hero_ijvkua" },
  { slug: "shropshire-hills",     name: "Shropshire Hills",        country: "England",      year: 2022, featured: false, galleryStyle: "editorial", camera: null, folder: "2022 shropshire hills",          coverKey: "2022_shropshire_hills_cover_fchv9e",             heroKey: "2022_shropshire_hills_hero_loa9kj" },
  { slug: "boise",                name: "Boise",                   country: "USA",          year: 2023, featured: false, galleryStyle: "masonry",   camera: null, folder: "2023 boise",                     coverKey: "2023_boise_cover_qhuvur",                        heroKey: "2023_boise_hero_slshxs" },
  { slug: "bratislava",           name: "Bratislava",              country: "Slovakia",     year: 2023, featured: false, galleryStyle: "editorial", camera: null, folder: "2023 bratislava",                coverKey: "2023_bratislava_cover_vdmwio",                   heroKey: "2023_bratislava_hero_hld9gi" },
  { slug: "budapest",             name: "Budapest",                country: "Hungary",      year: 2023, featured: true,  galleryStyle: "editorial", camera: null, folder: "2023 budapest",                  coverKey: "2023_budapest_cover_u0ghhf",                     heroKey: "2023_budapest_hero_xzxcgt" },
  { slug: "murrieta-car-show-2023",name:"Murrieta Car Show",       country: "USA",          year: 2023, featured: false, galleryStyle: "masonry",   camera: null, folder: "2023 murrieta car show",         coverKey: "2023_murrieta_car_show_cover_jqvq0s",            heroKey: "2023_murrieta_car_show_hero_r6az2f" },
  { slug: "vienna",               name: "Vienna",                  country: "Austria",      year: 2023, featured: false, galleryStyle: "editorial", camera: null, folder: "2023 vienna",                    coverKey: "2023_vienna_cover_ivvyrb",                       heroKey: "2023_vienna_hero_khbrsd" },
  { slug: "york",                 name: "York",                    country: "England",      year: 2023, featured: false, galleryStyle: "editorial", camera: null, folder: "2023 york",                      coverKey: "2023_york_cover_wfqnjh",                         heroKey: "2023_york_hero_rvdtrl" },
  { slug: "lake-vyrnwy",          name: "Lake Vyrnwy",             country: "Wales",        year: 2024, featured: false, galleryStyle: "editorial", camera: null, folder: "2024 lake vyrnwy",               coverKey: "2024_lake_vyrnwy_cover_qkjuqi",                  heroKey: "2024_lake_vyrnwy_hero_hhtwpq" },
  { slug: "much-wenlock",         name: "Much Wenlock",            country: "England",      year: 2024, featured: false, galleryStyle: "editorial", camera: null, folder: "2024 much wenlock",              coverKey: "2024_much_wenlock_cover_bmk9ha",                 heroKey: "2024_much_wenlock_hero_uqa3na" },
  { slug: "richmond-park",        name: "Richmond Park",           country: "England",      year: 2024, featured: false, galleryStyle: "masonry",   camera: null, folder: "2024 richmond park",             coverKey: "2024_richmond_park_cover_ni4k9w",                heroKey: "2024_richmond_park_hero_rydxad" },
]

// ─── Cloudinary helpers ───────────────────────────────────────────────────────
function cdnUrl(publicId, transforms = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${publicId}`
}

function coverUrl(key) {
  return cdnUrl(`${key}.jpg`, "f_auto,q_auto,w_800")
}

function heroUrl(key) {
  return cdnUrl(`${key}.jpg`, "f_auto,q_auto,w_1600")
}

async function fetchFolderPhotos(folder) {
  const photos = []
  let nextCursor = null

  do {
    // Use the Search API with asset_folder — works with Cloudinary's fixed-folder mode
    const params = new URLSearchParams({
      expression: `asset_folder="${folder}"`,
      max_results: "500",
    })
    if (nextCursor) params.set("next_cursor", nextCursor)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD}/resources/search?${params}`,
      { headers: { Authorization: `Basic ${AUTH}` } }
    )
    const data = await res.json()

    if (data.error) throw new Error(`Cloudinary error for "${folder}": ${data.error.message}`)

    // Diagnostic: print first result's public_id on the very first folder to confirm structure
    if (photos.length === 0 && data.resources?.length > 0) {
      const sample = data.resources[0]
      process.stdout.write(`[sample public_id: "${sample.public_id}"] `)
    }

    photos.push(...(data.resources ?? []))
    nextCursor = data.next_cursor ?? null
  } while (nextCursor)

  return photos
}

// ─── TypeScript file generator ────────────────────────────────────────────────
function photoEntry(r, locationName, i) {
  const publicId = r.public_id
  const url = cdnUrl(publicId + "." + r.format)
  const alt = `${locationName} ${i + 1}`
  return `      { src: "${url}", alt: "${alt}", width: ${r.width}, height: ${r.height} },`
}

function locationBlock(loc, photos) {
  const heroPhoto = { src: heroUrl(loc.heroKey), alt: loc.name, width: 1600, height: 900 }
  const allPhotos = [heroPhoto, ...photos]

  const photoLines = allPhotos
    .map((p, i) => {
      if (i === 0) return `      { src: "${p.src}", alt: "${p.alt}", width: ${p.width}, height: ${p.height} },`
      return photoEntry(p, loc.name, i - 1)
    })
    .join("\n")

  const cameraLine = loc.camera ? `\n    camera: "${loc.camera}",` : ""

  return `  {
    slug: "${loc.slug}",
    name: "${loc.name}",
    country: "${loc.country}",
    year: ${loc.year},
    featured: ${loc.featured},
    galleryStyle: "${loc.galleryStyle}",${cameraLine}
    coverImage: "${coverUrl(loc.coverKey)}",
    photos: [
${photoLines}
    ],
  },`
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Fetching photos for ${LOCATIONS.length} locations...\n`)

  const blocks = []

  for (const loc of LOCATIONS) {
    process.stdout.write(`  ${loc.folder}... `)
    let photos = []

    try {
      const resources = await fetchFolderPhotos(loc.folder)
      // Exclude anything already in mains (cover/hero files sometimes duplicated)
      photos = resources
        .filter(r => !r.public_id.startsWith("mains/") && !r.public_id.startsWith("assets/"))
        .sort((a, b) => a.public_id.localeCompare(b.public_id))
      console.log(`${photos.length} photos`)
    } catch (err) {
      console.log(`SKIPPED (${err.message})`)
    }

    blocks.push(locationBlock(loc, photos))
  }

  const ts = `import type { Location } from "./types"

const cdn = (path: string, transforms = "f_auto,q_auto") =>
  \`https://res.cloudinary.com/${CLOUD}/image/upload/\${transforms}/\${path}\`

const cover = (id: string) =>
  cdn(\`mains/\${id}.jpg\`, "f_auto,q_auto,w_800,h_1000,c_fill")

const hero = (id: string) =>
  cdn(\`mains/\${id}.jpg\`, "f_auto,q_auto,w_1600,h_900,c_fill")

export const locations: Location[] = [
${blocks.join("\n\n")}
]
`

  const outPath = resolve(ROOT, "content", "locations.ts")
  writeFileSync(outPath, ts, "utf8")
  console.log(`\n✓ Written to content/locations.ts`)
  console.log(`  Commit and push to deploy.`)
}

main().catch(err => { console.error(err); process.exit(1) })
