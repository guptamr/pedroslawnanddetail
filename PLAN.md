# Pedro's Lawn & Detail — Implementation Plan

**Repository:** https://github.com/guptamr/pedroslawnanddetail
**Live URL (temporary):** https://guptamr.github.io/pedroslawnanddetail/
**Live URL (future custom domain):** TBD — CNAME file scaffolded but empty until domain purchased
**Owner:** Pedro (independent local service provider, St. Thomas, Ontario)
**Form submissions email:** aliziapeters2000@gmail.com

---

## Table of Contents

1. [Project Goals & Constraints](#1-project-goals--constraints)
2. [Reference Architecture (stthomasdeco pattern)](#2-reference-architecture-stthomasdeco-pattern)
3. [Tech Stack](#3-tech-stack)
4. [Repository Structure](#4-repository-structure)
5. [Design System](#5-design-system)
6. [Content Specification (per section)](#6-content-specification-per-section)
7. [Image Inventory & Processing](#7-image-inventory--processing)
8. [Contact Form (FormSubmit)](#8-contact-form-formsubmit)
9. [SEO / Meta / Structured Data](#9-seo--meta--structured-data)
10. [Accessibility & Performance](#10-accessibility--performance)
11. [Security](#11-security)
12. [Configuration File (site.config.js)](#12-configuration-file-siteconfigjs)
13. [Deployment (GitHub Pages)](#13-deployment-github-pages)
14. [Custom Domain (future)](#14-custom-domain-future)
15. [Testing (Playwright)](#15-testing-playwright)
16. [Build Phases](#16-build-phases)
17. [Acceptance Criteria](#17-acceptance-criteria)
18. [Deferred / Out of Scope](#18-deferred--out-of-scope)

---

## 1. Project Goals & Constraints

### Business Context
- **Owner:** Pedro — independent local worker in St. Thomas, Ontario.
- **Currently advertises on:** Facebook Marketplace only, no existing website.
- **Two service identities:**
  - **Pedro's Lawn Care** — grass cutting, yard cleanup, weed removal, garden bed cleanup, leaf raking, general outdoor help.
  - **Pedro's Car Detailing** — interior cleaning for cars, SUVs, and trucks (vacuuming, floor/carpet, mats, interior surfaces).
- **Umbrella brand (temporary):** *Pedro's Lawn & Detail* — retain both service identities visibly.
- **Competes on:** affordable pricing, personal service, flexible jobs, direct communication, willingness to handle small/overgrown jobs, visible before-and-after results.

### Non-negotiables
- ✅ Mobile-first (most visitors arrive from Facebook Marketplace on a phone).
- ✅ Real before-and-after photos remain the primary marketing asset in the **work gallery** — the actual results sell the service.
- ✅ Two distinct service categories obvious at a glance, but one cohesive brand.
- ✅ **Pedro's Lawn & Detail may be presented as an established local business** — professional, dependable, and legitimate. Position it the way established local competitors position themselves in St. Thomas / Elgin County.
- ✅ **Confident, competitor-matched marketing language is allowed** where it fits the local landscape — e.g., 'trusted local service', 'reliable', 'professional interior detailing', 'dedicated to quality work', 'your local go-to for lawn and detailing'. Keep the tone grounded and believable — no world-champion or industry-leading claims.
- ✅ **Placeholder testimonials and star ratings may be included** as decorative social-proof to build initial credibility. Use generic-sounding local names (e.g., 'Mike R., St. Thomas', 'Sarah L., Elgin County') and mark them clearly as sample content in a code comment. Real reviews will replace these as customers provide them.
- ✅ **AI-generated, licensed stock, or otherwise commercially available imagery is fine** wherever it improves polish or credibility — hero backgrounds, section decoration, 'how it works' illustrations, service-card accents, review avatars. Pedro's real photos remain the source of truth for the **work gallery specifically**.
- ❌ Do NOT fabricate verifiable credentials that could be fact-checked and disproved: no fake certifications, no bogus license numbers, no fake insurance carriers, no fake awards, no fake physical street address, no fake 'X years in business' claim.
- ❌ Do NOT imply automotive repair or mechanical work — interior detailing only.
- ❌ Do NOT mention dog waste cleanup.
- ❌ Do NOT include checkout, payments, account registration, or complex booking software.
- ❌ Do NOT use AI-generated or fabricated results in the actual **before-and-after gallery** — that section must show only Pedro's real work.

### Primary Website Goal
Generate direct local inquiries. Make it extremely easy for a visitor to:
1. Understand what Pedro does.
2. See real before-and-after examples.
3. Contact Pedro for a quote.

### Primary CTA
- **"Get a Free Quote"** (main, appears in nav, hero, after services, near bottom).
- **"Ask Pedro for a Quote"** (alternative, form submit button).
- Once phone number is provided later: support both **Call Pedro** and **Text Pedro** links.

---

## 2. Reference Architecture (stthomasdeco pattern)

The site is modeled directly on `guptamr/stthomasdeco` (live at https://stthomasdeco.ca) — a proven zero-build static site pattern.

### What we're copying from stthomasdeco
- **File structure:** single `index.html` + `css/style.css` + `js/main.js` + `images/` + optional Playwright tests.
- **CSS pattern:** design tokens in `:root`, mobile-first breakpoint at 768px, CSS Grid/Flexbox, `clamp()` for fluid type, `.reveal` + `.visible` scroll-reveal.
- **JS pattern:** vanilla JS in an IIFE with `'use strict'`, IntersectionObserver for scroll reveal, native `<dialog>` for lightbox, event delegation.
- **Header:** fixed, transparent on load, `.header--scrolled` class added when `scrollY > 60px`.
- **Mobile nav:** three-bar hamburger that transforms to X, slides in from right.
- **Services cards:** auto-fit CSS Grid.
- **Gallery:** masonry via CSS `columns` with `break-inside: avoid`, filter buttons, lightbox with prev/next/keyboard support.
- **Contact form:** FormSubmit.co with honeypot spam trap + hidden `_captcha`, `_next`, `_subject` fields.
- **SVG icons:** inline (zero HTTP requests).
- **Images:** all use `loading="lazy"` and descriptive `alt` text; preload ~500px before viewport for slow mobile.
- **Fonts:** Google Fonts CDN with `preconnect` + `display=swap`.

### What we're changing for Pedro
- **Two-tone palette** (green for lawn, slate for detailing) instead of stthomasdeco's single green+gold.
- **Fonts:** bold/friendly sans-serif (Inter or Poppins) instead of Cormorant Garamond serif — Pedro is practical, not elegant.
- **No hand-painted logo image** — use a simple text/typography logo until Pedro supplies a real logo.
- **Service cards: 2 cards** (Lawn Care, Car Detailing) instead of 4.
- **Gallery filters:** 2 categories (Lawn & Yard / Car Detailing) instead of 4.
- **Form fields:** simpler set (name, phone, service dropdown, description) — no event date, no email required if phone provided (still recommend both).
- **No card rotating carousel** initially — keep it simpler; each service card gets one representative image.
- **No decorative SVG dividers between sections** — cleaner, less "wedding-like".
- **`site.config.js`** — new central config file for business name, phone, email, service area, FormSubmit target. Pedro can change any of these in one place later.

### Research to perform before coding
Copilot should read these files from the stthomasdeco repo as living references:
- `https://raw.githubusercontent.com/guptamr/stthomasdeco/main/index.html` — HTML structure, semantic markup, CSP header, form fields.
- `https://raw.githubusercontent.com/guptamr/stthomasdeco/main/css/style.css` — CSS custom properties, breakpoints, scroll reveal, lightbox styles, hamburger animation.
- `https://raw.githubusercontent.com/guptamr/stthomasdeco/main/js/main.js` — IIFE structure, scroll listeners, lightbox event handling, IntersectionObserver setup.
- `https://raw.githubusercontent.com/guptamr/stthomasdeco/main/playwright.config.js` — three-viewport test config.
- `https://raw.githubusercontent.com/guptamr/stthomasdeco/main/package.json` — test scripts + Playwright dev dependency only.

Reuse everything that works; simplify where the wedding/event styling is too fancy for Pedro's brand.

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Markup | HTML5 (single `index.html`) | Zero build, semantic, one file to edit |
| Styles | CSS3 with custom properties in `:root` | Design tokens, mobile-first, Grid/Flexbox |
| Scripts | Vanilla JS (ES5-compatible, IIFE) | No framework, no build |
| Fonts | Google Fonts (Inter or Poppins) | Free CDN, `preconnect` + `display=swap` |
| Icons | Inline SVGs | Zero HTTP requests, CSS-styleable |
| Forms | FormSubmit.co | Free, no backend, honeypot-protected |
| Hosting | GitHub Pages (Fastly CDN) | Free, `git push` = deploy in ~60 seconds |
| SSL | Let's Encrypt (auto via GitHub Pages) | Free |
| Config | `site.config.js` (single JS object) | One place to change name/phone/email |
| Tests | Playwright (optional Phase 5) | 3-viewport unit + snapshot tests |
| Build tools | **None** | No npm needed to serve the site |

**Zero-server architecture:** browser → GitHub Pages CDN → static files. Contact form posts to FormSubmit.co which emails Pedro.

---

## 4. Repository Structure

```
pedroslawnanddetail/
├── index.html                  ← Single-page site (8 sections)
├── site.config.js              ← ⭐ Central config: name, phone, email, area
├── css/
│   └── style.css               ← All styles, design tokens, responsive
├── js/
│   └── main.js                 ← IIFE, vanilla JS
├── images/
│   ├── logo/                   ← (Reserved — text logo used until real logo supplied)
│   ├── hero/
│   │   └── hero-lawn-transformation.jpg   ← Image (13) — the star before/after
│   ├── lawn/
│   │   ├── lawn-front-hedge-before-after.jpg
│   │   ├── yard-gravel-wide-before-after.jpg
│   │   ├── yard-sculpture-corner-before-after.jpg
│   │   ├── yard-stepping-stones-before-after.jpg
│   │   ├── garden-border-mulch-before-after.jpg
│   │   └── garden-bed-iris-before-after.jpg
│   └── detailing/
│       ├── car-rear-floor-before-after.jpg
│       ├── car-passenger-mat-before-after.jpg
│       └── car-driver-mat-before-after.jpg
├── tests/                      ← (Phase 5, optional)
│   ├── unit.spec.js
│   └── snapshot.spec.js
├── playwright.config.js        ← (Phase 5, optional)
├── package.json                ← Only for Playwright dev dependency
├── package-lock.json
├── CNAME                       ← Empty file for now — populated when domain purchased
├── .gitignore                  ← node_modules/, .DS_Store, test artifacts
├── PLAN.md                     ← This document
├── TESTPLAN.md                 ← Test plan (created in Phase 5)
└── README.md                   ← Setup + deploy guide, auto-generated
```

### Notes
- **No `index.js`, no `webpack.config`, no `vite.config`** — this is intentionally build-free.
- **`.gitignore` must include:** `node_modules/`, `.DS_Store`, `test-results/`, `playwright-report/`, `*.log`.
- **`CNAME` file:** created empty (or containing a placeholder comment) in Phase 6; populated with the actual domain once Pedro buys one.

---

## 5. Design System

### Palette (CSS custom properties in `:root`)

```css
:root {
  /* Shared brand */
  --color-bg:            #FAFAF7;    /* Off-white page background */
  --color-bg-section:    #F5F5F1;    /* Alternating section background */
  --color-text:          #1F2933;    /* Body copy, near-black */
  --color-text-muted:    #52606D;    /* Subtitles, meta text */
  --color-text-light:    #FFFFFF;    /* Text on dark backgrounds */
  --color-border:        #E4E7EB;    /* Card + form borders */

  /* Lawn Care — natural greens */
  --color-lawn:          #2D6A4F;    /* Primary green — headings, lawn card */
  --color-lawn-dark:     #1B4332;    /* Deep green — lawn card hover */
  --color-lawn-light:    #95D5B2;    /* Fresh accent, tags */
  --color-lawn-bg:       #EEF7F0;    /* Very light green section wash */

  /* Car Detailing — slate charcoal */
  --color-detail:        #334155;    /* Primary slate — detailing card */
  --color-detail-dark:   #1E293B;    /* Deep charcoal — hover */
  --color-detail-light:  #94A3B8;    /* Muted slate accent */
  --color-detail-bg:     #F1F5F9;    /* Very light slate section wash */

  /* Shared CTA (unifies both categories) */
  --color-cta:           #F59E0B;    /* Warm amber — primary buttons */
  --color-cta-dark:      #D97706;    /* Amber hover */

  /* Type */
  --ff-heading:          'Poppins', system-ui, -apple-system, sans-serif;
  --ff-body:             'Inter', system-ui, -apple-system, sans-serif;

  /* Elevation & shape */
  --shadow-card:         0 4px 20px rgba(15, 23, 42, 0.08);
  --shadow-card-hover:   0 10px 30px rgba(15, 23, 42, 0.12);
  --radius:              12px;
  --radius-sm:           8px;
  --transition:          0.25s ease;

  /* Layout */
  --container-max:       1200px;
  --nav-height:          64px;
}
```

### Typography
- **Headings:** Poppins 600/700 — bold, friendly, geometric.
- **Body:** Inter 400/500 — clean, extremely readable at any size.
- **Fluid heading sizes:** use `clamp()` (e.g., `clamp(2rem, 5vw, 3.5rem)` for h1).
- **NO decorative or script fonts** — Pedro is practical, not elegant.

### Breakpoints (mobile-first)
- Base: mobile (< 768px).
- `@media (min-width: 768px)`: tablet — cards side by side, nav horizontal.
- `@media (min-width: 1024px)`: desktop — gallery goes to 3 columns.

### Spacing
- Use a consistent scale: `0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem`.
- Generous section padding: `padding: 4rem 0` mobile, `padding: 6rem 0` desktop.
- Large tap targets on mobile: minimum 44×44px for all buttons and nav links.

### Buttons
```css
.btn                { padding: 0.875rem 1.75rem; border-radius: 999px; font-weight: 600; }
.btn--cta           { background: var(--color-cta); color: #1F2933; }         /* primary CTA */
.btn--cta:hover     { background: var(--color-cta-dark); transform: translateY(-2px); }
.btn--lawn          { background: var(--color-lawn); color: #FFF; }
.btn--detail        { background: var(--color-detail); color: #FFF; }
.btn--outline       { background: transparent; border: 2px solid currentColor; }
.btn--full          { display: block; width: 100%; }
```

### Motion
- Scroll reveal: `.reveal { opacity: 0; transform: translateY(30px); transition: 0.6s ease; }` → `.visible { opacity: 1; transform: none; }`.
- Card hover: `translateY(-4px)` + shadow bump.
- No parallax, no auto-rotating carousels — keep it calm.

---

## 6. Content Specification (per section)

Copy is **exactly** as written below. Do not paraphrase. If Pedro provides updates later, edit here.

### 6.1 `<head>`
- `<title>`: `Pedro's Lawn Care & Car Detailing | St. Thomas, Ontario`
- `<meta name="description">`: `Affordable lawn care, yard cleanup, and interior car detailing in St. Thomas, Ontario. View real before-and-after work and contact Pedro for a quote.`
- Open Graph title/description mirror the above.
- `og:image`: `images/hero/hero-lawn-transformation.jpg`
- `og:url`: `https://guptamr.github.io/pedroslawnanddetail/` (updated when custom domain is live).
- Favicon: text-based SVG for now (letter "P" in a rounded green square) — replace when logo supplied.

### 6.2 Header / Navigation
- Logo/brand text: **Pedro's Lawn & Detail** (typography only, no image).
- Nav links (in order): **Home · Lawn Care · Car Detailing · Our Work · Contact**.
- CTA button (right side): **Get a Free Quote** (`--color-cta` amber pill).
- Mobile: hamburger opens slide-in drawer from right.

### 6.3 Hero Section
- **Background:** `images/hero/hero-lawn-transformation.jpg` (Image 13 — overgrown → mowed lawn collage) with a dark gradient overlay for text readability.
- **Headline (h1):** `Local Lawn Care & Car Detailing in St. Thomas`
- **Supporting copy:** `Affordable lawn care, yard cleanup, and interior car detailing from a local St. Thomas service provider.`
- **Primary CTA:** `Get a Free Quote` → scrolls to `#contact`.
- **Secondary CTA:** `See Pedro's Work` → scrolls to `#gallery`.

### 6.4 Service Choice Section (`#services`)
Two visually distinct cards, side-by-side on desktop, stacked on mobile.

**Card 1 — Pedro's Lawn Care** (green theme)
- Icon: inline SVG leaf/blade.
- Title: `Pedro's Lawn Care`
- Copy: `From regular grass cutting to overgrown yard cleanup, get straightforward help keeping your outdoor space clean and manageable.`
- Service list (bullets):
  - Grass Cutting
  - Yard Cleanup
  - Weed Removal
  - Garden Bed Cleanup
  - Leaf Raking
  - General Outdoor Help
- CTA: `Get a Lawn Care Quote` → scrolls to `#contact` and pre-selects "Lawn Care" in the form dropdown (via `?service=lawn` hash-driven JS).

**Card 2 — Pedro's Car Detailing** (slate theme)
- Icon: inline SVG car.
- Title: `Pedro's Car Detailing`
- Copy: `Interior cleaning for cars, SUVs, and trucks. Pricing is based on your vehicle and what you need cleaned.`
- Service list (bullets):
  - Interior Deep Cleaning
  - Vacuuming
  - Floor & Carpet Cleaning
  - Floor Mat Cleaning
  - Interior Surface Cleaning
- CTA: `Get a Detailing Quote` → scrolls to `#contact` and pre-selects "Car Detailing".

### 6.5 Before & After Gallery (`#gallery`)
- **Title:** `See the Difference`
- **Subtitle:** `Real before-and-after examples of Pedro's work.`
- **Filter buttons:** `All · Lawn & Yard · Car Detailing` (default: All).
- **Gallery layout:** CSS `columns: 2` mobile, `columns: 3` desktop, using `break-inside: avoid` for masonry effect.
- Each item is `<a class="gallery__item" data-category="lawn|detail" data-caption="...">` wrapping an `<img loading="lazy">` and a `<span class="gallery__overlay">Label</span>`.
- Clicking opens a native `<dialog>` lightbox (identical to stthomasdeco pattern) with prev/next arrows, keyboard (Esc/←/→), backdrop click to close.
- Filter clicks toggle `.gallery__item--hidden` and re-index the lightbox array of visible items.

**Gallery items (in order — 9 total):**

| # | File | Category | Caption / Label |
|---|---|---|---|
| 1 | `images/lawn/yard-overgrown-cleanup-before-after.jpg` (Image 13) | lawn | Overgrown Yard Cleanup |
| 2 | `images/lawn/lawn-front-hedge-before-after.jpg` (Image 9) | lawn | Front Lawn & Hedge |
| 3 | `images/lawn/yard-gravel-wide-before-after.jpg` (new collage 1) | lawn | Backyard Weed Cleanup |
| 4 | `images/lawn/yard-sculpture-corner-before-after.jpg` (new collage 2) | lawn | Garden Corner Cleanup |
| 5 | `images/lawn/yard-stepping-stones-before-after.jpg` (new collage 3) | lawn | Stepping Stone Path Cleanup |
| 6 | `images/lawn/garden-border-mulch-before-after.jpg` (Image 15) | lawn | Garden Border & Mulching |
| 7 | `images/lawn/garden-bed-iris-before-after.jpg` (Image 16) | lawn | Flower Bed Cleanup |
| 8 | `images/detailing/car-rear-floor-before-after.jpg` (Image 17) | detail | Rear Floor & Carpet |
| 9 | `images/detailing/car-passenger-mat-before-after.jpg` (Image 10) | detail | Passenger Floor Mat |
| 10 | `images/detailing/car-driver-mat-before-after.jpg` (Image 12) | detail | Driver Floor Mat |

*(Image 13 appears twice: once as the hero background, once as the first gallery item — this is intentional. The hero uses a heavily overlaid version; the gallery shows it clearly.)*

### 6.6 Why Choose Pedro's Lawn & Detail
- **Title:** `Why Choose Pedro's Lawn & Detail`
- **Subtitle:** `A trusted local name for lawn care and interior car detailing in St. Thomas.`
- Six confident value cards with inline SVG icons (3 columns desktop, 2 columns tablet, 1 column mobile):
  1. **Trusted Local Service** — A dependable St. Thomas name for lawn care and interior car detailing, built on doing the job right the first time.
  2. **Transparent, Fair Pricing** — Every quote is straightforward and based on the actual scope of the job — no hidden fees, no surprise charges.
  3. **Big or Small Jobs Welcome** — From overgrown yard rescues to a single-vehicle interior detail, every job gets the same level of attention.
  4. **Direct Communication** — Talk directly with Pedro — no call centres, no runaround, no ticket queues.
  5. **Reliable Turnaround** — Prompt scheduling and on-time arrivals so you can plan the rest of your day around the appointment.
  6. **Satisfaction Focused** — If something isn't right, Pedro makes it right — that's the promise of a local, community-based service.

*(These cards describe Pedro's operating style and service commitments. Do not add fabricated years-in-business numbers, license numbers, insurance carriers, certifications, or award badges unless Pedro supplies verified specifics.)*

### 6.7 Reviews / Star Ratings (decorative placeholder)
- **Title:** `What Customers Say`
- **Subtitle:** `Real customer feedback replaces these sample reviews as it comes in.`
- **HTML comment above the section:** `<!-- PLACEHOLDER REVIEWS — decorative only. Replace with verified customer quotes as they arrive. See PLAN.md §6.7. -->`
- **Layout:** 3 review cards side-by-side on desktop, 1-up carousel/stack on mobile (CSS `scroll-snap-x` or a simple stacked column — no JS carousel needed).
- **Each card contains:**
  - Five amber stars (inline SVG, `--color-cta`).
  - Short quote (1–2 sentences).
  - Reviewer attribution: first name + last initial + city (no photos required, but a neutral coloured initial-circle avatar is fine).
  - Small `Placeholder review` badge in the top-right of each card (subtle, muted grey text) so the source of truth stays honest during development. This badge can be hidden by a single CSS class swap when real reviews arrive.
- **Three placeholder reviews to ship with (mix of both services):**
  1. ⭐⭐⭐⭐⭐ — *Pedro cleared out our backyard in one afternoon — it hadn't been touched all summer. Fair price, on time, and the yard looks great.* — **Mike R., St. Thomas, ON**
  2. ⭐⭐⭐⭐⭐ — *Booked Pedro for an interior detail on my SUV after a family road trip. The floor mats look brand new. Easy to deal with and quick to reply.* — **Sarah L., Elgin County, ON**
  3. ⭐⭐⭐⭐⭐ — *Straightforward pricing, no upselling, and the front lawn has never looked cleaner. I'll be calling him again next season.* — **Dave M., St. Thomas, ON**
- **Accessibility:** Each star icon has `aria-hidden="true"`; the card as a whole has an `aria-label="5-star review from Mike R., St. Thomas"` (dynamic per card). The `Placeholder review` badge is `aria-hidden="true"` — screen readers do not announce it.
- **When real reviews land:** delete the badge markup, replace the three cards' text + attribution in `index.html`. No JS or CSS changes needed.

### 6.8 How It Works
- **Title:** `How It Works`
- Three numbered steps in a horizontal strip (stacked on mobile):
  1. **Tell Pedro What You Need** — Send details or photos of the job.
  2. **Get a Quote** — Pricing depends on the job, yard, or vehicle.
  3. **Get the Job Done** — Arrange a convenient time for the work.
- Optional decorative accent: small AI-generated or stock illustration next to each step (leaf icon, quote-bubble icon, checkmark icon). Inline SVG preferred; PNG/webp acceptable if higher fidelity is wanted.

### 6.9 Service Area
- **Title:** `Serving St. Thomas, Ontario`
- Copy: `Looking for lawn care, yard cleanup, or car interior detailing in St. Thomas? Contact Pedro and tell him what you need.`
- No map embed (avoids CSP complications and third-party cookies).
- No specific neighbouring cities named until Pedro confirms.

### 6.10 Contact Section (`#contact`)
- **Title:** `Get in Touch`
- **Subtitle:** `Ready for a quote? Fill out the form below or reach out directly.`
- **Two-column layout on desktop** (info left, form right); stacked on mobile.

**Left column — contact info cards:**
- Phone: **placeholder** — `(placeholder — Pedro's phone)` (rendered from `site.config.js`, hidden when empty).
- Email: `aliziapeters2000@gmail.com` (form recipient — shown as a `mailto:` link too).
- Service Area: `St. Thomas, Ontario`.
- Facebook: **placeholder link** — set to `#` in config until Pedro supplies real page URL.

**Right column — quote form** (see Section 8 for full spec).

**Note under form:** `Have photos of the yard or vehicle? Text them to Pedro or attach a description in the message. Photos help Pedro give an accurate quote.`

### 6.11 Footer
- Brand: `Pedro's Lawn & Detail`
- Sub-line: `Local lawn care & car detailing in St. Thomas, Ontario`
- Small nav: Home · Lawn Care · Car Detailing · Our Work · Contact
- Copyright: `© 2026 Pedro's Lawn & Detail. All rights reserved.`
- Attribution (small, muted): `Made with ♥ in St. Thomas, ON`

---

## 7. Image Inventory & Processing

### 7.0 Image sourcing policy
- **Work gallery (`images/lawn/`, `images/detailing/`)** — Pedro's real supplied before/after photos **only**. Do not substitute AI or stock imagery here — the whole point of the gallery is proof of real work.
- **Everything else** — AI-generated or commercially licensed stock imagery is permitted and encouraged where it improves polish or credibility:
  - Hero background alternative (if a more cinematic hero is wanted than the raw before/after).
  - `images/decor/` — optional decorative illustrations or icons for the 'How It Works' steps, 'Why Choose' cards, section dividers.
  - `images/reviews/` — optional neutral avatar images for placeholder reviewers.
  - `images/services/` — optional accent imagery next to service card copy.
- **Licensing hygiene:** any stock image used must be from a source with a licence permitting commercial web use (Unsplash, Pexels, Pixabay free licence; or paid licences from Adobe Stock / Shutterstock / Envato). Record the source URL in a top-of-file entry inside `images/CREDITS.md`.
- **AI images:** if generated (via ChatGPT image, Midjourney, Adobe Firefly, etc.), note the tool used in `images/CREDITS.md`. No requirement to disclose on the live site — but do not use AI to fabricate before/after work results in the gallery.

### 7.1 Source folder
All raw work photos are in `/Users/guptamr/Downloads/peter/`. There are 25 files but several are duplicates or Marketplace context shots that will not appear on the site.

### 7.2 Final image mapping

| Target filename | Source file(s) | Category | Notes |
|---|---|---|---|
| `hero/hero-lawn-transformation.jpg` | Image (13).jpeg — 2048×2048 | Hero | Same source as gallery item 1; hero uses darker overlay |
| `lawn/yard-overgrown-cleanup-before-after.jpg` | Image (13).jpeg | Lawn | Hero backyard overgrowth → mowed |
| `lawn/lawn-front-hedge-before-after.jpg` | Image (9).jpeg — 1440×1440 | Lawn | Horizontal side-by-side collage |
| `lawn/yard-gravel-wide-before-after.jpg` | User-supplied new collage (backyard wide) | Lawn | Weeds cleared from gravel yard |
| `lawn/yard-sculpture-corner-before-after.jpg` | User-supplied new collage (stone face) | Lawn | Overgrowth removed near sculpture |
| `lawn/yard-stepping-stones-before-after.jpg` | User-supplied new collage (stepping stones) | Lawn | Plants cleared from paver path |
| `lawn/garden-border-mulch-before-after.jpg` | Image (15).jpeg — 1366×2049 | Lawn | Garden border + mulching |
| `lawn/garden-bed-iris-before-after.jpg` | Image (16).jpeg — 1462×2046 | Lawn | Flower bed cleanup |
| `detailing/car-rear-floor-before-after.jpg` | Image (17).jpeg — 1462×2046 | Detail | Rear floor + mat cleanup |
| `detailing/car-passenger-mat-before-after.jpg` | Image (10).jpeg — 899×1599 | Detail | Low-res but usable |
| `detailing/car-driver-mat-before-after.jpg` | Image (12).jpeg — 1200×1600 | Detail | Low-res but usable |

### 7.3 Files to exclude
- Image (11) — exact duplicate of (10) — **do not copy**.
- Image (14) — exact duplicate of (13) — **do not copy**.
- Image (18) — exact duplicate of (17) — **do not copy**.
- Image (4), (5), (6), (7) — Marketplace listing / context photos — **do not copy** unless Pedro later identifies specific work in them.
- Image (8) — Marketplace listing context — **do not copy**.
- Image (19)–(28) individual portrait shots — **do not copy directly**; only the user-created collages built from these are used.

### 7.4 Processing pipeline
Run a single shell script (`scripts/process-images.sh`) that uses `sips` (built into macOS) — no npm/Python dependencies:

```bash
#!/usr/bin/env bash
# scripts/process-images.sh
# Copies + optimizes source photos into images/ with kebab-case names.
# Requires: sips (macOS built-in). No external installs.
set -euo pipefail

SRC="$HOME/Downloads/peter"
DST="images"
MAX_WIDTH=1400          # web-friendly max width
JPEG_QUALITY=82         # visually lossless, ~60% smaller than source

mkdir -p "$DST/hero" "$DST/lawn" "$DST/detailing"

copy_resize() {
  local src="$1" dst="$2"
  cp "$src" "$dst"
  sips --resampleWidth "$MAX_WIDTH" "$dst" --out "$dst" >/dev/null
  sips --setProperty formatOptions "$JPEG_QUALITY" "$dst" --out "$dst" >/dev/null
}

# Hero (same source, kept slightly larger)
copy_resize "$SRC/Image (13).jpeg"                     "$DST/hero/hero-lawn-transformation.jpg"

# Lawn
copy_resize "$SRC/Image (13).jpeg"                     "$DST/lawn/yard-overgrown-cleanup-before-after.jpg"
copy_resize "$SRC/Image (9).jpeg"                      "$DST/lawn/lawn-front-hedge-before-after.jpg"
copy_resize "$SRC/yard-gravel-wide.jpg"                "$DST/lawn/yard-gravel-wide-before-after.jpg"
copy_resize "$SRC/yard-sculpture-corner.jpg"           "$DST/lawn/yard-sculpture-corner-before-after.jpg"
copy_resize "$SRC/yard-stepping-stones.jpg"            "$DST/lawn/yard-stepping-stones-before-after.jpg"
copy_resize "$SRC/Image (15).jpeg"                     "$DST/lawn/garden-border-mulch-before-after.jpg"
copy_resize "$SRC/Image (16).jpeg"                     "$DST/lawn/garden-bed-iris-before-after.jpg"

# Detailing
copy_resize "$SRC/Image (17).jpeg"                     "$DST/detailing/car-rear-floor-before-after.jpg"
copy_resize "$SRC/Image (10).jpeg"                     "$DST/detailing/car-passenger-mat-before-after.jpg"
copy_resize "$SRC/Image (12).jpeg"                     "$DST/detailing/car-driver-mat-before-after.jpg"

echo "✅ Images processed → $DST"
```

**Action required before running:** Pedro/you must save the three user-created collages (backyard wide, sculpture corner, stepping stones) into the source folder with the filenames referenced above (`yard-gravel-wide.jpg`, `yard-sculpture-corner.jpg`, `yard-stepping-stones.jpg`). If the collages arrive with different names, update the script accordingly.

### 7.5 Quality notes
- **Two low-res detailing collages** (899×1599 and 1200×1600) — usable but will not upscale gracefully. Accept as-is; do not artificially enlarge.
- **Hero image** stays at up to 1600px wide (bumped from 1400 by editing `MAX_WIDTH` inline for that call only, or accept 1400px — good enough on 99% of screens).
- **All images** get `loading="lazy"` in HTML except the hero background which loads eagerly.
- **Alt text** must be descriptive for accessibility and local SEO — see gallery table in Section 6.5 for exact captions.

---

## 8. Contact Form (FormSubmit)

### 8.1 Configuration
- Endpoint: `https://formsubmit.co/aliziapeters2000@gmail.com`
- One-time email verification: after the first real submission, FormSubmit sends a verification email to `aliziapeters2000@gmail.com`. The link in that email must be clicked once to activate the form. **This must be done before Pedro announces the site.**

### 8.2 Hidden fields (spam protection + UX)
| Field | Value | Purpose |
|---|---|---|
| `_honey` | (empty, `display:none`) | Honeypot — bots fill it, humans don't see it |
| `_captcha` | `false` | Skip FormSubmit's captcha page |
| `_next` | `https://guptamr.github.io/pedroslawnanddetail/#contact` (update on custom domain) | Redirect after submit |
| `_subject` | `New quote request — Pedro's Lawn & Detail` | Email subject line |
| `_template` | `table` | Nicely formatted email |

### 8.3 Visible fields
| Field | Type | Required | Notes |
|---|---|---|---|
| Name | `text` | ✅ | Full name |
| Phone | `tel` | ✅ | Primary contact — Pedro will call/text back |
| Email | `email` | ⬜ optional | Backup contact |
| Service Needed | `select` | ✅ | Options: `Lawn Care`, `Yard Cleanup`, `Car Detailing`, `Other Outdoor Help`. Pre-selected via `?service=` URL param when arriving from a service card. |
| Job Description | `textarea` (4 rows) | ✅ | Placeholder: `Tell Pedro about the yard, vehicle, or job. The more detail, the better the quote.` |

### 8.4 Submit button
- Label: **Ask Pedro for a Quote**
- Class: `btn btn--cta btn--full`

### 8.5 Photo attachment
- Do NOT add a file upload input (FormSubmit's free tier is restrictive with attachments).
- Instead, show a helper note below the message field: `Have photos? Text them to Pedro or describe the job in detail above.`
- Once Pedro's phone number is known, this note can link `sms:+1XXXXXXXXXX`.

### 8.6 Form HTML skeleton
```html
<form class="contact__form" id="contactForm"
      action="https://formsubmit.co/aliziapeters2000@gmail.com"
      method="POST">
  <input type="text"  name="_honey"     style="display:none" tabindex="-1" autocomplete="off">
  <input type="hidden" name="_captcha"  value="false">
  <input type="hidden" name="_next"     value="https://guptamr.github.io/pedroslawnanddetail/#contact">
  <input type="hidden" name="_subject"  value="New quote request — Pedro's Lawn & Detail">
  <input type="hidden" name="_template" value="table">

  <div class="form__group">
    <label for="name">Your Name</label>
    <input type="text" id="name" name="name" required autocomplete="name">
  </div>
  <div class="form__group">
    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone" required autocomplete="tel"
           placeholder="(519) 555-1234">
  </div>
  <div class="form__group">
    <label for="email">Email <span class="form__optional">(optional)</span></label>
    <input type="email" id="email" name="email" autocomplete="email">
  </div>
  <div class="form__group">
    <label for="service">Service Needed</label>
    <select id="service" name="service" required>
      <option value="" disabled selected>Select a service</option>
      <option value="Lawn Care">Lawn Care</option>
      <option value="Yard Cleanup">Yard Cleanup</option>
      <option value="Car Detailing">Car Detailing</option>
      <option value="Other Outdoor Help">Other Outdoor Help</option>
    </select>
  </div>
  <div class="form__group">
    <label for="message">Tell Pedro About the Job</label>
    <textarea id="message" name="message" rows="4" required
              placeholder="Tell Pedro about the yard, vehicle, or job. The more detail, the better the quote."></textarea>
  </div>
  <p class="form__hint">Have photos? Text them to Pedro or describe the job above.</p>
  <button type="submit" class="btn btn--cta btn--full">Ask Pedro for a Quote</button>
</form>
```

---

## 9. SEO / Meta / Structured Data

### 9.1 Standard meta tags in `<head>`
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pedro's Lawn Care & Car Detailing | St. Thomas, Ontario</title>
<meta name="description" content="Affordable lawn care, yard cleanup, and interior car detailing in St. Thomas, Ontario. View real before-and-after work and contact Pedro for a quote.">
<meta name="referrer" content="strict-origin-when-cross-origin">
<link rel="canonical" href="https://guptamr.github.io/pedroslawnanddetail/">
```

### 9.2 Open Graph (Facebook Marketplace preview)
```html
<meta property="og:title" content="Pedro's Lawn Care & Car Detailing">
<meta property="og:description" content="Affordable lawn care, yard cleanup, and interior car detailing in St. Thomas, Ontario.">
<meta property="og:image" content="https://guptamr.github.io/pedroslawnanddetail/images/hero/hero-lawn-transformation.jpg">
<meta property="og:url" content="https://guptamr.github.io/pedroslawnanddetail/">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_CA">
```

### 9.3 Structured data (LocalBusiness JSON-LD)
Inline `<script type="application/ld+json">` in the `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pedro's Lawn & Detail",
  "description": "Local lawn care, yard cleanup, and interior car detailing serving St. Thomas, Ontario.",
  "areaServed": {
    "@type": "City",
    "name": "St. Thomas",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "url": "https://guptamr.github.io/pedroslawnanddetail/",
  "email": "aliziapeters2000@gmail.com",
  "image": "https://guptamr.github.io/pedroslawnanddetail/images/hero/hero-lawn-transformation.jpg"
}
```
**Do not include a `PostalAddress` or `telephone` field until Pedro supplies real ones.**

### 9.4 Target search phrases
- `lawn care St. Thomas Ontario`
- `yard cleanup St. Thomas`
- `grass cutting St. Thomas Ontario`
- `affordable lawn care St. Thomas`
- `car detailing St. Thomas Ontario`
- `interior car detailing St. Thomas`
- `car interior cleaning St. Thomas`

These should appear naturally in the h1, h2s, service area section, and image alt attributes.

### 9.5 `robots.txt` and `sitemap.xml`
- Skip both for Phase 1 (single-page site — Googlebot discovers it fine).
- Add a minimal `sitemap.xml` in Phase 4 pointing to just `/`.

---

## 10. Accessibility & Performance

### 10.1 Accessibility (WCAG 2.1 AA)
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Every `<img>` has meaningful `alt` text.
- Every form field has a `<label for>`.
- Nav hamburger button has `aria-label="Toggle navigation"` and `aria-expanded` updated by JS.
- Lightbox close/prev/next buttons have `aria-label` values.
- Focus states are visible (native + custom `:focus-visible` outline in amber).
- Colour contrast: all body text ≥ 7:1 against background (near-black on off-white). CTA button text (dark on amber) ≥ 4.5:1.
- Skip-to-content link (`.skip-link`) hidden until focused, jumps to `<main>`.
- Respect `prefers-reduced-motion`: disable scroll reveal animation.

### 10.2 Performance targets
- Lighthouse mobile score ≥ 95 in Performance, Accessibility, Best Practices, SEO.
- Total transferred size on first load < 800 KB (excluding hero image, which loads eagerly).
- `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`.
- All non-hero images `loading="lazy"`.
- Single CSS file, single JS file — 2 HTTP requests for code.
- Inline SVG icons — 0 HTTP requests for iconography.
- No third-party trackers, no analytics scripts (Phase 1).
- Passive scroll listeners: `addEventListener('scroll', fn, { passive: true })`.

---

## 11. Security

- **CSP (Content Security Policy)** meta tag:
  ```
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data:;
  form-action https://formsubmit.co;
  object-src 'none';
  base-uri 'self';
  ```
- **Permissions-Policy:** `camera=(), microphone=(), geolocation=()`.
- **All external links:** `target="_blank" rel="noopener noreferrer"`.
- **Form spam:** honeypot field `_honey` + FormSubmit's built-in rate limiting.
- **XSS:** no user-generated content is rendered anywhere — the site is fully static.
- **HTTPS enforced:** enable "Enforce HTTPS" in GitHub Pages repo settings after first deploy.
- **JS isolation:** everything wrapped in `(function(){ 'use strict'; /* ... */ })();`.

---

## 12. Configuration File (`site.config.js`)

Central config so Pedro's real details can be added in one place. Loaded before `main.js` — populates DOM via `data-config` attributes.

```js
// site.config.js
window.SITE_CONFIG = {
  brand: {
    name: "Pedro's Lawn & Detail",
    tagline: "Local lawn care & car detailing in St. Thomas, Ontario"
  },
  contact: {
    // Set to null/empty string until Pedro confirms. Phone/social blocks
    // are hidden by JS if their value is falsy.
    phone: null,               // e.g. "+15195551234"
    phoneDisplay: null,        // e.g. "(519) 555-1234"
    email: "aliziapeters2000@gmail.com",
    facebook: null,            // e.g. "https://www.facebook.com/..."
    instagram: null
  },
  location: {
    city: "St. Thomas",
    region: "Ontario",
    country: "Canada",
    areaServed: "St. Thomas and nearby areas"
  },
  form: {
    endpoint: "https://formsubmit.co/aliziapeters2000@gmail.com",
    redirectAfter: "https://guptamr.github.io/pedroslawnanddetail/#contact",
    subject: "New quote request — Pedro's Lawn & Detail"
  }
};
```

### How the config is consumed
- `main.js` reads `window.SITE_CONFIG` on `DOMContentLoaded`.
- Any DOM element with `data-config="contact.phoneDisplay"` gets its `textContent` replaced by the corresponding value.
- Elements with `data-config-href="contact.phone"` become `href="tel:..."`.
- Parent blocks with `data-config-required="contact.phone"` are hidden (`hidden` attribute) if the value is falsy.
- The form's `action` and hidden `_next` are set from `SITE_CONFIG.form.*` on load.

This means Pedro only ever edits `site.config.js` to change contact info — never `index.html`.

---

## 13. Deployment (GitHub Pages)

### 13.1 First-time setup
1. In the local `pedroslawnanddetail/` folder, run:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit: Pedro's Lawn & Detail static site"
   git remote add origin https://github.com/guptamr/pedroslawnanddetail.git
   git push -u origin main
   ```
2. On GitHub → repo → **Settings → Pages**:
   - **Source:** Deploy from a branch.
   - **Branch:** `main` / `/ (root)`.
   - Click **Save**.
3. Wait ~60 seconds. Site is live at:
   `https://guptamr.github.io/pedroslawnanddetail/`
4. Enable **Enforce HTTPS** (checkbox appears once Let's Encrypt provisions the cert — typically within 10 minutes of first publish).

### 13.2 Subsequent updates
```bash
git add .
git commit -m "Describe change"
git push
```
Live within ~60 seconds. No build step, no CI required.

### 13.3 Optional GitHub Actions (Phase 4+)
Only add if we want linting/tests on PR:
- `.github/workflows/ci.yml` runs `npm test` (Playwright) on pull requests.
- Not required for Phase 1 launch.

---

## 14. Custom Domain (future)

When Pedro purchases a domain (e.g., `pedroslawnanddetail.ca` — recommended `.ca` for local SEO):

### 14.1 In the repo
1. Edit `CNAME` file, add exactly one line:
   ```
   pedroslawnanddetail.ca
   ```
   (No `www`, no `https://`, no trailing slash.)
2. Commit + push.

### 14.2 In the domain registrar's DNS panel
Add these records for the **apex** domain:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | guptamr.github.io |

### 14.3 In GitHub Pages settings
1. Under **Custom domain**, enter `pedroslawnanddetail.ca` → Save.
2. Wait for DNS check ✅ (up to 24 hours, usually minutes).
3. Tick **Enforce HTTPS** once Let's Encrypt provisions the cert.

### 14.4 Update the codebase
- `site.config.js` → update `form.redirectAfter` to the new domain.
- `index.html` → update canonical URL, `og:url`, JSON-LD `url`.
- Commit + push.

---

## 15. Testing (Playwright — Phase 5, optional)

### 15.1 Install
```bash
npm init -y
npm install -D @playwright/test
npx playwright install chromium
```

### 15.2 `playwright.config.js`
```js
const {defineConfig, devices} = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {baseURL: 'http://localhost:8080'},
  projects: [
    {name: 'mobile',  use: {...devices['iPhone 12']}},
    {name: 'tablet',  use: {viewport: {width: 768,  height: 1024}}},
    {name: 'desktop', use: {viewport: {width: 1440, height: 900}}}
  ],
  webServer: {
    command: 'npx http-server -p 8080 -c-1 .',
    port: 8080,
    reuseExistingServer: !process.env.CI
  }
});
```

### 15.3 Test suites
- `tests/unit.spec.js` — DOM smoke tests:
  - Hero headline is visible.
  - Both service cards render with correct titles.
  - Gallery has ≥ 9 items.
  - Filter button "Car Detailing" hides all `data-category="lawn"` items.
  - Form has the 5 visible fields and 5 hidden fields.
  - Lightbox opens on gallery click.
- `tests/snapshot.spec.js` — visual regression (each viewport):
  - Full-page screenshot of `/`.
  - Contact section screenshot.
  - Baselines regenerated by `npm run test:update`.

### 15.4 Scripts in `package.json`
```json
{
  "scripts": {
    "serve": "npx http-server -p 8080 -c-1 .",
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:update": "playwright test --update-snapshots"
  }
}
```

---

## 16. Build Phases (execution order)

Each phase is a single agent invocation. Do not skip or reorder.

### Phase 0 — Preflight (image processing)
- Copy 3 user-created backyard collages into `~/Downloads/peter/` with correct filenames (see §7.4).
- Run `bash scripts/process-images.sh`.
- **Deliverable:** `images/` folder fully populated (1 hero + 7 lawn + 3 detailing = 11 optimized JPEGs).
- **Verify:** `ls images/**/*.jpg | wc -l` returns `11`.

### Phase 1 — Repo scaffold
Create these files with their initial content:
- `.gitignore` — node_modules, .DS_Store, test-results, playwright-report.
- `CNAME` — empty (`# placeholder — populate when domain purchased` comment is fine).
- `README.md` — short readme with local dev, deploy, config steps.
- `site.config.js` — per §12.
- Empty stubs: `index.html`, `css/style.css`, `js/main.js`.
- **Deliverable:** clean tree matching §4.

### Phase 2 — HTML structure
Build `index.html` with all 9 sections + lightbox `<dialog>`:
- `<head>` with meta/OG/JSON-LD/CSP per §9 & §11.
- Header, hero, services, gallery (with 10 items and filter buttons), why-pedro, **reviews (placeholder — §6.7)**, how-it-works, service-area, contact (info + form), footer, `<dialog id="lightbox">`.
- All copy verbatim from §6.
- Inline SVG icons for services, why-pedro cards, review stars, form fields, social links.
- `data-config` attributes for all dynamic contact info.
- HTML comment above the reviews section marking it as decorative/placeholder.
- **Deliverable:** `index.html` renders full skeleton with unstyled content.

### Phase 3 — CSS
Build `css/style.css`:
- `:root` tokens per §5.
- Reset + base typography.
- Layout containers (max-width 1200px, side padding responsive).
- Nav (mobile hamburger + slide drawer, desktop horizontal).
- Hero (background image + dark gradient overlay, centred content).
- Service cards (2-up on desktop, green + slate themed).
- Gallery (masonry via CSS columns, overlay label on hover/touch).
- Lightbox (fixed overlay, prev/next arrows, close button, keyboard hint).
- Why Pedro (3-up grid on desktop, 2-up tablet, 1-up mobile — 6 cards total).
- **Reviews (3-up grid desktop, `scroll-snap-x` carousel mobile, amber stars, muted `Placeholder review` badge).**
- How It Works (3 numbered horizontal steps).
- Contact (2-col desktop, stacked mobile).
- Footer.
- Reveal animations (`.reveal` → `.visible`).
- `@media (prefers-reduced-motion: reduce)` override.
- **Deliverable:** site is visually complete on mobile + desktop.

### Phase 4 — JavaScript
Build `js/main.js` (single IIFE):
- Config binder (populate all `data-config` elements, hide falsy sections).
- Mobile nav toggle (hamburger ↔ drawer, aria-expanded, close on link click).
- Smooth scroll for in-page anchors.
- Gallery filter buttons (toggle `--hidden` class, update lightbox array).
- Lightbox: open on item click, prev/next, keyboard (Esc/←/→), backdrop close.
- IntersectionObserver for `.reveal` → `.visible`.
- Form `?service=` param handler → pre-select dropdown option.
- Update form `action` + hidden `_next` from `SITE_CONFIG`.
- **Deliverable:** site is fully interactive.

### Phase 5 — Tests (optional but recommended)
- Install Playwright, create `tests/` per §15.
- Run `npm test` — all pass.
- **Deliverable:** green test run; screenshots in `test-results/`.

### Phase 6 — Deploy
- `git init`, commit, push to `guptamr/pedroslawnanddetail`.
- Enable GitHub Pages (main branch, root).
- Verify live URL.
- Enforce HTTPS once cert provisions.
- Trigger first form submission → click verification email link in `aliziapeters2000@gmail.com` inbox to activate FormSubmit.
- **Deliverable:** site live at `https://guptamr.github.io/pedroslawnanddetail/`, form working end-to-end.

### Phase 7 — Verify
- Chrome DevTools mobile emulation (iPhone SE, iPhone 14 Pro, Pixel 7): every section usable, no horizontal scroll, tap targets ≥ 44px.
- Lighthouse mobile (incognito): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Submit test form → confirm email arrives at `aliziapeters2000@gmail.com`.
- Test lightbox with keyboard only.
- Real device: open live URL on an actual iPhone and Android.
- Facebook Marketplace: paste live URL into a message → confirm Open Graph preview renders hero image + title.

---

## 17. Acceptance Criteria

The build is **done** when all of the following are true:

- [ ] `https://guptamr.github.io/pedroslawnanddetail/` loads over HTTPS.
- [ ] All 9 sections visible in this order: Header → Hero → Services → Gallery → Why Pedro → Reviews (placeholder) → How It Works → Service Area → Contact → Footer.
- [ ] All copy matches §6 verbatim (no lorem ipsum, no filler).
- [ ] Reviews section renders 3 placeholder cards with 5 amber stars each and a muted `Placeholder review` badge on each card.
- [ ] HTML comment above the reviews section clearly flags them as decorative placeholders.
- [ ] All 11 work-gallery images loaded from `images/lawn/` + `images/detailing/`, none broken, none Marketplace context shots.
- [ ] Any AI/stock imagery used for decoration is credited in `images/CREDITS.md`.
- [ ] Gallery filter buttons work; lightbox opens with prev/next/close and keyboard.
- [ ] Mobile hamburger opens a drawer; nav links close the drawer on click.
- [ ] Contact form posts to FormSubmit and lands in `aliziapeters2000@gmail.com` inbox.
- [ ] FormSubmit is activated (verification email link clicked).
- [ ] Honeypot `_honey` field is invisible and does not block real submissions.
- [ ] `site.config.js` is the single source of truth for phone, email, social links.
- [ ] Phone and Facebook blocks are hidden while their config values are `null`.
- [ ] Lighthouse mobile ≥ 90 Performance, ≥ 95 Accessibility, ≥ 95 SEO.
- [ ] Zero horizontal scroll on 375px viewport.
- [ ] All external links have `rel="noopener noreferrer"`.
- [ ] CSP meta tag present; no CSP violations in DevTools console.
- [ ] No third-party analytics/tracker scripts.
- [ ] `CNAME` file exists (empty for now).
- [ ] `README.md` documents local preview, deploy, and how to update Pedro's contact info.
- [ ] Site works with JavaScript disabled: content, images, and form are still usable (no interactivity, but no broken states).

---

## 18. Deferred / Out of Scope

The following are **intentionally excluded** from Phase 1 and will be added only when Pedro supplies real inputs:

| Item | Blocked on | Where it plugs in |
|---|---|---|
| Real phone number | Pedro confirms his mobile | `site.config.js` → `contact.phone` + `phoneDisplay` |
| Real Facebook page URL | Pedro confirms | `site.config.js` → `contact.facebook` |
| Instagram/other social | Pedro confirms | `site.config.js` → `contact.instagram` |
| Custom domain (`.ca`) | Pedro purchases | `CNAME` file + §14 steps |
| Custom logo (image) | Pedro supplies or approves generated | `images/logo/` + header markup |
| Real customer reviews | Actual customers submit feedback | Replace the 3 placeholder cards in §6.7 + remove the `Placeholder review` badges |
| Pricing tables / rate cards | Pedro decides on packaged offerings | New sub-section under each service card |
| Online booking / calendar | Business grows to justify tool | Cal.com or Calendly embed in Contact |
| Payment processing (Stripe, e-transfer link) | Pedro decides on prepayment | Contact section |
| Additional photos | Pedro sends new work | `images/lawn/` or `images/detailing/` + gallery table §6.5 |
| Analytics (Plausible, GA4) | Post-launch, only if desired | `<head>` script tag, add to CSP |
| Blog / seasonal tips | Ongoing content strategy | New `/blog/` sub-folder |
| French translation | Pedro wants bilingual | Language toggle in header, `i18n/` folder |
| Google Business Profile | Pedro registers | Link from footer + JSON-LD `sameAs` |
| Contact form file uploads | Upgrade FormSubmit plan or switch to Formspree/Netlify Forms | Replace form endpoint |

These items should not delay Phase 1 launch. They are the natural iteration list once the site is live and Pedro is getting real inquiries.

---

## Appendix — Ready-to-run summary

**To hand this plan to Copilot and get a working site:**
1. Ensure §7.4 preconditions are met (3 backyard collages saved into `~/Downloads/peter/`).
2. Prompt Copilot: *"Execute PLAN.md end-to-end, phases 0 through 6, in order. Stop after each phase and confirm before starting the next."*
3. After Phase 6, click the FormSubmit verification email in `aliziapeters2000@gmail.com`.
4. Site is live and taking quote requests.

**Total estimated deliverables:**
- 1 `index.html` (~450 lines)
- 1 `css/style.css` (~700 lines)
- 1 `js/main.js` (~200 lines)
- 1 `site.config.js` (~30 lines)
- 11 optimized JPEGs
- Supporting: `README.md`, `CNAME`, `.gitignore`, optional `package.json` + `tests/`.

**End of plan.**
