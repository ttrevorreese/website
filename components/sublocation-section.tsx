import { TextReveal } from "./animations/text-reveal"
import { PhotoGrid } from "./photo-grid"
import type { Sublocation } from "@/content/types"

interface SublocationSectionProps {
  sublocation: Sublocation
  delay?: number
}

export function SublocationSection({ sublocation, delay = 0 }: SublocationSectionProps) {
  return (
    <section className="mb-24">
      {/* Text-reveal heading */}
      <div className="px-6 max-w-7xl mx-auto mb-8">
        <TextReveal delay={delay} wrapperClassName="mb-1">
          <p className="text-xs tracking-[0.4em] uppercase text-muted">Series</p>
        </TextReveal>
        <TextReveal delay={delay + 0.1}>
          <h2
            className="text-2xl sm:text-3xl font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {sublocation.name}
          </h2>
        </TextReveal>
      </div>

      {/* Photo grid */}
      <div className="px-6 max-w-7xl mx-auto">
        <PhotoGrid photos={sublocation.photos} />
      </div>
    </section>
  )
}
