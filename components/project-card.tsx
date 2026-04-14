import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import type { Project } from "@/content/types"
import { FadeUp } from "./animations/fade-up"

interface ProjectCardProps {
  project: Project
  delay?: number
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <FadeUp delay={delay}>
      <div className="bg-card border border-border overflow-hidden group">
        {project.image && (
          <div className={`relative aspect-video overflow-hidden ${project.imageContain ? "bg-card" : ""}`}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`${project.imageContain ? "object-contain p-6" : "object-cover"} grayscale group-hover:grayscale-0 transition-all duration-500`}
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium tracking-wide">{project.title}</h3>
            <div className="flex gap-3 ml-4 shrink-0">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                  aria-label="GitHub repository"
                >
                  <FaGithub size={15} />
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                  aria-label="Live site"
                >
                  <ExternalLink size={15} />
                </Link>
              )}
            </div>
          </div>
          <p className="text-muted text-xs leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono tracking-wide text-muted border border-border px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeUp>
  )
}
