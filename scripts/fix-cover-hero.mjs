#!/usr/bin/env node
/**
 * fix-cover-hero.mjs
 *
 * The previous string-swap produced mangled filenames that don't exist in
 * Cloudinary. For example, Edinburgh's coverImage became
 * "2021_edinburgh_hero_pqaxvp" — mixing the "hero" label from one file with
 * the suffix from the other. This script replaces every broken coverImage and
 * hero-photo URL with the actual existing Cloudinary filename.
 *
 * Run once — no API credentials needed.
 *   node scripts/fix-cover-hero.mjs
 */

import { readFileSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")
const FILE = resolve(ROOT, "content", "locations.ts")

// coverFile = the Cloudinary file that contains the COVER photo content
//             (may have "_hero_" in its name due to original naming mistake)
// heroFile  = the Cloudinary file that contains the HERO/parallax photo content
//             (may have "_cover_" in its name due to original naming mistake)
// Both files actually exist in Cloudinary under these public_ids.
const FIXES = [
  { coverFile: "2019_chicago_hero_oasna0",                    heroFile: "2019_chicago_cover_hfl94t" },
  { coverFile: "2021_edinburgh_hero_tnsqmi",                   heroFile: "2021_edinburgh_cover_pqaxvp" },
  { coverFile: "2021_lake_tahoe_hero_t5xibs",                  heroFile: "2021_lake_tahoe_cover_f6lkzh" },
  { coverFile: "2021_shrewsbury_and_ironbridge_hero_eevzoz",   heroFile: "2021_shrewsbury_and_ironbridge_cover_naakhn" },
  { coverFile: "2022_berlin_hero_f4dc37",                      heroFile: "2022_berlin_cover_xjw0gf" },
  { coverFile: "2022_copenhagen_hero_nus1qq",                  heroFile: "2022_copenhagen_cover_nv8ver" },
  { coverFile: "2022_hamburg_hero_lc1fbq",                     heroFile: "2022_hamburg_cover_oegrxq" },
  { coverFile: "2022_murrieta_car_show_hero_vjmcyk",           heroFile: "2022_murrieta_car_show_cover_qkzxjr" },
  { coverFile: "2022_prague_hero_gup77d",                      heroFile: "2022_prague_cover_bsgwo5" },
  { coverFile: "2022_snow_in_roehampton_hero_ijvkua",          heroFile: "2022_snow_in_roehampton_cover_nwbqts" },
  { coverFile: "2022_shropshire_hills_hero_loa9kj",            heroFile: "2022_shropshire_hills_cover_fchv9e" },
  { coverFile: "2023_boise_hero_slshxs",                       heroFile: "2023_boise_cover_qhuvur" },
  { coverFile: "2023_bratislava_hero_hld9gi",                  heroFile: "2023_bratislava_cover_vdmwio" },
  { coverFile: "2023_budapest_hero_xzxcgt",                    heroFile: "2023_budapest_cover_u0ghhf" },
  { coverFile: "2023_murrieta_car_show_hero_r6az2f",           heroFile: "2023_murrieta_car_show_cover_jqvq0s" },
  { coverFile: "2023_vienna_hero_khbrsd",                      heroFile: "2023_vienna_cover_ivvyrb" },
  { coverFile: "2023_york_hero_rvdtrl",                        heroFile: "2023_york_cover_wfqnjh" },
  { coverFile: "2024_lake_vyrnwy_hero_hhtwpq",                 heroFile: "2024_lake_vyrnwy_cover_qkjuqi" },
  { coverFile: "2024_much_wenlock_hero_uqa3na",                heroFile: "2024_much_wenlock_cover_bmk9ha" },
  { coverFile: "2024_richmond_park_hero_rydxad",               heroFile: "2024_richmond_park_cover_ni4k9w" },
]

let text = readFileSync(FILE, "utf8")
let changed = 0

for (const { coverFile, heroFile } of FIXES) {
  // The previous string-swap took heroFile's suffix and put "_hero_" in front of it
  // to make the (broken) coverImage URL:
  //   e.g. heroFile = "2021_edinburgh_cover_pqaxvp"
  //        broken coverImage = "2021_edinburgh_hero_pqaxvp"  (label swapped, suffix kept)
  const brokenCoverImg = heroFile.replace("_cover_", "_hero_")

  // Similarly it took coverFile's suffix with "_cover_" for the (broken) hero photo:
  //   e.g. coverFile = "2021_edinburgh_hero_tnsqmi"
  //        broken heroPhoto = "2021_edinburgh_cover_tnsqmi"  (label swapped, suffix kept)
  const brokenHeroPhoto = coverFile.replace("_hero_", "_cover_")

  // Replace broken → correct
  if (text.includes(brokenCoverImg)) {
    text = text.replaceAll(brokenCoverImg, coverFile)
    changed++
  } else {
    console.warn(`  [warn] coverImage not found for broken id: ${brokenCoverImg}`)
  }

  if (text.includes(brokenHeroPhoto)) {
    text = text.replaceAll(brokenHeroPhoto, heroFile)
    changed++
  } else {
    console.warn(`  [warn] heroPhoto not found for broken id: ${brokenHeroPhoto}`)
  }
}

writeFileSync(FILE, text, "utf8")
console.log(`Done. Fixed ${changed} URL fragments in content/locations.ts`)
