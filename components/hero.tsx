"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HeroPhotoStrip } from "./hero-photo-strip"
import { TextReveal } from "./animations/text-reveal"
import { ChevronDown } from "lucide-react"
import { profile } from "@/content/profile"

// TEST: single photo duplicated 10× — replace with real photo array later
const HERO_PHOTO = "https://res.cloudinary.com/dyqdtpd3b/image/upload/f_auto,q_auto,w_800/IMG_1564-566_gldg6s.jpg"
const heroPhotos = Array(10).fill(HERO_PHOTO)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Text lifts and fades as user scrolls past the hero
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.45], ["0px", "-48px"])
  // Scroll indicator fades out faster
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const [first, ...rest] = profile.name.split(" ")
  const last = rest.join(" ")

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Scrolling photo strip */}
      <HeroPhotoStrip photos={heroPhotos} duration={35} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Text content — fades and lifts on scroll */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center text-white px-6"
      >
        <TextReveal delay={0.1} wrapperClassName="mb-6">
          <p className="text-xs tracking-[0.4em] uppercase text-white/50 font-light">
            {profile.tagline}
          </p>
        </TextReveal>

        <TextReveal delay={0.25}>
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {first}
          </h1>
        </TextReveal>
        {last && (
          <TextReveal delay={0.35}>
            <div
              className="text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {last}
            </div>
          </TextReveal>
        )}
      </motion.div>

      {/* Scroll indicator — fades out on scroll */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          className="text-white/40"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
