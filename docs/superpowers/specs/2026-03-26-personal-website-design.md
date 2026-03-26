# Trevor Reese — Personal Website Design Spec
**Date:** 2026-03-26
**Status:** Approved

---

## Overview

A personal portfolio website for Trevor Reese — software engineer and travel photographer. The site presents both professional identities with equal weight: a photography portfolio driven by travel, and a programming showcase anchored to GitHub. The aesthetic blends editorial luxury (dark, typographic, generous whitespace) with cinematic atmosphere (full-bleed photography, parallax depth, filmic scroll).

---

## Identity

- **Name:** Trevor Reese
- **Roles:** Software Engineer · Travel Photographer
- **Tone:** Professional but human. Confident without being boastful. The design does the talking.

---

## Aesthetic Direction

**Editorial / Luxury + Cinematic / Atmospheric blend.**

- Dark background (`#0a0a0a`) as the default canvas
- Off-white text (`#f0f0f0`), never pure white
- Wide letter-spacing and uppercase for section labels
- Serif moments (Playfair Display) for editorial headings
- Geist Sans for all body and UI text
- Geist Mono for code, stats, metadata
- One accent color — warm off-white or a single muted tone, no rainbow palette
- Photography is always full-bleed or edge-to-edge, never boxed with visible borders
- No decorative gradients except where they serve the photo compositions

---

## Site Structure

### Routing

```
/ (homepage — single scrolling page)
  ├── Hero
  ├── About
  ├── Photography teaser
  ├── Code / Projects
  └── Contact / Footer

/photography
  └── Location index (masonry grid of destinations)

/photography/[slug]
  └── Individual location gallery
```

### Homepage Sections

**Hero**
- Full-bleed background photo (parallax)
- Name: "TREVOR REESE" — large, uppercase, Playfair Display or Geist, weight 300
- Tagline: e.g. "Photographer · Engineer" — small, wide letter-spacing
- Subtle scroll indicator
- Dark overlay on photo for legibility

**About**
- Square or portrait photo placeholder (left) + bio text (right) on desktop; stacked on mobile
- 2–3 short paragraphs: who you are, what drives you, the dual identity
- Placeholder copy to be replaced by Trevor

**Photography Teaser**
- 3–4 featured location cards in a horizontal or 2×2 grid
- Each card: cover photo (full bleed), location name, country, photo count
- Cards fade up on scroll
- "View all" link → `/photography`

**Code / Projects**
Three-part section:
1. **GitHub pinned repos** — pulled from GitHub API or hardcoded from config; name, description, language badge, star count
2. **Featured project cards** — hand-picked, with screenshot/thumbnail, description, tech stack pills, GitHub + live links
3. **Skills / Tech stack** — icon grid or labeled list of languages, frameworks, tools

**Contact / Footer**
- Clean, minimal
- Links: Email (mailto), GitHub, LinkedIn, Instagram
- Copyright line

---

## Photography System

### Location Index (`/photography`)

- Masonry grid of all destination cards
- Each card: cover photo, location name, country, sublocation count or photo count
- Cards animate in with staggered fade-up on scroll
- Clicking a card → `/photography/[slug]`

### Location Page (`/photography/[slug]`)

Three-layer structure:

1. **Parallax hero** — first photo of the collection fills the viewport. Background image moves at ~0.4× scroll speed. Location name + country revealed with text-unmask animation on load.

2. **Main photo grid** — remaining photos in a responsive grid (2-col mobile, 3-col desktop). Each photo fades up as it enters the viewport (staggered Intersection Observer).

3. **Sublocations** (optional per location) — if a location has named subsets (e.g. Copenhagen → Parks, Castles, Cathedrals), each subset gets a text-reveal heading (clip-path unmask from bottom) followed by its own photo grid.

### Gallery Styles

Each location in `content/locations.ts` declares `galleryStyle: "masonry" | "editorial"`:
- **Masonry:** Pinterest-style varying heights across all photos
- **Editorial:** Hero → pairs → hero rhythm (photo essay feel)

---

## Animation System

| Element | Animation | Trigger |
|---|---|---|
| Photography section hero | Parallax — bg at 0.4× scroll speed | Continuous scroll |
| Page/section headings | Text reveal — clip-path unmask bottom→top | Intersection Observer |
| Sublocation headings | Text reveal — clip-path unmask | Intersection Observer |
| Grid cards / photo tiles | Fade up + stagger (100ms between items) | Intersection Observer |
| Nav | Fade in on load; blur-backdrop appears on scroll | Scroll |
| Dark/light toggle | Smooth CSS transition on all color tokens | Click |
| Page transitions | Opacity fade (Next.js route transitions) | Route change |

