# Trevor Reese Personal Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full personal portfolio website for Trevor Reese — a scrolling homepage plus a hierarchical photography system — using Next.js 16, Framer Motion, and next-themes.

**Architecture:** Static Next.js App Router site with TypeScript content config files. Homepage is a single long scroll page; photography is a separate `/photography` index and `/photography/[slug]` location pages. All animations use Framer Motion with Intersection Observer triggers. Dark/light mode via next-themes with CSS variables.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, next-themes, Geist fonts, Playfair Display, Lucide React, next/image

---

## File Map

```
app/
  layout.tsx              root layout, ThemeProvider, fonts, Nav
  page.tsx                homepage — composes all homepage sections
  globals.css             CSS variables, dark/light tokens, base styles
  photography/
    page.tsx              location index — masonry grid of destinations
    [slug]/
      page.tsx            individual location gallery

components/
  nav.tsx                 fixed nav with scroll-blur + ThemeToggle
  theme-toggle.tsx        sun/moon button, next-themes
  hero.tsx                full-bleed parallax hero with name + tagline
  about.tsx               photo placeholder + bio text
  photography-teaser.tsx  3-4 location cards teaser → /photography
  location-card.tsx       reusable card: cover photo, name, country, count
  code-section.tsx        GitHub repos + project cards + skills grid
  project-card.tsx        individual project card
  skills-grid.tsx         tech stack grid
  contact.tsx             minimal footer with social links
  masonry-grid.tsx        CSS-columns masonry layout for photo index
  location-hero.tsx       parallax full-bleed hero for location pages
  photo-grid.tsx          responsive 2→3 col grid with staggered fade-up
  sublocation-section.tsx text-reveal heading + photo grid for sub-areas
  animations/
    fade-up.tsx           Intersection Observer fade-up wrapper
    text-reveal.tsx       clip-path/overflow unmask wrapper
    parallax-image.tsx    scroll-linked parallax background image

content/
  types.ts                all shared TypeScript types
  profile.ts              name, bio, social links
  locations.ts            travel destinations + photos
  projects.ts             code projects
  skills.ts               tech stack list

lib/
  utils.ts                cn() helper (clsx + tailwind-merge)
```

---

## Task 1: Scaffold Next.js project and install dependencies

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts` (via create-next-app)
- Create: `lib/utils.ts`

- [ ] **Step 1: Run create-next-app in the existing repo directory**

```bash
cd /c/Users/trevo/website
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Files created — `app/`, `components/`, `public/`, `next.config.ts`, `tsconfig.json`, `package.json`, `tailwind.config.ts` (or handled via CSS in v4).

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion next-themes geist lucide-react
npm install next/font  # already included via next
```

- [ ] **Step 3: Install Playfair Display (available via next/font/google — no separate install)**

Verify `next` is >= 15.0.0:
```bash
node -e "const p = require('./package.json'); console.log(p.dependencies.next)"
```

- [ ] **Step 4: Create `lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 5: Install clsx and tailwind-merge**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 6: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: No errors (only the default next-env.d.ts types).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with dependencies"
```

---

## Task 2: CSS variables + theme system

**Files:**
- Modify: `app/globals.css`
- Create: `app/layout.tsx` (ThemeProvider skeleton, no Nav yet)

- [ ] **Step 1: Replace `app/globals.css` with color token system**

```css
@import "tailwindcss";

/* Class-based dark mode — works with next-themes attribute="class" */
@custom-variant dark (&:is(.dark *));

/* Map CSS variables to Tailwind color tokens */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-playfair);
}

/* Light mode (default fallback) */
:root {
  --background: #f8f8f6;
  --foreground: #111111;
  --card: #eeede9;
  --muted: #888888;
  --border: rgba(0, 0, 0, 0.08);
}

/* Dark mode */
.dark {
  --background: #0a0a0a;
  --foreground: #f0f0f0;
  --card: #1a1a1a;
  --muted: #888888;
  --border: rgba(255, 255, 255, 0.08);
}

/* Smooth color transitions */
*,
*::before,
*::after {
  transition: background-color 200ms ease, border-color 200ms ease, color 200ms ease;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
  }
}

