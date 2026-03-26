import { notFound } from "next/navigation"
import { locations } from "@/content/locations"
import { LocationHero } from "@/components/location-hero"
import { PhotoGrid } from "@/components/photo-grid"
import { SublocationSection } from "@/components/sublocation-section"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const location = locations.find((l) => l.slug === slug)
  if (!location) return {}
  return {
    title: `${location.name} — Trevor Reese`,
    description: `Travel photography from ${location.name}, ${location.country}.`,
  }
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params
  const location = locations.find((l) => l.slug === slug)
  if (!location) notFound()

  return (
    <main>
      {/* Full-bleed parallax hero (first photo) */}
      <LocationHero location={location} />

      {/* Main photo grid (skip the hero photo) */}
      {location.photos.length > 1 && (
        <div className="px-6 max-w-7xl mx-auto py-16">
          <PhotoGrid photos={location.photos} skipFirst={1} />
        </div>
      )}

      {/* Sublocation sections */}
      {location.sublocations && location.sublocations.length > 0 && (
        <div className="py-8">
          {location.sublocations.map((sublocation, i) => (
            <SublocationSection
              key={sublocation.name}
              sublocation={sublocation}
              delay={i * 0.05}
            />
          ))}
        </div>
      )}
    </main>
  )
}
