import type { Location } from "./types"

const cdn = (path: string, transforms = "f_auto,q_auto") =>
  `https://res.cloudinary.com/dyqdtpd3b/image/upload/${transforms}/${path}`

const cover = (id: string) =>
  cdn(`mains/${id}.jpg`, "f_auto,q_auto,w_800,h_1000,c_fill")

const hero = (id: string) =>
  cdn(`mains/${id}.jpg`, "f_auto,q_auto,w_1600,h_900,c_fill")

export const locations: Location[] = [
  // ── 2019 ──────────────────────────────────────────────────────────────────
  {
    slug: "chicago",
    name: "Chicago",
    country: "USA",
    year: 2019,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2019_chicago_cover_hfl94t"),
    photos: [
      { src: hero("2019_chicago_hero_oasna0"), alt: "Chicago", width: 1600, height: 900 },
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
    coverImage: cover("2021_edinburgh_cover_pqaxvp"),
    photos: [
      { src: hero("2021_edinburgh_hero_tnsqmi"), alt: "Edinburgh", width: 1600, height: 900 },
    ],
  },
  {
    slug: "lake-tahoe",
    name: "Lake Tahoe",
    country: "USA",
    year: 2021,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2021_lake_tahoe_cover_f6lkzh"),
    photos: [
      { src: hero("2021_lake_tahoe_hero_t5xibs"), alt: "Lake Tahoe", width: 1600, height: 900 },
    ],
  },
  {
    slug: "shrewsbury-ironbridge",
    name: "Shrewsbury & Ironbridge",
    country: "England",
    year: 2021,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2021_shrewsbury_and_ironbridge_cover_naakhn"),
    photos: [
      {
        src: hero("2021_shrewsbury_and_ironbridge_hero_eevzoz"),
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
    coverImage: cover("2022_berlin_cover_xjw0gf"),
    photos: [
      { src: hero("2022_berlin_hero_f4dc37"), alt: "Berlin", width: 1600, height: 900 },
    ],
  },
  {
    slug: "copenhagen",
    name: "Copenhagen",
    country: "Denmark",
    year: 2022,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2022_copenhagen_cover_nv8ver"),
    photos: [
      { src: hero("2022_copenhagen_hero_nus1qq"), alt: "Copenhagen", width: 1600, height: 900 },
    ],
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    country: "Germany",
    year: 2022,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2022_hamburg_cover_oegrxq"),
    photos: [
      { src: hero("2022_hamburg_hero_lc1fbq"), alt: "Hamburg", width: 1600, height: 900 },
    ],
  },
  {
    slug: "murrieta-car-show-2022",
    name: "Murrieta Car Show",
    country: "USA",
    year: 2022,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2022_murrieta_car_show_cover_qkzxjr"),
    photos: [
      {
        src: hero("2022_murrieta_car_show_hero_vjmcyk"),
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
    coverImage: cover("2022_prague_cover_bsgwo5"),
    photos: [
      { src: hero("2022_prague_hero_gup77d"), alt: "Prague", width: 1600, height: 900 },
    ],
  },
  {
    slug: "roehampton-snow",
    name: "Snow in Roehampton",
    country: "England",
    year: 2022,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2022_snow_in_roehampton_cover_nwbqts"),
    photos: [
      {
        src: hero("2022_snow_in_roehampton_hero_ijvkua"),
        alt: "Snow in Roehampton",
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
    coverImage: cover("2022_shropshire_hills_cover_fchv9e"),
    photos: [
      {
        src: hero("2022_shropshire_hills_hero_loa9kj"),
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
    coverImage: cover("2023_boise_cover_qhuvur"),
    photos: [
      { src: hero("2023_boise_hero_slshxs"), alt: "Boise", width: 1600, height: 900 },
    ],
  },
  {
    slug: "bratislava",
    name: "Bratislava",
    country: "Slovakia",
    year: 2023,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2023_bratislava_cover_vdmwio"),
    photos: [
      { src: hero("2023_bratislava_hero_hld9gi"), alt: "Bratislava", width: 1600, height: 900 },
    ],
  },
  {
    slug: "budapest",
    name: "Budapest",
    country: "Hungary",
    year: 2023,
    featured: true,
    galleryStyle: "editorial",
    coverImage: cover("2023_budapest_cover_u0ghhf"),
    photos: [
      { src: hero("2023_budapest_hero_xzxcgt"), alt: "Budapest", width: 1600, height: 900 },
    ],
  },
  {
    slug: "murrieta-car-show-2023",
    name: "Murrieta Car Show",
    country: "USA",
    year: 2023,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2023_murrieta_car_show_cover_jqvq0s"),
    photos: [
      {
        src: hero("2023_murrieta_car_show_hero_r6az2f"),
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
    coverImage: cover("2023_vienna_cover_ivvyrb"),
    photos: [
      { src: hero("2023_vienna_hero_khbrsd"), alt: "Vienna", width: 1600, height: 900 },
    ],
  },
  {
    slug: "york",
    name: "York",
    country: "England",
    year: 2023,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2023_york_cover_wfqnjh"),
    photos: [
      { src: hero("2023_york_hero_rvdtrl"), alt: "York", width: 1600, height: 900 },
    ],
  },

  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    slug: "lake-vyrnwy",
    name: "Lake Vyrnwy",
    country: "Wales",
    year: 2024,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2024_lake_vyrnwy_cover_qkjuqi"),
    photos: [
      { src: hero("2024_lake_vyrnwy_hero_hhtwpq"), alt: "Lake Vyrnwy", width: 1600, height: 900 },
    ],
  },
  {
    slug: "much-wenlock",
    name: "Much Wenlock",
    country: "England",
    year: 2024,
    featured: false,
    galleryStyle: "editorial",
    coverImage: cover("2024_much_wenlock_cover_bmk9ha"),
    photos: [
      { src: hero("2024_much_wenlock_hero_uqa3na"), alt: "Much Wenlock", width: 1600, height: 900 },
    ],
  },
  {
    slug: "richmond-park",
    name: "Richmond Park",
    country: "England",
    year: 2024,
    featured: false,
    galleryStyle: "masonry",
    coverImage: cover("2024_richmond_park_cover_ni4k9w"),
    photos: [
      {
        src: hero("2024_richmond_park_hero_rydxad"),
        alt: "Richmond Park",
        width: 1600,
        height: 900,
      },
    ],
  },
]
