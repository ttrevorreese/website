"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  /** How much to shift (percentage). Default 30 */
  strength?: number
  /** CSS object-position value. Default "center" */
  objectPosition?: string
  priority?: boolean
}

export function ParallaxImage({
  src,
  alt,
  className,
  strength = 30,
  objectPosition = "center",
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}%`, `${strength / 2}%`])
  // Scale must cover the full travel distance: 1 + (strength / 100)
  const scale = 1 + strength / 100

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition }}
          priority={priority}
        />
      </motion.div>
    </div>
  )
}
