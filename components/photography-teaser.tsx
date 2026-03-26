import Link from "next/link"
import { FadeUp } from "./animations/fade-up"
import { TextReveal } from "./animations/text-reveal"
import { LocationCard } from "./location-card"
import { locations } from "@/content/locations"
import { ArrowRight } from "lucide-react"

export function PhotographyTeaser() {
  const featured = locations.filter((l) => l.featured).slice(0, 4)

  return (
    <section id="photography" className="py-32 px-6">
      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-16 flex items-end justify-between">
        <div>
          <TextReveal wrapperClassName="mb-4">
            <p className="text-xs tracking-[0.35em] uppercase text-muted">Photography</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2
              className="text-3xl sm:text-4xl font-light"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Recent travels.
            </h2>
          </TextReveal>
        </div>
        <FadeUp delay={0.2}>
          <Link
            href="/photography"
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors group"
          >
            View all
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </FadeUp>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.slice(0, 3).map((location, i) => (
          <FadeUp key={location.slug} delay={i * 0.1}>
            <LocationCard location={location} />
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
