"use client"

import { motion } from "framer-motion"
import { ParallaxImage } from "./animations/parallax-image"
import { TextReveal } from "./animations/text-reveal"
import { ChevronDown } from "lucide-react"
import { profile } from "@/content/profile"

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&h=1000&fit=crop"
        alt="Hero background — travel landscape"
        className="absolute inset-0 h-full w-full"
        strength={25}
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        {/* Tagline — reveals first */}
        <TextReveal delay={0.1} wrapperClassName="mb-6">
          <p className="text-xs tracking-[0.4em] uppercase text-white/50 font-light">
            {profile.tagline}
          </p>
        </TextReveal>

        {/* Name — split across two lines */}
        {(() => {
          const [first, ...rest] = profile.name.split(" ")
          const last = rest.join(" ")
          return (
            <>
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
            </>
          )
        })()}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
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
    </section>
  )
}
