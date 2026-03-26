import { FadeUp } from "./animations/fade-up"
import { LocationCard } from "./location-card"
import type { Location } from "@/content/types"

interface MasonryGridProps {
  locations: Location[]
}

export function MasonryGrid({ locations }: MasonryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location, i) => (
        <FadeUp key={location.slug} delay={(i % 3) * 0.1}>
          <LocationCard location={location} />
        </FadeUp>
      ))}
    </div>
  )
}
