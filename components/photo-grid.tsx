import Image from "next/image"
import type { Photo } from "@/content/types"

interface PhotoGridProps {
  photos: Photo[]
  /** Skip this many photos from the start. Default 0. */
  skipFirst?: number
}

export function PhotoGrid({ photos, skipFirst = 0 }: PhotoGridProps) {
  const display = photos.slice(skipFirst)

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-1">
      {display.map((photo) => (
        <div key={photo.src} className="mb-1 break-inside-avoid">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="w-full h-auto hover:scale-[1.02] transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  )
}