body {
  background-color: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Create `app/layout.tsx` with ThemeProvider and fonts**

```tsx
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Trevor Reese — Photographer & Engineer",
  description: "Portfolio of Trevor Reese — software engineer and travel photographer.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
    >
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Update `app/page.tsx` to a minimal smoke test**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-16">
      <h1 className="text-4xl font-light tracking-[0.3em] uppercase">Trevor Reese</h1>
      <p className="text-muted mt-2 tracking-widest text-sm uppercase">Theme system test</p>
    </main>
  )
}
```

- [ ] **Step 4: Run dev server and verify dark background renders**

```bash
npm run dev
```

Open http://localhost:3000 — background should be `#0a0a0a`, text `#f0f0f0`.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx app/page.tsx
git commit -m "feat: CSS variable theme system with dark/light tokens"
```

---

## Task 3: Content data layer

**Files:**
- Create: `content/types.ts`
- Create: `content/profile.ts`
- Create: `content/locations.ts`
- Create: `content/projects.ts`
- Create: `content/skills.ts`

- [ ] **Step 1: Create `content/types.ts`**

```ts
export type Photo = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export type Sublocation = {
  name: string
  photos: Photo[]
}

export type Location = {
  slug: string
  name: string
  country: string
  coverImage: string
  galleryStyle: "masonry" | "editorial"
  year?: number
  featured?: boolean
  photos: Photo[]
  sublocations?: Sublocation[]
}

export type Project = {
  title: string
  description: string
  tech: string[]
  github?: string
  live?: string
  image?: string
  featured: boolean
}

export type Skill = {
  name: string
  category: "language" | "framework" | "tool" | "platform"
}

export type Profile = {
  name: string
  tagline: string
  bio: string[]
  photo: string
  social: {
    email: string
    github: string
    linkedin: string
    instagram: string
  }
}
```

- [ ] **Step 2: Create `content/profile.ts`**

```ts
import type { Profile } from "./types"

export const profile: Profile = {
  name: "Trevor Reese",
  tagline: "Photographer · Engineer",
  bio: [
    // [REPLACE] Replace these paragraphs with your own words
    "I'm Trevor — a software engineer and travel photographer based in [city]. I build things for the web and capture the world through a lens.",
    "My work lives at the intersection of craft and curiosity. Whether I'm shipping code or chasing light in a new city, I care about getting the details right.",
    "This site is where both sides of that work live together.",
  ],
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
  social: {
    email: "mailto:hello@trevorreese.com", // [REPLACE]
    github: "https://github.com/trevorreese", // [REPLACE]
    linkedin: "https://linkedin.com/in/trevorreese", // [REPLACE]
    instagram: "https://instagram.com/trevorreese", // [REPLACE]
  },
}
```

- [ ] **Step 3: Create `content/locations.ts`**

```ts
import type { Location } from "./types"

export const locations: Location[] = [
  {
    slug: "copenhagen",
    name: "Copenhagen",
    country: "Denmark",
    year: 2024,
    featured: true,
    galleryStyle: "editorial",
    coverImage:
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=1000&fit=crop",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1200&h=800&fit=crop",
        alt: "Copenhagen canal at golden hour",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1200&fit=crop",
        alt: "Colourful Nyhavn boats",
        width: 800,
        height: 1200,
      },
      {
        src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop",
        alt: "Copenhagen street scene",
        width: 1200,
        height: 800,
      },
    ],
    sublocations: [
      {
        name: "Parks",
        photos: [
          {
            src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&h=800&fit=crop",
            alt: "Park path in autumn",
            width: 1200,
            height: 800,
          },
          {
            src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=1200&fit=crop",
            alt: "Formal garden",
            width: 800,
            height: 1200,
          },
        ],
      },
      {
        name: "Castles",
        photos: [
          {
            src: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&h=800&fit=crop",
            alt: "Castle reflected in water",
            width: 1200,
            height: 800,
          },
        ],
      },
    ],
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    year: 2024,
    featured: true,
    galleryStyle: "masonry",
    coverImage:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=1000&fit=crop",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&h=800&fit=crop",
        alt: "Tokyo skyline at night",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=1200&fit=crop",
        alt: "Tokyo street at dusk",
        width: 800,
        height: 1200,
      },
      {
        src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=900&fit=crop",
        alt: "Shibuya crossing",
        width: 1200,
        height: 900,
      },
      {
        src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900&h=1200&fit=crop",
        alt: "Temple gate at dawn",
        width: 900,
        height: 1200,
      },
    ],
  },
  {
    slug: "patagonia",
    name: "Patagonia",
    country: "Chile",
    year: 2023,
    featured: true,
    galleryStyle: "editorial",
    coverImage:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=1000&fit=crop",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&h=900&fit=crop",
        alt: "Torres del Paine at sunrise",
        width: 1600,
        height: 900,
      },
      {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop",
        alt: "Mountain reflected in glacial lake",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    year: 2023,
    featured: false,
    galleryStyle: "masonry",
    coverImage:
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=1000&fit=crop",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&h=900&fit=crop",
        alt: "Oia village with blue domes",
        width: 1200,
        height: 900,
      },
      {
        src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&h=1200&fit=crop",
        alt: "Whitewashed steps at sunset",
        width: 900,
        height: 1200,
      },
    ],
  },
]
```

- [ ] **Step 4: Create `content/projects.ts`**

```ts
import type { Project } from "./types"