All animations built with **Framer Motion**. Respects `prefers-reduced-motion`.

---

## Dark / Light Mode

- **Default:** Dark mode
- **Persistence:** `localStorage` via `next-themes`
- **Toggle:** Icon button in the navigation bar (sun/moon)
- Dark palette: `#0a0a0a` bg, `#f0f0f0` text, `#1a1a1a` card surfaces
- Light palette: `#f8f8f6` bg, `#111111` text, `#eeede9` card surfaces
- Transition: 200ms on all color properties

---

## Content Architecture

### TypeScript config files (no CMS)

```
content/
  locations.ts    ← travel destinations, photo arrays, sublocation groups
  projects.ts     ← featured code projects
  skills.ts       ← tech stack / tools
  profile.ts      ← name, bio, social links, photo path
```

**Location data shape:**
```ts
type Sublocation = {
  name: string
  photos: Photo[]
}

type Location = {
  slug: string
  name: string
  country: string
  coverImage: string
  galleryStyle: "masonry" | "editorial"
  year?: number
  sublocations?: Sublocation[]
  photos: Photo[]   // photos not in a sublocation
}

type Photo = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}
```

**Project data shape:**
```ts
type Project = {
  title: string
  description: string
  tech: string[]
  github?: string
  live?: string
  image?: string
  featured: boolean
}
```

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16, App Router | Routing, image optimization, static generation |
| Language | TypeScript | Type-safe content config |
| Styling | Tailwind CSS | Utility-first, easy dark mode |
| Components | shadcn/ui | Accessible primitives |
| Animations | Framer Motion | Parallax, text reveal, fade-up |
| Dark mode | next-themes | Persistent, flash-free |
| Images | next/image | Blur placeholders, responsive sizes |
| Icons | Lucide React | Consistent, tree-shakeable |
| Fonts | Geist Sans + Geist Mono + Playfair Display | Brand-aligned |
| Deployment | Vercel Hobby (free) | Zero-config Next.js, auto-deploys from GitHub |

---

## Hosting & Domain

**Platform:** Vercel Hobby plan (free)
- Auto-deploy on every push to `main`
- Preview deployments on every branch
- Free SSL, global CDN
- Custom domain support

**Domain options:**
- Buy directly via `vercel.com/domains` — auto-configured DNS (~$10–20/yr)
- Buy at cost via Cloudflare Registrar — manually add to Vercel project settings

**Recommended domains to check:** `trevorreese.com`, `trevorreese.photography`

**GitHub integration:** Push to GitHub → Vercel auto-deploys. No CI config needed.

---

## File Structure (target)

```
/
├── app/
│   ├── layout.tsx              ← root layout, ThemeProvider, fonts
│   ├── page.tsx                ← homepage (Hero + About + Photo teaser + Code + Contact)
│   ├── photography/
│   │   ├── page.tsx            ← location index (masonry grid)
│   │   └── [slug]/
│   │       └── page.tsx        ← individual location gallery
│   └── globals.css
├── components/
│   ├── nav.tsx
│   ├── hero.tsx
│   ├── about.tsx
│   ├── photography-teaser.tsx
│   ├── code-section.tsx
│   ├── contact.tsx
│   ├── location-card.tsx
│   ├── location-hero.tsx
│   ├── photo-grid.tsx
│   ├── masonry-grid.tsx
│   ├── text-reveal.tsx         ← reusable clip-path text animation
│   ├── fade-up.tsx             ← reusable fade-up wrapper
│   └── theme-toggle.tsx
├── content/
│   ├── locations.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── profile.ts
├── public/
│   └── photos/                 ← placeholder images, replaced with real ones later
└── lib/
    └── utils.ts
```

---

## Placeholder Strategy

All content is placeholder until Trevor provides real assets:
- **Photos:** Unsplash images via URL (no download needed for prototype)
- **Bio text:** Lorem-ipsum-style placeholder, clearly marked with `[REPLACE]` comments
- **Projects:** 2–3 skeleton project cards, clearly marked
- **Social links:** `#` href placeholders

---

## Out of Scope (for now)

- Contact form with backend (email links only for now)
- Blog / writing section
- Password-protected client galleries
- CMS integration
- Analytics
