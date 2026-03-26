import Image from "next/image"
import { FadeUp } from "./animations/fade-up"
import type { Photo } from "@/content/types"

interface PhotoGridProps {
  photos: Photo[]
  /** Skip this many photos from the start. Default 0. */
  skipFirst?: number
}

export function PhotoGrid({ photos, skipFirst = 0 }: PhotoGridProps) {
  const display = photos.slice(skipFirst)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
      {display.map((photo, i) => (
        <FadeUp key={photo.src} delay={(i % 3) * 0.08}>
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover hover:scale-[1.02] transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </FadeUp>
      ))}
    </div>
  )
}