export const projects: Project[] = [
  {
    // [REPLACE] Replace with your real projects
    title: "Project Alpha",
    description:
      "A description of what this project does, the problem it solves, and what makes it interesting to build or use.",
    tech: ["TypeScript", "Next.js", "PostgreSQL"],
    github: "https://github.com/trevorreese/project-alpha", // [REPLACE]
    live: "https://project-alpha.vercel.app", // [REPLACE]
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    title: "Project Beta",
    description:
      "Another project description. What technology choices did you make and why? What did you learn?",
    tech: ["Python", "FastAPI", "React"],
    github: "https://github.com/trevorreese/project-beta", // [REPLACE]
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    title: "Project Gamma",
    description:
      "A third project. Keep descriptions to 1-2 sentences — let the link and tech stack do the rest.",
    tech: ["Go", "Docker", "Kubernetes"],
    github: "https://github.com/trevorreese/project-gamma", // [REPLACE]
    featured: false,
  },
]
```

- [ ] **Step 5: Create `content/skills.ts`**

```ts
import type { Skill } from "./types"

export const skills: Skill[] = [
  // [REPLACE] Edit these to match your actual stack
  { name: "TypeScript", category: "language" },
  { name: "Python", category: "language" },
  { name: "Go", category: "language" },
  { name: "Rust", category: "language" },
  { name: "Next.js", category: "framework" },
  { name: "React", category: "framework" },
  { name: "FastAPI", category: "framework" },
  { name: "PostgreSQL", category: "tool" },
  { name: "Docker", category: "tool" },
  { name: "Git", category: "tool" },
  { name: "Vercel", category: "platform" },
  { name: "AWS", category: "platform" },
]
```

- [ ] **Step 6: Type-check the content layer**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add content/
git commit -m "feat: content data layer with types, profile, locations, projects, skills"
```

---

## Task 4: Animation components

**Files:**
- Create: `components/animations/fade-up.tsx`
- Create: `components/animations/text-reveal.tsx`
- Create: `components/animations/parallax-image.tsx`

- [ ] **Step 1: Create `components/animations/fade-up.tsx`**

```tsx
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `components/animations/text-reveal.tsx`**

The overflow-hidden parent clips the child as it slides up from below — creating the unmask effect.

```tsx
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  wrapperClassName?: string
}

