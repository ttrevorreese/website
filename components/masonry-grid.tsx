import { FadeUp } from "./animations/fade-up"
import { LocationCard } from "./location-card"
import type { Location } from "@/content/types"

interface MasonryGridProps {
  locations: Location[]
}

export function MasonryGrid({ locations }: MasonryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {locations.map((location, i) => (
        <FadeUp key={location.slug} delay={(i % 3) * 0.1} className="break-inside-avoid">
          <LocationCard location={location} />
        </FadeUp>
      ))}
    </div>
  )
}
