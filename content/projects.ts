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
    title: "SnapFlow",
    description:
      "Full operations platform for a school photography business, replacing Airtable, Zoho, and spreadsheets with one system spanning sales, scheduling, production, storefront sales, and invoicing. Serves five distinct user surfaces — admin dashboard, photographer PWA, school portal, public storefront, and studio kiosk — across three brands, backed by two-layer role and Postgres RLS permissions.",
    tech: ["TypeScript", "Next.js", "Supabase", "PostgreSQL", "Stripe", "Tailwind CSS"],
    featured: true,
  },
  {
    title: "Constellation",
    description:
      "Mobile-first PWA giving photographers their schedule, job details, and mileage reimbursement, plus a gamified achievement layer and a companion sales CRM for account managers. Airtable stays the source of truth and syncs one-way into Supabase on a cron schedule, with automatic division switching built into the UI.",
    tech: ["TypeScript", "Next.js", "Supabase", "Airtable API", "Tailwind CSS"],
    featured: true,
  },
  {
    title: "Pulsar",
    description:
      "Windows app that coordinates ID-card printing across a fleet of laptops on-site at photo shoots — every laptop runs the same binary and the fleet elects a print station among itself, with automatic failover and structural duplicate-print prevention. Talks to Zebra ZXP-7 printers through a COM wrapper around the native ZMotif SDK, backed by a Kestrel broker and a filesystem-based job queue.",
    tech: ["C#", ".NET 8", "WPF", "ASP.NET Core", "Zebra SDK"],
    featured: true,
  },
  {
    title: "PrintGate",
    description:
      "Windows app that connects a single laptop to every Zebra printer available on the network — the same problem Pulsar solves, but without a dedicated print broker. PrintGate talks directly to printers over the router to check availability and print.",
    tech: ["C#", ".NET 8", "WPF", "Zebra SDK"],
    featured: true,
  },
  {
    title: "Payload",
    description:
      "Auto-backup application that watches a workflow's Dropbox sync and automatically uploads and groups incoming photos as they land, replacing manual folder babysitting during picture-day imports.",
    tech: ["C#", ".NET 8", "WPF", "Dropbox API"],
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
