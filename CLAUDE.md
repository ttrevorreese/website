# Trevor Reese — Personal Website

Personal portfolio site for Trevor Reese: software engineer and travel photographer.

---

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Dark mode:** next-themes
- **Fonts:** Geist Sans, Geist Mono, Playfair Display
- **Icons:** Lucide React
- **Images:** next/image
- **Deployment:** Vercel (auto-deploy from `main` branch)

---

## Site Structure

```
/ (homepage — single scrolling page)
  ├── Hero (full-bleed parallax)
  ├── About (bio + photo)
  ├── Photography teaser (featured location cards)
  ├── Code / Projects
  └── Contact / Footer

/photography
  └── Masonry grid of all destinations

/photography/[slug]
  └── Parallax hero → photo grid → sublocation sections
```

---

## File Map

```
app/
  layout.tsx              root layout, ThemeProvider, fonts, Nav
  page.tsx                homepage
  globals.css             CSS variables, dark/light tokens
  photography/
    page.tsx              location index (masonry grid)
    [slug]/page.tsx       individual location gallery

components/
  nav.tsx                 fixed nav with scroll-blur + ThemeToggle
  hero.tsx                full-bleed parallax hero
  about.tsx               bio text + photo
  photography-teaser.tsx  featured location cards → /photography
  location-card.tsx       card: cover photo, name, country, count
  code-section.tsx        GitHub repos + project cards + skills
  project-card.tsx        individual project card
  skills-grid.tsx         tech stack grid
  contact.tsx             footer with social links
  masonry-grid.tsx        CSS-columns masonry for photo index
  location-hero.tsx       parallax hero for location pages
  photo-grid.tsx          responsive 2→3 col grid with staggered fade-up
  sublocation-section.tsx text-reveal heading + photo grid
  photo-protection.tsx    right-click / drag protection on photos
  contact-form.tsx        contact form
  animations/
    fade-up.tsx
    text-reveal.tsx
    parallax-image.tsx

content/
  types.ts                all shared TypeScript types
  profile.ts              name, bio, social links
  locations.ts            travel destinations + photos (currently Unsplash placeholders)
  projects.ts             code projects
  skills.ts               tech stack list

lib/
  utils.ts                cn() helper
```

---

## Content

### Photos (`content/locations.ts`)
Currently uses **Unsplash placeholder URLs**. Real photos will be served from **Cloudinary**.

`next.config.ts` currently allows: `images.unsplash.com`

**Pending:** Add `res.cloudinary.com` to allowed image hosts, then replace all Unsplash URLs with real Cloudinary URLs.

Cloudinary URL format:
```
https://res.cloudinary.com/{cloud-name}/image/upload/w_1200,h_800,c_fill,f_auto,q_auto/{folder}/{filename}
```

### Profile (`content/profile.ts`)
Contains bio text, social links (GitHub, LinkedIn, Instagram, Etsy), and profile photo path.

### Projects (`content/projects.ts`)
Featured code projects with GitHub/live links.

---

## Deployment

- **Platform:** Vercel
- **Branch:** `main` → auto-deploys to production
- **Custom domain:** purchased via Vercel — **needs to be connected in Vercel project settings** (in progress)
- **Image hosts allowed:** `images.unsplash.com` (temporary), `res.cloudinary.com` (pending)

---

## Current Status

### Done
- [x] Full site scaffold (Next.js, Tailwind v4, Framer Motion, next-themes)
- [x] CSS variable token system (dark/light mode)
- [x] Nav with scroll-blur, theme toggle, hamburger mobile menu
- [x] Hero section (full-bleed parallax)
- [x] About section
- [x] Photography teaser (featured location cards)
- [x] Code/Projects section
- [x] Contact/footer section with social links (including Etsy)
- [x] `/photography` index (masonry grid)
- [x] `/photography/[slug]` location pages (hero + photo grid + sublocations)
- [x] Parallax image animation component
- [x] Text reveal animation component
- [x] Fade-up animation component
- [x] Photo right-click / drag protection
- [x] Back button on location pages
- [x] Contact form
- [x] Mobile hamburger menu

### In Progress
- [ ] Connect custom Vercel domain to the project
- [ ] Upload real photos to Cloudinary
- [ ] Add `res.cloudinary.com` to `next.config.ts` image hosts
- [ ] Replace Unsplash placeholders in `content/locations.ts` with real Cloudinary URLs

### Pending
- [ ] Replace profile photo placeholder in `content/profile.ts`
- [ ] Replace bio placeholder text in `content/profile.ts`
- [ ] Replace placeholder projects in `content/projects.ts` with real projects

---

## Notes

- All animations use Framer Motion with Intersection Observer triggers
- `prefers-reduced-motion` is respected
- Default theme is dark; persisted via `localStorage` (next-themes)
- Photos are statically typed in `content/locations.ts` — no CMS
- Each location has `galleryStyle: "masonry" | "editorial"` controlling grid layout
