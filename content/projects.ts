import type { Project } from "./types"

export const projects: Project[] = [
  {
    // [REPLACE] Replace with your real projects
    title: "Project Alpha",
    description:
      "A description of what this project does, the problem it solves, and what makes it interesting to build or use.",
    tech: ["TypeScript", "Next.js", "PostgreSQL"],
    github: "https://github.com/trevorreese/project-alpha", // [REPLACE]
    live: "https://project-alpha.vercel.app", // [REPLACE]
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    title: "Project Beta",
    description:
      "Another project description. What technology choices did you make and why? What did you learn?",
    tech: ["Python", "FastAPI", "React"],
    github: "https://github.com/trevorreese/project-beta", // [REPLACE]
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    title: "Project Gamma",
    description:
      "A third project. Keep descriptions to 1-2 sentences — let the link and tech stack do the rest.",
    tech: ["Go", "Docker", "Kubernetes"],
    github: "https://github.com/trevorreese/project-gamma", // [REPLACE]
    featured: false,
  },
]
