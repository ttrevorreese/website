"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { TextReveal } from "./animations/text-reveal"
import type { Location } from "@/content/types"

interface LocationHeroProps {
  location: Location
}

export function LocationHero({ location }: LocationHeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const heroPhoto = location.photos[0]

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.35]">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white"
      >
        <TextReveal delay={0.1} wrapperClassName="mb-3">
          <p className="text-xs tracking-[0.5em] uppercase text-white/50">
            {location.country}
            {location.year ? ` · ${location.year}` : ""}
          </p>
        </TextReveal>
        <TextReveal delay={0.25}>
          <h1
            className="text-6xl sm:text-8xl font-light tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {location.name}
          </h1>
        </TextReveal>
      </motion.div>
    </div>
  )
}
