import type { Project } from "./types"

export const projects: Project[] = [
  {
    title: "Murrieta: Connected",
    description:
      "Designed an optimized bus route network for Murrieta, CA using Dijkstra's algorithm. Pulls real street data via Geoapify, models routes as a weighted graph, and renders interactive maps with Folium.",
    tech: ["Python", "Jupyter", "Pandas", "Geoapify", "Folium"],
    github: "https://github.com/ttrevorreese/finalyearproject",
    image: "https://res.cloudinary.com/dyqdtpd3b/image/upload/f_auto,q_auto,w_800/finalyearproject_zjjrl9.jpg",
    featured: true,
  },
  {
    title: "Cherished Memories Photography",
    description:
      "All-inclusive client site for Cherished Memories Photography — visitors can browse galleries, place photo orders, and book appointments directly through the site.",
    tech: ["TypeScript", "JavaScript", "CSS", "Supabase", "Vercel"],
    live: "https://cherishedmemoriesphotography.com",
    image: "https://res.cloudinary.com/dyqdtpd3b/image/upload/f_auto,q_auto,w_800/cherished_memories_xewqta.png",
    imageContain: true,
    featured: true,
  },
  {
    title: "Ambient Reverie",
    description:
      "Fully automated pipeline that generates 3-hour dark ambient YouTube videos using local AI. MusicGen composes the score, FLUX renders the visuals, Ollama writes the descriptions, and FFmpeg assembles the final video — zero human input after launch.",
    tech: ["Python", "MusicGen", "FLUX", "Ollama", "FFmpeg"],
    live: "https://www.youtube.com/@ambient-reverie",
    image: "https://res.cloudinary.com/dyqdtpd3b/image/upload/f_auto,q_auto,w_800/ambients_wmvwij.jpg",
    featured: true,
  },
  {
    title: "The Affirmation Garden",
    description:
      "AI-generated ambient video series for a positive affirmations channel. FLUX produces the imagery and MusicGen scores the audio, then the pipeline renders and uploads completed videos automatically.",
    tech: ["Python", "FLUX", "MusicGen", "FFmpeg"],
    live: "https://www.youtube.com/@The1AffirmationGarden",
    image: "https://res.cloudinary.com/dyqdtpd3b/image/upload/f_auto,q_auto,w_800/affirmations_heb8jg.png",
    featured: true,
  },
  {
    title: "Metronome",
    description:
      "Collaborative CRUD web app for tracking and reporting population data. Built with a team using an Express/PUG stack containerized in Docker, with a REST API for data management.",
    tech: ["Python", "Node.js", "Express", "PUG", "Docker"],
    github: "https://github.com/ttrevorreese/Metronome",
    image: "https://res.cloudinary.com/dyqdtpd3b/image/upload/f_auto,q_auto,w_800/infowink_o2kphc.png",
    imageContain: true,
    featured: true,
  },
  {
    title: "Personal Portfolio",
    description:
      "This site — a full-stack portfolio built with Next.js and Framer Motion. Features a parallax hero strip, location-based photography galleries, and server-side image optimization via Cloudinary.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Cloudinary"],
    github: "https://github.com/ttrevorreese/website",
    live: "https://ttrevorreese.com",
    image: "https://res.cloudinary.com/dyqdtpd3b/image/upload/f_auto,q_auto,w_800/Screenshot_2026-04-14_140940_ayby6i.png",
    featured: true,
  },
]
