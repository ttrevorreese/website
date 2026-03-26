"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { profile } from "@/content/profile"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs tracking-[0.25em] uppercase font-light hover:text-muted transition-colors"
        >
          Trevor Reese
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/photography"
            className="text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Photography
          </Link>
          <Link
            href="/#code"
            className="text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Code
          </Link>
          <Link
            href="/#contact"
            className="text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Contact
          </Link>
          <Link
            href={profile.social.etsy}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Shop
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
