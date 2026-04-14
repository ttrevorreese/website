# Trevor Reese — Personal Website

Personal portfolio site for Trevor Reese: software engineer and travel photographer. Features a curated photography gallery spanning 20+ destinations across the US and Europe, a coding projects showcase, and a scrolling hero built from real travel photos.

**Live site:** [ttrevorreese.com](https://ttrevorreese.com)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16.2.1 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Images | Cloudinary (CDN + transforms) + next/image |
| Fonts | Geist Sans, Geist Mono, Playfair Display |
| Icons | Lucide React, React Icons |
| Dark mode | next-themes |
| Deployment | Vercel (auto-deploy from `main`) |

---

## Project Structure

```
app/
  layout.tsx                 Root layout — ThemeProvider, fonts, Nav
  page.tsx                   Homepage (single scrolling page)
  globals.css                CSS variable token system (dark/light)
  photography/
    page.tsx                 Photography index — masonry grid of all destinations
    [slug]/page.tsx          Individual location gallery

components/
  nav.tsx                    Fixed nav with scroll-blur + mobile hamburger + ThemeToggle
  hero.tsx                   Full-bleed infinite photo strip hero
  hero-photo-strip.tsx       Framer Motion marquee strip component
  about.tsx                  Bio text + profile photo
  photography-teaser.tsx     Featured location cards → /photography
  location-card.tsx          Card: cover photo, name, country, year
  code-section.tsx           Projects grid + GitHub CTA + skills
  project-card.tsx           Individual project card (image, tech stack, links)
  skills-grid.tsx            Tech stack display grid
  contact.tsx                Footer with social links
  masonry-grid.tsx           CSS-columns masonry layout
  location-hero.tsx          Parallax hero for location pages
  photo-grid.tsx             Responsive 2→3 col grid with staggered fade-up
  sublocation-section.tsx    Camera/shoot divider + photo grid within a location
  photo-protection.tsx       Right-click / drag-to-save protection on all photos
  contact-form.tsx           Contact form
  animations/
    fade-up.tsx
    text-reveal.tsx
    parallax-image.tsx

content/
  types.ts                   Shared TypeScript types (Location, Project, Profile, etc.)
  profile.ts                 Name, bio, social links, profile photo URL
  locations.ts               All travel destinations + photos (Cloudinary URLs)
  projects.ts                Coding projects with links and images
  skills.ts                  Tech stack list
  hero-photos.ts             Curated hero strip photo order

scripts/
  sync-cloudinary.mjs        Fetches photos from Cloudinary and regenerates locations.ts
                             and hero-photos.ts. Preserves sublocation config.
  sync-project-images.mjs    Fetches project images from "code projects" Cloudinary folder
                             and patches content/projects.ts with correct URLs.
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Cloudinary Sync

Photos are served from Cloudinary. Two scripts handle syncing:

### Location photos

```bash
CLOUDINARY_API_KEY=your_key CLOUDINARY_API_SECRET=your_secret node scripts/sync-cloudinary.mjs
```

- Fetches every photo from each location's Cloudinary folder
- Regenerates `content/locations.ts` with real URLs and dimensions
- Appends new hero photos to `content/hero-photos.ts` without overwriting existing order
- Preserves any `sublocations` config defined in the LOCATIONS array (e.g. Richmond Park's Canon / Samsung split)

### Project images

```bash
CLOUDINARY_API_KEY=your_key CLOUDINARY_API_SECRET=your_secret node scripts/sync-project-images.mjs
```

- Fetches images from the `code projects` Cloudinary folder
- Matches filenames to projects and patches `content/projects.ts`

Find your API key and secret at: **Cloudinary Dashboard → Settings → API Keys**

---

## Adding a New Location

1. Upload photos to a new Cloudinary folder (e.g. `2025 lisbon`)
2. Upload cover and hero images with the correct naming convention:
   - Cover (portrait, shown on index): `2025_lisbon_cover_{id}.jpg`
   - Hero (landscape, shown on location page): `2025_lisbon_hero_{id}.jpg`
3. Add an entry to the `LOCATIONS` array in `scripts/sync-cloudinary.mjs`:
   ```js
   { slug: "lisbon", name: "Lisbon", country: "Portugal", year: 2025,
     featured: false, galleryStyle: "editorial", camera: null,
     folder: "2025 lisbon", coverKey: "2025_lisbon_cover_{id}", heroKey: "2025_lisbon_hero_{id}" },
   ```
4. Run the sync script
5. Commit and push — Vercel deploys automatically

To add sublocations (e.g. grouped by camera), add a `sublocations` key to the location entry:
```js
sublocations: [
  { name: "Canon EOS R",   match: id => id.startsWith("IMG_") },
  { name: "iPhone 15 Pro", match: id => id.startsWith("2025_") },
],
```

---

## Adding Hero Photos

Upload images to the `hero photos` Cloudinary folder, then run the sync script. New photos are appended to `content/hero-photos.ts` without disturbing your existing order. Reorder entries manually in that file to curate the strip.

---

## Deployment

- **Platform:** Vercel
- **Trigger:** Push to `main` → auto-deploys to production
- **Domain:** `ttrevorreese.com`

No build configuration needed — Vercel detects Next.js automatically.

---

## Environment Variables

No environment variables are required at runtime. The Cloudinary API credentials are only used locally when running sync scripts and are never committed or deployed.