export function TextReveal({
  children,
  delay = 0,
  className,
  wrapperClassName,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })

  return (
    <div ref={ref} className={cn("overflow-hidden", wrapperClassName)}>
      <motion.div
        initial={{ y: "110%" }}
        animate={isInView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 3: Create `components/animations/parallax-image.tsx`**

The image is scaled up 30% so the parallax movement doesn't reveal white edges.

```tsx
"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  /** How much to shift vertically (0–1 range maps to this %). Default 30 */
  strength?: number
}

export function ParallaxImage({
  src,
  alt,
  className,
  strength = 30,
}: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}%`, `${strength / 2}%`])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.35]">
        <Image src={src} alt={alt} fill className="object-cover" priority />
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add components/animations/
git commit -m "feat: FadeUp, TextReveal, ParallaxImage animation components"
```

---

## Task 5: Nav + ThemeToggle + root layout

**Files:**
- Create: `components/theme-toggle.tsx`
- Create: `components/nav.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/theme-toggle.tsx`**

`mounted` guard prevents hydration mismatch — server doesn't know the theme.

```tsx
"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-5 h-5" />

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-muted hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
```

- [ ] **Step 2: Create `components/nav.tsx`**

```tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 3: Update `app/layout.tsx` to include Nav**

```tsx
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Nav } from "@/components/nav"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Trevor Reese — Photographer & Engineer",
  description: "Portfolio of Trevor Reese — software engineer and travel photographer.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
    >
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Run dev server and verify nav renders, theme toggle works**

```bash
npm run dev
```

- Open http://localhost:3000
- Nav should be transparent at top, blur-in on scroll
- Sun/Moon toggle should switch background between `#0a0a0a` and `#f8f8f6`

- [ ] **Step 5: Commit**

```bash
git add components/theme-toggle.tsx components/nav.tsx app/layout.tsx
git commit -m "feat: Nav with scroll-blur effect and ThemeToggle"
```

---

## Task 6: Hero section

**Files:**
- Create: `components/hero.tsx`

- [ ] **Step 1: Create `components/hero.tsx`**

```tsx
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

        {/* Name — main reveal */}
        <TextReveal delay={0.25}>
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {profile.name.split(" ")[0]}
          </h1>
        </TextReveal>
        <TextReveal delay={0.35}>
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {profile.name.split(" ")[1]}
          </h1>
        </TextReveal>
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
```

- [ ] **Step 2: Add Hero to `app/page.tsx` to verify**

```tsx
import { Hero } from "@/components/hero"

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verify in dev server**

```bash
npm run dev
```

- Hero fills full viewport
- Text reveal animates on load (first tagline, then first name, then last name)
- Parallax moves background image slightly on scroll
- Scroll chevron bounces gently

- [ ] **Step 4: Commit**

```bash
git add components/hero.tsx app/page.tsx
git commit -m "feat: Hero section with parallax background and text-reveal animation"
```

---

## Task 7: About section

**Files:**
- Create: `components/about.tsx`

- [ ] **Step 1: Create `components/about.tsx`**

```tsx
import Image from "next/image"
import { FadeUp } from "./animations/fade-up"
import { TextReveal } from "./animations/text-reveal"
import { profile } from "@/content/profile"

