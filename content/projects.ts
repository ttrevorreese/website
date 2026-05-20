import type { Project } from "./types"

export const projects: Project[] = [
  {
    title: "Cherished Memories Photography",
    description:
      "All-inclusive client site for Cherished Memories Photography — visitors can browse galleries, place photo orders, and book appointments directly through the site.",
    tech: ["TypeScript", "JavaScript", "CSS", "Supabase", "Vercel"],
    live: "https://cherishedmemoriesphotography.com",
    image: "https://f004.backblazeb2.com/file/ttrevorreese-photos/cherished_memories_xewqta.png",
    imageContain: true,
    imageWhiteBg: true,
    featured: true,
  },
  {
    title: "Murrieta: Connected",
    description:
      "Designed an optimized bus route network for Murrieta, CA using Dijkstra's algorithm. Pulls real street data via Geoapify, models routes as a weighted graph, and renders interactive maps with Folium.",
    tech: ["Python", "Jupyter", "Pandas", "Geoapify", "Folium"],
    github: "https://github.com/ttrevorreese/finalyearproject",
    image: "https://f004.backblazeb2.com/file/ttrevorreese-photos/finalyearproject_zjjrl9.jpg",
    featured: true,
  },
  {
    title: "Ambient Reverie",
    description:
      "Fully automated pipeline that generates 3-hour dark ambient YouTube videos using a local machine. MusicGen composes the score, FLUX renders the visuals, Ollama writes the descriptions, and FFmpeg assembles the final video — zero human input after launch.",
    tech: ["Python", "MusicGen", "FLUX", "Ollama", "FFmpeg"],
    live: "https://www.youtube.com/@ambient-reverie",
    image: "https://f004.backblazeb2.com/file/ttrevorreese-photos/ambients_wmvwij.jpg",
    featured: true,
  },
  {
    title: "The Affirmation Garden",
    description:
      "An ambient video series for a positive affirmations channel. FLUX produces the imagery and MusicGen scores the audio, then the pipeline renders and uploads completed videos automatically.",
    tech: ["Python", "MusicGen", "FLUX", "Ollama", "FFmpeg"],
    live: "https://www.youtube.com/@The1AffirmationGarden",
    image: "https://f004.backblazeb2.com/file/ttrevorreese-photos/affirmations_heb8jg.png",
    featured: true,
  },
  {
    title: "Metronome",
    description:
      "Collaborative CRUD web app for tracking and reporting population data. Built with a team using an Express/PUG stack containerized in Docker, with a REST API for data management.",
    tech: ["Python", "Node.js", "Express", "PUG", "Docker"],
    github: "https://github.com/ttrevorreese/Metronome",
    image: "https://f004.backblazeb2.com/file/ttrevorreese-photos/infowink_o2kphc.png",
    imageContain: true,
    featured: true,
  },
  {
    title: "Personal Portfolio",
    description:
      "This site — a full-stack portfolio built with Next.js and Framer Motion. Features a parallax hero strip, location-based photography galleries, and server-side image optimization via Backblaze.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Cloudinary"],
    github: "https://github.com/ttrevorreese/website",
    live: "https://ttrevorreese.com",
    image: "https://f004.backblazeb2.com/file/ttrevorreese-photos/Screenshot_2026-04-14_140940_ayby6i.png",
    featured: true,
  },
]
