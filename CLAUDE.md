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
- **Icons:** Lucide React, React Icons
- **Images:** Cloudinary (CDN + transforms) + next/image
- **Deployment:** Vercel (auto-deploy from `main` branch)

---

## Site Structure

```
/ (homepage — single scrolling page)
  ├── Hero (infinite scrolling photo strip)
  ├── About (bio + photo + Etsy + Ko-fi buttons)
  ├── Photography teaser (featured location cards)
  ├── Code / Projects
  └── Contact / Footer (social links incl. Ko-fi)

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
  favicon.ico             logo favicon (RGBA PNG, required by Turbopack)
  photography/
    page.tsx              location index (masonry grid)
    [slug]/page.tsx       individual location gallery

components/
  nav.tsx                 fixed nav with scroll-blur + mobile hamburger + ThemeToggle
  hero.tsx                full-bleed infinite scrolling photo strip hero
  hero-photo-strip.tsx    Framer Motion marquee strip (0% → -50%, width: max-content)
  about.tsx               bio text + photo + Etsy + Ko-fi buttons
  photography-teaser.tsx  featured location cards → /photography
  location-card.tsx       card: cover photo, name, country, year
  code-section.tsx        projects grid + GitHub CTA + skills
  project-card.tsx        individual project card (supports imageContain for logos)
  skills-grid.tsx         tech stack grid
  contact.tsx             footer with social links (incl. Ko-fi)
  masonry-grid.tsx        CSS-columns masonry for photo index
  location-hero.tsx       parallax hero for location pages
  photo-grid.tsx          responsive 2→3 col grid with staggered fade-up
  sublocation-section.tsx label + horizontal rule divider + photo grid
  photo-protection.tsx    right-click / drag protection on photos
  contact-form.tsx        contact form
  animations/
    fade-up.tsx
    text-reveal.tsx
    parallax-image.tsx

content/
  types.ts                all shared TypeScript types (Location, Project, Profile, etc.)
  profile.ts              name, bio, social links (incl. Ko-fi), profile photo URL
  locations.ts            travel destinations + photos (Cloudinary URLs) — do not edit manually
  projects.ts             code projects with images and links
  skills.ts               tech stack list
  hero-photos.ts          curated hero strip photo order (31 photos)

scripts/
  sync-cloudinary.mjs     regenerates content/locations.ts and appends to hero-photos.ts
                          sublocations config lives in the LOCATIONS array — preserved on sync
  sync-project-images.mjs patches content/projects.ts with images from "code projects" folder

lib/
  utils.ts                cn() helper

public/
  favicon.ico             fallback favicon
  favicon.png             500×500 logo PNG
```

---

## Content

### Photos (`content/locations.ts`)
All photos served from **Cloudinary** (cloud name: `dyqdtpd3b`). Do not edit `locations.ts` manually — run the sync script instead.

Cloudinary URL format:
```
https://res.cloudinary.com/dyqdtpd3b/image/upload/f_auto,q_auto/{public_id}.{ext}
```

Cover/hero naming convention (root of Cloudinary, not in a folder):
```
{year}_{location_slug}_cover_{id}.jpg   ← index card (portrait)
{year}_{location_slug}_hero_{id}.jpg    ← location page parallax hero (landscape)
```

NOTE: For Richmond Park, the cover and hero filenames have swapped labels in Cloudinary (upload mistake). The sync script's LOCATIONS array uses the corrected assignment (`coverKey` → shown as cover, `heroKey` → shown as hero).

**All 20 locations and their Cloudinary folder names:**
| Slug | Folder | Year |
|---|---|---|
| chicago | 2019 chicago | 2019 |
| edinburgh | 2021 edinburgh | 2021 |
| lake-tahoe | 2021 lake tahoe | 2021 |
| shrewsbury-ironbridge | 2021 shrewsbury and ironbridge | 2021 |
| berlin | 2022 berlin | 2022 |
| copenhagen | 2022 copenhagen | 2022 |
| hamburg | 2022 hamburg | 2022 |
| murrieta-car-show-2022 | 2022 murrieta car show | 2022 |
| prague | 2022 prague | 2022 |
| roehampton-snow | 2022 roehampton snow | 2022 |
| shropshire-hills | 2022 shropshire hills | 2022 |
| boise | 2023 boise | 2023 |
| bratislava | 2023 bratislava | 2023 |
| budapest | 2023 budapest | 2023 |
| murrieta-car-show-2023 | 2023 murrieta car show | 2023 |
| vienna | 2023 vienna | 2023 |
| york | 2023 york | 2023 |
| lake-vyrnwy | 2024 lake vyrnwy | 2024 |
| much-wenlock | 2024 much wenlock | 2024 |
| richmond-park | 2024 richmond park | 2024 |

**Featured locations** (homepage teaser — 3 max): Edinburgh, Prague, Budapest

