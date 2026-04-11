import type { Profile } from "./types"

export const profile: Profile = {
  name: "Trevor Reese",
  tagline: "Photographer · Engineer",
  bio: [
    // [REPLACE] Replace these paragraphs with your own words
    "I'm Trevor — a software engineer and travel photographer based in [city]. I build things for the web and capture the world through a lens.",
    "My work lives at the intersection of craft and curiosity. Whether I'm shipping code or chasing light in a new city, I care about getting the details right.",
    "This site is where both sides of that work live together.",
  ],
  photo: "https://res.cloudinary.com/dyqdtpd3b/image/upload/f_auto,q_auto,w_600/TR_Headshot_Green_Square_a0xaym.jpg",
  social: {
    email: "mailto:hello@trevorreese.com", // [REPLACE]
    github: "https://github.com/ttrevorreese",
    linkedin: "https://linkedin.com/in/trevorreese", // [REPLACE]
    instagram: "https://instagram.com/trevorreese", // [REPLACE]
    etsy: "https://www.etsy.com/shop/PhotographyByTHR",
  },
}
