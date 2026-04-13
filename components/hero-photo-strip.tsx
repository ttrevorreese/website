"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface HeroPhotoStripProps {
  photos: string[]
  /** Seconds to complete one full loop. Default 35 */
  duration?: number
}

export function HeroPhotoStrip({ photos, duration = 35 }: HeroPhotoStripProps) {
  // Duplicate the set so the loop resets invisibly
  const doubled = [...photos, ...photos]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="flex h-full gap-1"
        initial={{ x: "-50%" }}
        animate={{ x: "0%" }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative h-full flex-shrink-0"
            style={{ aspectRatio: "2/3" }}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="40vw" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