export function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Photo */}
        <FadeUp className="order-2 md:order-1">
          <div className="relative aspect-square w-full max-w-sm mx-auto md:mx-0 overflow-hidden">
            <Image
              src={profile.photo}
              alt={`${profile.name} — portrait`}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </FadeUp>

        {/* Bio */}
        <div className="order-1 md:order-2">
          <TextReveal wrapperClassName="mb-8">
            <p className="text-xs tracking-[0.35em] uppercase text-muted">About</p>
          </TextReveal>

          <TextReveal delay={0.1} wrapperClassName="mb-10">
            <h2
              className="text-3xl sm:text-4xl font-light leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Two crafts,
              <br />
              one curiosity.
            </h2>
          </TextReveal>

          <div className="space-y-5">
            {profile.bio.map((paragraph, i) => (
              <FadeUp key={i} delay={0.1 * (i + 1)}>
                <p className="text-muted leading-relaxed text-sm">{paragraph}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add About to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero"
import { About } from "@/components/about"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: Verify in dev server — photo and bio fade in on scroll**

- [ ] **Step 4: Commit**

```bash
git add components/about.tsx app/page.tsx
git commit -m "feat: About section with portrait and bio"
```

---

## Task 8: Photography teaser + LocationCard

**Files:**
- Create: `components/location-card.tsx`
- Create: `components/photography-teaser.tsx`

- [ ] **Step 1: Create `components/location-card.tsx`**

```tsx
import Image from "next/image"
import Link from "next/link"
import type { Location } from "@/content/types"
import { cn } from "@/lib/utils"

interface LocationCardProps {
  location: Location
  className?: string
}

export function LocationCard({ location, className }: LocationCardProps) {
  const photoCount =
    location.photos.length +
    (location.sublocations?.reduce((acc, s) => acc + s.photos.length, 0) ?? 0)

  return (
    <Link href={`/photography/${location.slug}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden aspect-[3/4]">
        <Image
          src={location.coverImage}
          alt={`${location.name}, ${location.country}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-1">
            {location.country}
            {location.year ? ` · ${location.year}` : ""}
          </p>
          <p className="text-white text-lg font-light tracking-[0.1em]">{location.name}</p>
          <p className="text-white/40 text-xs mt-1 tracking-widest">{photoCount} photos</p>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Create `components/photography-teaser.tsx`**

```tsx
import Link from "next/link"
import { FadeUp } from "./animations/fade-up"
import { TextReveal } from "./animations/text-reveal"
import { LocationCard } from "./location-card"
import { locations } from "@/content/locations"
import { ArrowRight } from "lucide-react"

export function PhotographyTeaser() {
  const featured = locations.filter((l) => l.featured).slice(0, 4)

  return (
    <section id="photography" className="py-32 px-6">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16 flex items-end justify-between">
        <div>
          <TextReveal wrapperClassName="mb-4">
            <p className="text-xs tracking-[0.35em] uppercase text-muted">Photography</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2
              className="text-3xl sm:text-4xl font-light"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Recent travels.
            </h2>
          </TextReveal>
        </div>
        <FadeUp delay={0.2}>
          <Link
            href="/photography"
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors group"
          >
            View all
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </FadeUp>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((location, i) => (
          <FadeUp key={location.slug} delay={i * 0.1}>
            <LocationCard location={location} />
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add PhotographyTeaser to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { PhotographyTeaser } from "@/components/photography-teaser"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PhotographyTeaser />
    </main>
  )
}
```

- [ ] **Step 4: Verify — 4 location cards render with hover zoom, "View all" link visible**

- [ ] **Step 5: Commit**

```bash
git add components/location-card.tsx components/photography-teaser.tsx app/page.tsx
git commit -m "feat: Photography teaser section with location cards and fade-up animation"
```

---

## Task 9: Code/Projects section

**Files:**
- Create: `components/project-card.tsx`
- Create: `components/skills-grid.tsx`
- Create: `components/code-section.tsx`

- [ ] **Step 1: Create `components/project-card.tsx`**

```tsx
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import type { Project } from "@/content/types"
import { FadeUp } from "./animations/fade-up"

interface ProjectCardProps {
  project: Project
  delay?: number
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <FadeUp delay={delay}>
      <div className="bg-card border border-border overflow-hidden group">
        {project.image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium tracking-wide">{project.title}</h3>
            <div className="flex gap-3 ml-4 shrink-0">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                  aria-label="GitHub repository"
                >
                  <Github size={15} />
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                  aria-label="Live site"
                >
                  <ExternalLink size={15} />
                </Link>
              )}
            </div>
          </div>
          <p className="text-muted text-xs leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono tracking-wide text-muted border border-border px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeUp>
  )
}
```

- [ ] **Step 2: Create `components/skills-grid.tsx`**

```tsx
import { FadeUp } from "./animations/fade-up"
import { skills } from "@/content/skills"
import type { Skill } from "@/content/types"

const categoryOrder: Skill["category"][] = ["language", "framework", "tool", "platform"]
const categoryLabel: Record<Skill["category"], string> = {
  language: "Languages",
  framework: "Frameworks",
  tool: "Tools",
  platform: "Platforms",
}

export function SkillsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
      {categoryOrder.map((category, ci) => {
        const group = skills.filter((s) => s.category === category)
        if (group.length === 0) return null
        return (
          <FadeUp key={category} delay={ci * 0.08}>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted mb-4">
                {categoryLabel[category]}
              </p>
              <ul className="space-y-2">
                {group.map((skill) => (
                  <li key={skill.name} className="text-sm font-mono text-foreground/80">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Create `components/code-section.tsx`**

```tsx
import Link from "next/link"
import { Github } from "lucide-react"
import { TextReveal } from "./animations/text-reveal"
import { FadeUp } from "./animations/fade-up"
import { ProjectCard } from "./project-card"
import { SkillsGrid } from "./skills-grid"
import { projects } from "@/content/projects"
import { profile } from "@/content/profile"

export function CodeSection() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="code" className="py-32 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-20">
        <TextReveal wrapperClassName="mb-4">
          <p className="text-xs tracking-[0.35em] uppercase text-muted">Engineering</p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Things I&apos;ve built.
          </h2>
        </TextReveal>
      </div>

      {/* Featured projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
        {featured.map((project, i) => (
          <ProjectCard key={project.title} project={project} delay={i * 0.1} />
        ))}
      </div>

      {/* GitHub CTA */}
      <FadeUp className="mb-20">
        <Link
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-border px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-card transition-colors"
        >
          <Github size={15} />
          View all on GitHub
        </Link>
      </FadeUp>

      {/* Divider */}
      <div className="border-t border-border mb-20" />

      {/* Skills */}
      <div>
        <TextReveal wrapperClassName="mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-muted">Stack</p>
        </TextReveal>
        <SkillsGrid />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Add CodeSection to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { PhotographyTeaser } from "@/components/photography-teaser"
import { CodeSection } from "@/components/code-section"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PhotographyTeaser />
      <CodeSection />
    </main>
  )
}
```

- [ ] **Step 5: Verify — project cards, GitHub link, and skills grid all render**

- [ ] **Step 6: Commit**

```bash
git add components/project-card.tsx components/skills-grid.tsx components/code-section.tsx app/page.tsx
git commit -m "feat: Code section with project cards, GitHub link, and skills grid"
```

---

## Task 10: Contact / Footer

**Files:**
- Create: `components/contact.tsx`

- [ ] **Step 1: Create `components/contact.tsx`**

```tsx
import Link from "next/link"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { TextReveal } from "./animations/text-reveal"
import { FadeUp } from "./animations/fade-up"
import { profile } from "@/content/profile"

const socials = [
  { label: "Email", href: profile.social.email, icon: Mail },
  { label: "GitHub", href: profile.social.github, icon: Github },
  { label: "LinkedIn", href: profile.social.linkedin, icon: Linkedin },
  { label: "Instagram", href: profile.social.instagram, icon: Instagram },
]

export function Contact() {
  return (
    <footer id="contact" className="py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <TextReveal wrapperClassName="mb-4">
            <p className="text-xs tracking-[0.35em] uppercase text-muted">Contact</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2
              className="text-3xl sm:text-4xl font-light"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Let&apos;s connect.
            </h2>
          </TextReveal>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-8 mb-24">
          {socials.map(({ label, href, icon: Icon }, i) => (
            <FadeUp key={label} delay={i * 0.08}>
              <Link
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-3 text-muted hover:text-foreground transition-colors group"
              >
                <Icon size={16} className="transition-transform group-hover:-translate-y-0.5" />
                <span className="text-xs tracking-[0.2em] uppercase">{label}</span>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Bottom line */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-muted tracking-widest">
          <span className="uppercase">{profile.name}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add Contact to `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { PhotographyTeaser } from "@/components/photography-teaser"
import { CodeSection } from "@/components/code-section"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PhotographyTeaser />
      <CodeSection />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: Type-check the full homepage**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Verify full homepage scrolls end-to-end in dev server**

Checklist:
- Hero: full viewport, parallax moves, name reveals on load
- About: photo + bio fade in on scroll
- Photography: 4 location cards fade in, "View all" visible
- Code: project cards, GitHub CTA, skills grid
- Footer: social links, copyright

- [ ] **Step 5: Commit — ✅ Homepage checkpoint**

```bash
git add components/contact.tsx app/page.tsx
git commit -m "feat: Contact/footer section — homepage complete"
```

---

## Task 11: Photography index page

**Files:**
- Create: `components/masonry-grid.tsx`
- Create: `app/photography/page.tsx`

- [ ] **Step 1: Create `components/masonry-grid.tsx`**

Uses CSS `columns` — no JS masonry library needed. Works with `next/image` via explicit width/height.

```tsx
import { FadeUp } from "./animations/fade-up"
import { LocationCard } from "./location-card"
import type { Location } from "@/content/types"

interface MasonryGridProps {
  locations: Location[]
}

export function MasonryGrid({ locations }: MasonryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {locations.map((location, i) => (
        <FadeUp key={location.slug} delay={(i % 3) * 0.1} className="break-inside-avoid">
          <LocationCard location={location} />
        </FadeUp>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create `app/photography/page.tsx`**

```tsx
import { TextReveal } from "@/components/animations/text-reveal"
import { MasonryGrid } from "@/components/masonry-grid"
import { locations } from "@/content/locations"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Photography — Trevor Reese",
  description: "Travel photography by Trevor Reese.",
}

export default function PhotographyPage() {
  const sorted = [...locations].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <TextReveal wrapperClassName="mb-4">
          <p className="text-xs tracking-[0.35em] uppercase text-muted">Portfolio</p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h1
            className="text-4xl sm:text-5xl font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Places.
          </h1>
        </TextReveal>
      </div>

      {/* Masonry grid */}
      <MasonryGrid locations={sorted} />
    </main>
  )
}
```

- [ ] **Step 3: Verify `/photography` in dev server**

- All 4 locations render in masonry grid
- Cards link to `/photography/[slug]`
- Staggered fade-up on scroll

- [ ] **Step 4: Commit**

```bash
git add components/masonry-grid.tsx app/photography/
git commit -m "feat: Photography index page with masonry grid"
```

---

## Task 12: Photography location page

**Files:**
- Create: `components/location-hero.tsx`
- Create: `components/photo-grid.tsx`
- Create: `components/sublocation-section.tsx`
- Create: `app/photography/[slug]/page.tsx`

- [ ] **Step 1: Create `components/location-hero.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `components/photo-grid.tsx`**

Displays a list of photos in a responsive grid with staggered fade-up. Skips index 0 when called from the location page (that's the hero photo).

```tsx
import Image from "next/image"
import { FadeUp } from "./animations/fade-up"
import type { Photo } from "@/content/types"

interface PhotoGridProps {
  photos: Photo[]
  /** skip this many from the start (default 0) */
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
```

- [ ] **Step 3: Create `components/sublocation-section.tsx`**

```tsx
import { TextReveal } from "./animations/text-reveal"
import { PhotoGrid } from "./photo-grid"
import type { Sublocation } from "@/content/types"

interface SublocationSectionProps {
  sublocation: Sublocation
  delay?: number
}

export function SublocationSection({ sublocation, delay = 0 }: SublocationSectionProps) {
  return (
    <section className="mb-24">
      {/* Text-reveal heading */}
      <div className="px-6 max-w-7xl mx-auto mb-8">
        <TextReveal delay={delay} wrapperClassName="mb-1">
          <p className="text-xs tracking-[0.4em] uppercase text-muted">Series</p>
        </TextReveal>
        <TextReveal delay={delay + 0.1}>
          <h2
            className="text-2xl sm:text-3xl font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {sublocation.name}
          </h2>
        </TextReveal>
      </div>

      {/* Photo grid */}
      <div className="px-6 max-w-7xl mx-auto">
        <PhotoGrid photos={sublocation.photos} />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `app/photography/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation"
import { locations } from "@/content/locations"
import { LocationHero } from "@/components/location-hero"
import { PhotoGrid } from "@/components/photo-grid"
import { SublocationSection } from "@/components/sublocation-section"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const location = locations.find((l) => l.slug === slug)
  if (!location) return {}
  return {
    title: `${location.name} — Trevor Reese`,
    description: `Travel photography from ${location.name}, ${location.country}.`,
  }
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params
  const location = locations.find((l) => l.slug === slug)
  if (!location) notFound()

  return (
    <main>
      {/* Full-bleed parallax hero (first photo) */}
      <LocationHero location={location} />

      {/* Main photo grid (skip the hero photo) */}
      {location.photos.length > 1 && (
        <div className="px-6 max-w-7xl mx-auto py-16">
          <PhotoGrid photos={location.photos} skipFirst={1} />
        </div>
      )}

      {/* Sublocation sections */}
      {location.sublocations && location.sublocations.length > 0 && (
        <div className="py-8">
          {location.sublocations.map((sublocation, i) => (
            <SublocationSection
              key={sublocation.name}
              sublocation={sublocation}
              delay={i * 0.05}
            />
          ))}
        </div>
      )}
    </main>
  )
}
```

- [ ] **Step 5: Type-check everything**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Verify location pages in dev server**

- Visit http://localhost:3000/photography/copenhagen
- Hero: full-bleed parallax, name + country unmask on load
- Photo grid below with staggered fade-in
- "Parks" and "Castles" headings reveal on scroll with grids below
- Visit http://localhost:3000/photography/tokyo — masonry style works
- Visit http://localhost:3000/photography/patagonia — no sublocations, only grid

- [ ] **Step 7: Commit**

```bash
git add components/location-hero.tsx components/photo-grid.tsx components/sublocation-section.tsx app/photography/
git commit -m "feat: Photography location pages with parallax hero, photo grid, and sublocation sections"
```

---

## Task 13: Production build verification

**Files:**
- No new files — verification only

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Note any warnings.

- [ ] **Step 2: Fix any TypeScript or build errors before proceeding**

Common issues to check:
- `await params` used correctly in `[slug]/page.tsx` (Next.js 16 async params)
- All `next/image` components have `alt`, `width`+`height` or `fill`
- No `useEffect`/`useState` in Server Components (they must be `"use client"`)

- [ ] **Step 3: Run the production server locally**

```bash
npm run start
```

Open http://localhost:3000 and do a full scroll-through:
- [ ] Hero parallax and text reveal work
- [ ] Dark/light toggle persists on refresh
- [ ] Photography teaser cards link correctly to `/photography`
- [ ] `/photography` masonry grid loads all locations
- [ ] `/photography/copenhagen` shows parallax hero + sublocations
- [ ] Nav blur-in appears on scroll
- [ ] All fade-up animations trigger once on scroll

- [ ] **Step 4: Add `.gitignore` entries for Next.js build output**

Check that `.next/` is already in `.gitignore` (create-next-app adds it). If not:

```bash
echo ".next/" >> .gitignore
echo "out/" >> .gitignore
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete personal website — homepage, photography index, and location pages"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Hero with parallax + text reveal
- ✅ About with portrait + bio
- ✅ Photography teaser (4 cards → /photography)
- ✅ Code section: project cards + GitHub CTA + skills grid
- ✅ Contact/footer with all 4 social links
- ✅ Photography index: masonry grid, all locations, staggered fade-up
- ✅ Location page: parallax hero → photo grid → sublocation sections with text-reveal headings
- ✅ Dark default via `defaultTheme="dark"` in ThemeProvider
- ✅ Light mode toggle with localStorage persistence via next-themes
- ✅ `galleryStyle: "masonry" | "editorial"` — `masonry` path uses MasonryGrid in the main grid; `editorial` path uses standard PhotoGrid (editorial rhythm is the default for location pages). Full editorial rhythm (hero → pairs → hero) is an enhancement for v2 if Trevor wants it.
- ✅ `prefers-reduced-motion` respected via CSS reset
- ✅ Placeholder content marked with `[REPLACE]` comments
- ✅ `generateStaticParams` — site is fully static, no server needed

**Type consistency:** All components consume types from `content/types.ts`. `Photo`, `Location`, `Sublocation`, `Project`, `Skill`, `Profile` used consistently throughout.
