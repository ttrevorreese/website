"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { profile } from "@/content/profile"

const links = [
  { label: "Photography", href: "/photography" },
  { label: "Code", href: "/#code" },
  { label: "Contact", href: "/#contact" },
  { label: "Shop", href: profile.social.etsy, external: true },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-xs tracking-[0.25em] uppercase font-light hover:text-muted transition-colors"
          >
            Trevor Reese
          </Link>

          <div className="flex items-center gap-8">
            {/* Desktop links */}
            {links.map(({ label, href, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                {label}
              </Link>
            ))}

            <ThemeToggle />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="sm:hidden text-foreground/70 hover:text-foreground transition-colors p-1"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col pt-24 px-8 pb-12 sm:hidden"
          >
            <nav className="flex flex-col gap-1 flex-1">
              {links.map(({ label, href, external }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 border-b border-border text-2xl font-light tracking-[0.1em] uppercase hover:text-muted transition-colors"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom: socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex gap-6 text-xs tracking-[0.2em] uppercase text-muted"
            >
              <Link href={profile.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</Link>
              <Link href={profile.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</Link>
              <Link href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
