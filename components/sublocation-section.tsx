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
      {/* Divider — matches the photography index camera-group style */}
      <div className="px-6 max-w-7xl mx-auto mb-8">
        <TextReveal delay={delay}>
          <div className="flex items-center gap-6">
            <p className="text-xs tracking-[0.35em] uppercase text-muted whitespace-nowrap">
              {sublocation.name}
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>
        </TextReveal>
      </div>

      {/* Photo grid */}
      <div className="px-6 max-w-7xl mx-auto">
        <PhotoGrid photos={sublocation.photos} />
      </div>
    </section>
  )
}