**Richmond Park sublocations:** Canon EOS R (`IMG_*` files) first, Samsung Galaxy S22 Ultra (`20240527_*` files) second. Sublocation config lives in the `LOCATIONS` array in `sync-cloudinary.mjs` and is preserved on every sync run.

### Hero photos (`content/hero-photos.ts`)
31 curated photos in a manually set order. The sync script appends new uploads without disturbing the order. Reorder entries in this file to curate the strip.

Hero strip settings: `duration={120}` seconds per loop (set in `components/hero.tsx`).

### Profile (`content/profile.ts`)
Bio, tagline, profile photo URL, and social links:
- GitHub: https://github.com/ttrevorreese
- LinkedIn: https://linkedin.com/in/ttrevorreese
- Instagram: https://instagram.com/ttrevorreese
- Etsy: https://www.etsy.com/shop/PhotographyByTHR
- Ko-fi: https://ko-fi.com/ttrevorreese
- Email: trevor.reese2002@gmail.com

### Projects (`content/projects.ts`)
11 featured projects (all `featured: true`, shown in a 3-wide grid at `lg` breakpoint):
1. Cherished Memories Photography — TypeScript/Supabase client site (live)
2. SnapFlow — internal ops platform (ERP) for a school photography business, Next.js/Supabase — no public link (private client system)
3. Constellation — photographer PWA + sales CRM, Next.js/Supabase syncing from Airtable — no public link (private client system)
4. Pulsar — Windows app coordinating Zebra ID-card printing across a laptop fleet, C#/.NET/WPF — no public link (source private; public repo is a signed-build auto-update channel only)
5. PrintGate — Windows app routing print jobs to networked Zebra printers, C#/.NET/WPF — no public link (same reasoning as Pulsar)
6. Payload — Windows auto-backup app that uploads/groups photos on Dropbox sync, C#/.NET/WPF — no public link (same reasoning as Pulsar)
7. Murrieta: Connected — Python/Jupyter bus routing (GitHub)
8. Ambient Reverie — Python/AI ambient YouTube pipeline (YouTube)
9. The Affirmation Garden — Python/AI affirmation YouTube channel (YouTube)
10. Metronome — Node.js/Docker CRUD app (GitHub) — `imageContain: true`
11. Personal Portfolio — Next.js portfolio (GitHub + live)

SnapFlow and Constellation are working titles — final names still TBD. Pulsar, PrintGate, and Payload are all part of the same in-house Windows-app family (same C#/.NET/WPF stack); their real source repos are private and the public `*-dist` repos (e.g. `pulsar-dist`) contain only signed installers + an update manifest, no source or docs.

Project images are stored in Cloudinary folder `code projects`. Run `sync-project-images.mjs` to update URLs. `imageContain: true` on a project uses `object-contain` + padding instead of `object-cover` (used for logos).

---

## Sync Scripts

### Location photos + hero photos
```bash
CLOUDINARY_API_KEY=your_key CLOUDINARY_API_SECRET=your_secret node scripts/sync-cloudinary.mjs
```
- Regenerates `content/locations.ts` (all 20 locations)
- Appends new photos to `content/hero-photos.ts`
- Preserves sublocation config defined in LOCATIONS array

### Project images
```bash
CLOUDINARY_API_KEY=your_key CLOUDINARY_API_SECRET=your_secret node scripts/sync-project-images.mjs
```
- Fetches from `code projects` Cloudinary folder
- Updates existing `image:` fields (no duplicates) or adds new ones
- FILENAME_TO_TITLE map in the script controls matching

### Adding a new location
1. Upload photos to a new Cloudinary folder (e.g. `2025 lisbon`)
2. Upload cover + hero to Cloudinary root with correct naming
3. Add entry to `LOCATIONS` in `sync-cloudinary.mjs`
4. Run sync script → commit → push

---

## Deployment

- **Platform:** Vercel
- **Branch:** `main` → auto-deploys to production
- **Custom domain:** `ttrevorreese.com`
- **Vercel project:** `trevorreese2002-2663s-projects/website` (project ID: `prj_O5cEaPZC6zgncvWTLy6PmM7CJrIf`)
- **Image hosts allowed:** `res.cloudinary.com`

No environment variables required at runtime. Cloudinary API credentials are local-only (sync scripts).

---

## Notes

- All animations use Framer Motion with Intersection Observer triggers
- `prefers-reduced-motion` is respected
- Default theme is dark; persisted via `localStorage` (next-themes)
- Photos are statically typed in `content/locations.ts` — no CMS
- Each location has `galleryStyle: "masonry" | "editorial"` controlling grid layout
- Favicon must be RGBA PNG (not RGB) — Turbopack will fail to build with RGB ICO
- Hero strip marquee: `initial={{ x: "0%" }} animate={{ x: "-50%" }}` with doubled photo array and `width: max-content` on the flex container
- `sync-project-images.mjs` previously caused duplicate `image:` fields when re-run — fixed to replace existing URLs instead of appending
