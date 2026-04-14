export type Photo = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export type Sublocation = {
  name: string
  photos: Photo[]
}

export type Location = {
  slug: string
  name: string
  country: string
  coverImage: string
  galleryStyle: "masonry" | "editorial"
  year?: number
  featured?: boolean
  camera?: string
  published?: boolean
  photos: Photo[]
  sublocations?: Sublocation[]
}

export type Project = {
  title: string
  description: string
  tech: string[]
  github?: string
  live?: string
  image?: string
  imageContain?: boolean
  featured: boolean
}

export type Skill = {
  name: string
  category: "language" | "framework" | "tool" | "platform"
}

export type Profile = {
  name: string
  tagline: string
  bio: string[]
  photo: string
  social: {
    email: string
    github: string
    linkedin: string
    instagram: string
    etsy: string
    kofi: string
  }
}
