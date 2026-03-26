import Image from "next/image"
import Link from "next/link"
import type { Location } from "@/content/types"
import { cn } from "@/lib/utils"

interface LocationCardProps {
  location: Location
  className?: string
}

export function LocationCard({ location, className }: LocationCardProps) {
  const photoCount =
    location.photos.length +
    (location.sublocations?.reduce((acc, s) => acc + s.photos.length, 0) ?? 0)

  return (
    <Link href={`/photography/${location.slug}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden aspect-[3/4]">
        <Image
          src={location.coverImage}
          alt={`${location.name}, ${location.country}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-1">
            {location.country}
            {location.year ? ` · ${location.year}` : ""}
          </p>
          <p className="text-white text-lg font-light tracking-[0.1em]">{location.name}</p>
          <p className="text-white/40 text-xs mt-1 tracking-widest">{photoCount} photos</p>
        </div>
      </div>
    </Link>
  )
}
