import type { Location } from "./types"

// Cloudinary base — transformations applied inline
// Cover images: 800×1000 portrait crop (location index cards)
// Hero images:  1600×900 landscape crop (location page parallax hero)
// All grid photos: f_auto,q_auto for format/quality optimization
//
// Mains folder naming convention (must match files in Cloudinary /mains/ folder):
//   {year}_{location_slug}_cover.jpg  — index card cover
//   {year}_{location_slug}_hero.jpg   — location page hero
//
// Grid photos: add individual photo URLs to each location's photos[] array
// once filenames are available from Cloudinary folders.

const cdn = (path: string, transforms = "f_auto,q_auto") =>
  `https://res.cloudinary.com/dyqdtpd3b/image/upload/${transforms}/${path}`

const cover = (key: string) =>
  cdn(`mains/${key}_cover.jpg`, "f_auto,q_auto,w_800,h_1000,c_fill")

const hero = (key: string) =>
  cdn(`mains/${key}_hero.jpg`, "f_auto,q_auto,w_1600,h_900,c_fill")

export const locations: Location[] = [
  // ── 2019 ──────────────────────────────────────────────────────────────────
  {
    slug: "chicago",
    name: "Chicago",
    country: "USA",
    year: 2019,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2019_chicago"),
    photos: [
      { src: hero("2019_chicago"), alt: "Chicago", width: 1600, height: 900 },
    ],
  },

  // ── 2021 ──────────────────────────────────────────────────────────────────
  {
    slug: "edinburgh",
    name: "Edinburgh",
    country: "Scotland",
    year: 2021,
    featured: true,
    galleryStyle: "editorial",
    coverImage: cover("2021_edinburgh"),
    photos: [
      { src: hero("2021_edinburgh"), alt: "Edinburgh", width: 1600, height: 900 },
    ],
  },
  {
    slug: "lake-tahoe",
    name: "Lake Tahoe",
    country: "USA",
    year: 2021,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2021_lake_tahoe"),
    photos: [
      { src: hero("2021_lake_tahoe"), alt: "Lake Tahoe", width: 1600, height: 900 },
    ],
  },
  {
    slug: "shrewsbury-ironbridge",
    name: "Shrewsbury & Ironbridge",
    country: "England",
    year: 2021,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2021_shrewsbury_and_ironbridge"),
    photos: [
      {
        src: hero("2021_shrewsbury_and_ironbridge"),
        alt: "Shrewsbury & Ironbridge",
        width: 1600,
        height: 900,
      },
    ],
  },

  // ── 2022 ──────────────────────────────────────────────────────────────────
  {
    slug: "berlin",
    name: "Berlin",
    country: "Germany",
    year: 2022,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2022_berlin"),
    photos: [
      { src: hero("2022_berlin"), alt: "Berlin", width: 1600, height: 900 },
    ],
  },
  {
    slug: "copenhagen",
    name: "Copenhagen",
    country: "Denmark",
    year: 2022,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2022_copenhagen"),
    photos: [
      { src: hero("2022_copenhagen"), alt: "Copenhagen", width: 1600, height: 900 },
    ],
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    country: "Germany",
    year: 2022,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2022_hamburg"),
    photos: [
      { src: hero("2022_hamburg"), alt: "Hamburg", width: 1600, height: 900 },
    ],
  },
  {
    slug: "murrieta-car-show-2022",
    name: "Murrieta Car Show",
    country: "USA",
    year: 2022,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2022_murrieta_car_show"),
    photos: [
      {
        src: hero("2022_murrieta_car_show"),
        alt: "Murrieta Car Show 2022",
        width: 1600,
        height: 900,
      },
    ],
  },
  {
    slug: "prague",
    name: "Prague",
    country: "Czech Republic",
    year: 2022,
    featured: true,
    galleryStyle: "editorial",
    coverImage: cover("2022_prague"),
    photos: [
      { src: hero("2022_prague"), alt: "Prague", width: 1600, height: 900 },
    ],
  },
  {
    slug: "roehampton-snow",
    name: "Roehampton Snow",
    country: "England",
    year: 2022,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2022_roehampton_snow"),
    photos: [
      {
        src: hero("2022_roehampton_snow"),
        alt: "Roehampton in the snow",
        width: 1600,
        height: 900,
      },
    ],
  },
  {
    slug: "shropshire-hills",
    name: "Shropshire Hills",
    country: "England",
    year: 2022,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2022_shropshire_hills"),
    photos: [
      {
        src: hero("2022_shropshire_hills"),
        alt: "Shropshire Hills",
        width: 1600,
        height: 900,
      },
    ],
  },

  // ── 2023 ──────────────────────────────────────────────────────────────────
  {
    slug: "boise",
    name: "Boise",
    country: "USA",
    year: 2023,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2023_boise"),
    photos: [
      { src: hero("2023_boise"), alt: "Boise", width: 1600, height: 900 },
    ],
  },
  {
    slug: "bratislava",
    name: "Bratislava",
    country: "Slovakia",
    year: 2023,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2023_bratislava"),
    photos: [
      { src: hero("2023_bratislava"), alt: "Bratislava", width: 1600, height: 900 },
    ],
  },
  {
    slug: "budapest",
    name: "Budapest",
    country: "Hungary",
    year: 2023,
    featured: true,
    galleryStyle: "editorial",
    coverImage: cover("2023_budapest"),
    photos: [
      { src: hero("2023_budapest"), alt: "Budapest", width: 1600, height: 900 },
    ],
  },
  {
    slug: "murrieta-car-show-2023",
    name: "Murrieta Car Show",
    country: "USA",
    year: 2023,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2023_murrieta_car_show"),
    photos: [
      {
        src: hero("2023_murrieta_car_show"),
        alt: "Murrieta Car Show 2023",
        width: 1600,
        height: 900,
      },
    ],
  },
  {
    slug: "vienna",
    name: "Vienna",
    country: "Austria",
    year: 2023,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2023_vienna"),
    photos: [
      { src: hero("2023_vienna"), alt: "Vienna", width: 1600, height: 900 },
    ],
  },
  {
    slug: "york",
    name: "York",
    country: "England",
    year: 2023,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2023_york"),
    photos: [
      { src: hero("2023_york"), alt: "York", width: 1600, height: 900 },
    ],
  },

  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    slug: "richmond-park",
    name: "Richmond Park",
    country: "England",
    year: 2024,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2024_richmond_park"),
    photos: [
      {
        src: hero("2024_richmond_park"),
        alt: "Richmond Park",
        width: 1600,
        height: 900,
      },
    ],
  },
]
