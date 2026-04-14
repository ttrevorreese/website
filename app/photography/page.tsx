import { TextReveal } from "@/components/animations/text-reveal"
import { MasonryGrid } from "@/components/masonry-grid"
import { locations } from "@/content/locations"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Photography — Trevor Reese",
  description: "Travel photography by Trevor Reese.",
}

// Display order within each camera group (latest → earliest)
const CAMERA_GROUPS = [
  {
    label: "Canon EOS R",
    slugs: [
      "richmond-park",
      "budapest",
      "bratislava",
      "vienna",
      "york",
      "boise",
      "murrieta-car-show-2023",
    ],
  },
  {
    label: "Canon EOS 5D Mark II",
    slugs: [
      "roehampton-snow",
      "hamburg",
      "berlin",
      "copenhagen",
      "shropshire-hills",
      "prague",
      "murrieta-car-show-2022",
      "shrewsbury-ironbridge",
      "edinburgh",
      "lake-tahoe",
      "chicago",
    ],
  },
  {
    label: "Samsung Galaxy S22 Ultra",
    slugs: ["lake-vyrnwy", "much-wenlock"],
  },
]

export default function PhotographyPage() {
  const locationMap = Object.fromEntries(
    locations
      .filter((l) => l.published !== false)
      .map((l) => [l.slug, l])
  )

  const groups = CAMERA_GROUPS.map((group) => ({
    label: group.label,
    locations: group.slugs.map((slug) => locationMap[slug]).filter(Boolean),
  })).filter((g) => g.locations.length > 0)

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-20">
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

      {/* Camera groups */}
      <div className="space-y-24">
        {groups.map((group, i) => (
          <section key={group.label}>
            <TextReveal wrapperClassName="mb-8">
              <div className="flex items-center gap-6">
                <p className="text-xs tracking-[0.35em] uppercase text-muted whitespace-nowrap">
                  {group.label}
                </p>
                <div className="h-px flex-1 bg-border" />
              </div>
            </TextReveal>
            <MasonryGrid locations={group.locations} />
          </section>
        ))}
      </div>
    </main>
  )
}
