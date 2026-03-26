import type { Location } from "./types"

export const locations: Location[] = [
  {
    slug: "copenhagen",
    name: "Copenhagen",
    country: "Denmark",
    year: 2024,
    featured: true,
    galleryStyle: "editorial",
    coverImage:
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=1000&fit=crop",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1200&h=800&fit=crop",
        alt: "Copenhagen canal at golden hour",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1200&fit=crop",
        alt: "Colourful Nyhavn boats",
        width: 800,
        height: 1200,
      },
      {
        src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop",
        alt: "Copenhagen street scene",
        width: 1200,
        height: 800,
      },
    ],
    sublocations: [
      {
        name: "Parks",
        photos: [
          {
            src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&h=800&fit=crop",
            alt: "Park path in autumn",
            width: 1200,
            height: 800,
          },
          {
            src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=1200&fit=crop",
            alt: "Formal garden",
            width: 800,
            height: 1200,
          },
        ],
      },
      {
        name: "Castles",
        photos: [
          {
            src: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&h=800&fit=crop",
            alt: "Castle reflected in water",
            width: 1200,
            height: 800,
          },
        ],
      },
    ],
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    year: 2024,
    featured: true,
    galleryStyle: "masonry",
    coverImage:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=1000&fit=crop",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&h=800&fit=crop",
        alt: "Tokyo skyline at night",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=1200&fit=crop",
        alt: "Tokyo street at dusk",
        width: 800,
        height: 1200,
      },
      {
        src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=900&fit=crop",
        alt: "Shibuya crossing",
        width: 1200,
        height: 900,
      },
      {
        src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900&h=1200&fit=crop",
        alt: "Temple gate at dawn",
        width: 900,
        height: 1200,
      },
    ],
  },
  {
    slug: "patagonia",
    name: "Patagonia",
    country: "Chile",
    year: 2023,
    featured: true,
    galleryStyle: "editorial",
    coverImage:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=1000&fit=crop",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&h=900&fit=crop",
        alt: "Torres del Paine at sunrise",
        width: 1600,
        height: 900,
      },
      {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop",
        alt: "Mountain reflected in glacial lake",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    year: 2023,
    featured: false,
    galleryStyle: "masonry",
    coverImage:
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=1000&fit=crop",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&h=900&fit=crop",
        alt: "Oia village with blue domes",
        width: 1200,
        height: 900,
      },
      {
        src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&h=1200&fit=crop",
        alt: "Whitewashed steps at sunset",
        width: 900,
        height: 1200,
      },
    ],
  },
]
