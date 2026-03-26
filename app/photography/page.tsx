import { TextReveal } from "@/components/animations/text-reveal"
import { MasonryGrid } from "@/components/masonry-grid"
import { locations } from "@/content/locations"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Photography — Trevor Reese",
  description: "Travel photography by Trevor Reese.",
}

export default function PhotographyPage() {
  const sorted = [...locations].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <TextReveal wrapperClassName="mb-4">
          <p className="text-xs tracking-[0.35em] uppercase text-muted">Portfolio</p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h1
            className="text-4xl sm:text-5xl font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Places.
          </h1>
        </TextReveal>
      </div>

      {/* Masonry grid */}
      <MasonryGrid locations={sorted} />
    </main>
  )
}
