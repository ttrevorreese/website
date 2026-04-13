"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
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
      {/* Parallax image — scale in motion style to avoid Framer transform override */}
      <motion.div style={{ y, scale: 1.35 }} className="absolute inset-0">
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

      {/* Back button — fixed so it stays visible while scrolling */}
      <div className="fixed top-20 left-6 z-50">
        <Link
          href="/photography"
          className="flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/60 transition-all text-xs tracking-[0.2em] uppercase group px-3 py-2"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          All locations
        </Link>
      </div>

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
        {location.camera && (
          <TextReveal delay={0.35}>
            <p className="text-xs tracking-[0.4em] uppercase text-white/40 mt-4">
              Shot on: {location.camera}
            </p>
          </TextReveal>
        )}
      </motion.div>
    </div>
  )
}
