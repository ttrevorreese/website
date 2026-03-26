import Link from "next/link"
import { GitBranch } from "lucide-react"
import { TextReveal } from "./animations/text-reveal"
import { FadeUp } from "./animations/fade-up"
import { ProjectCard } from "./project-card"
import { SkillsGrid } from "./skills-grid"
import { projects } from "@/content/projects"
import { profile } from "@/content/profile"

export function CodeSection() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="code" className="py-32 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-20">
        <TextReveal wrapperClassName="mb-4">
          <p className="text-xs tracking-[0.35em] uppercase text-muted">Engineering</p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Things I&apos;ve built.
          </h2>
        </TextReveal>
      </div>

      {/* Featured projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
        {featured.map((project, i) => (
          <ProjectCard key={project.title} project={project} delay={i * 0.1} />
        ))}
      </div>

      {/* GitHub CTA */}
      <FadeUp className="mb-20">
        <Link
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-border px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-card transition-colors"
        >
          <GitBranch size={15} />
          View all on GitHub
        </Link>
      </FadeUp>

      {/* Divider */}
      <div className="border-t border-border mb-20" />

      {/* Skills */}
      <div>
        <TextReveal wrapperClassName="mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-muted">Stack</p>
        </TextReveal>
        <SkillsGrid />
      </div>
    </section>
  )
}
