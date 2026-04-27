# Handoff: AllSquared Marketing Site

## Overview
AllSquared is a UK B2B platform that combines AI-drafted, solicitor-certified contracts, FCA-authorised escrow, milestone-based payment release on verified proof, and SRA-regulated dispute support. The handoff covers the marketing website — a single long-scrolling landing page presenting the problem, the four-step method, a comparison matrix, target personas, legal services, pricing, FAQ, and final CTA. Two complete visual directions are bundled.

## About the Design Files
The HTML files in this bundle are **design references** — high-fidelity prototypes that show the intended look, layout, copy, microcopy, content hierarchy, and interaction behaviour. They are **not production code to copy directly**.

The task is to **recreate these HTML designs in the target codebase's existing environment** (React, Next.js, Vue, Astro, etc.), using its established design tokens, component primitives, routing and CMS conventions. If no codebase exists yet, the most appropriate stack for a marketing site (Next.js + Tailwind, Astro + vanilla CSS, etc.) should be chosen and the designs implemented there.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, sigil treatment, hover and reveal interactions are all settled. Implement pixel-perfectly. Component boundaries and naming should follow the host codebase's conventions.

## Two Design Directions
Two complete versions of the same page are included. Pick one to ship; the other can be archived as design exploration.

### 1. `AllSquared.html` — Editorial / regulator-grade
- Calm, trust-led, financial-services aesthetic
- Deep navy + warm paper, single confident green for action, gold accents
- Source Serif 4 display + Inter Tight body + JetBrains Mono numerals
- Letterhead-style cards, hairline rules, document chrome
- Recommended when the audience is enterprise, large fit-out contractors, finance teams

### 2. `AllSquared - Neobrutalism.html` — Bold / confident
- Hard offset shadows, chunky 3–4px black borders, electric accent palette
- Cream paper base, lime + tomato + sky + grape + rose accents
- Archivo Black display, Space Grotesk body, JetBrains Mono micro-meta
- Recurring **framed-square sigil** — a bordered glyph with a tiny floating ² stamp — used on the brand mark, every section numeral, and key cards. This is the visual anchor of the system; preserve it.
- Recommended when the audience is independent agencies, studios, photographers, ambitious sole-trader contractors

The page sections, copy, structure, components and interactions are **identical between the two directions** — only the visual system changes.

---

## Page structure (both directions)

The page is one long scroll, no client-side routing. Sections in order:

1. **Sticky nav** — brand mark left, anchor links centre/right (How / Who / Legal / Pricing), `Sign in` ghost + `Draft a contract` primary CTA right
2. **Hero** — eyebrow tag, headline with hand-stamped emphasis, lede paragraph, three numbered pillars, two CTAs, three trust pills, sample-contract document card on the right
3. **Ticker** — auto-scrolling marquee of target audiences ("Built for →")
4. **Section 01 — The problem** — four animated count-up stat cards + a dark pull-quote
5. **Section 02 — The method** — four numbered process steps (Draft / Fund / Verify / Release)
6. **Section 03 — Diff matrix** — five-row comparison table (DIY / freelance platforms / contract tools / AllSquared)
7. **Section 04 — Built for** — three persona cards (trades · agencies · events)
8. **Section 05 — Proof** — founding-cohort placeholder block (no fabricated case studies)
9. **Section 06 — Legal services** — intro + disclaimer notice + four service cards + credentials strip + three "when to use it" cards
10. **Section 07 — Pricing** — three tiers (Small Deals £75 flat / Pay Per Deal £100 + 1% / Practice £49/mo + 0.5%) + worked example
11. **Section 08 — FAQ** — seven `<details>` accordions; only one open at a time
12. **Final CTA** — full-bleed tomato/orange band with stamp-treated headline
13. **Footer** — four-column dark footer with brand mark, link columns, legal sources note

Every section has a sticky-feeling **section numeral block** at top — a chunky 3D-bordered square with a small uppercase mono label and large display numeral. In the neobrutalism direction this carries the framed-square sigil with the floating ² corner stamp, matching the AS² brand mark.

---

## Design tokens

### Editorial (`AllSquared.html`)
```
--navy-900: #0B1B33     primary ink
--navy-800: #13294B
--navy-600: #2D466F     secondary text
--navy-400: #6B7E9E
--navy-200: #C7D0E0     hairlines
--navy-100: #E8ECF3
--paper:    #FAFAF7     warm off-white background
--paper-2:  #F2F1EB     card backgrounds
--paper-line: #E2E0D6
--white:    #FFFFFF
--green-700:#1F6B3F     action / verified — chartered-surveyor green
--green-600:#2A8554
--green-100:#E5F1EA
--gold-700: #8A6A1E     accent for marks, indices
--red-600:  #A8392B     dispute / strike

--serif: 'Source Serif 4', Georgia, serif
--sans:  'Inter Tight', system-ui, sans-serif
--mono:  'JetBrains Mono', ui-monospace

--rule:        1px solid var(--navy-200)
--rule-paper:  1px solid var(--paper-line)
--r-sm: 6px / --r-md: 10px / --r-lg: 14px
```

### Neobrutalism (`AllSquared - Neobrutalism.html`)
```
--ink:      #000000     primary ink, all borders, all hard shadows
--paper:    #FFF8EC     cream background (with 24px dotted texture)
--paper-2:  #FFE9B0     section alt background
--white:    #FFFFFF     card surface
--lime:     #C9F546     primary accent
--lime-deep:#A6D72F
--tomato:   #FF5B2E     hot accent / final CTA
--sky:      #5BB7FF     cool accent
--grape:    #B58CFF     accent
--rose:     #FFB7C7     accent

--shadow:    6px 6px 0 var(--ink)    standard offset
--shadow-lg: 10px 10px 0 var(--ink)  hero / proof
--shadow-sm: 4px 4px 0 var(--ink)    nav / pills

--border:        3px solid var(--ink)
--border-thick:  4px solid var(--ink)

--display: 'Archivo Black', Impact, sans-serif
--sans:    'Space Grotesk', system-ui, sans-serif
--mono:    'JetBrains Mono', ui-monospace
```

Border-radius is **0 throughout** in the neobrutalism direction except for the dot inside the FCA pill and the corner ² stamp.

### Spacing
- Section vertical padding: 96px desktop / 56px mobile
- Container max width: 1280px (neobrutalism) / 1240px (editorial), 32px gutters
- Card internal padding: 22–32px
- Hero vertical padding: 64px top, 96px bottom

### Typography scale
- Hero headline: `clamp(56px, 7.5vw, 108px)`, line-height 0.92, display family
- Section title: `clamp(36px, 4.6vw, 68px)`, line-height 0.96
- Card heading: 20–24px display
- Body: 15–17px, line-height 1.5
- Mono/meta: 11px, letter-spacing 0.06–0.12em, uppercase

---

## The framed-square sigil (neobrutalism only)

This is the system's visual anchor and must be preserved.

**Specification**
- A square element with a thick black border (3–4px) and a hard offset black shadow
- A floating `²` corner stamp in a circular tomato/red badge (tomato fill, white text, 2.5–3px black border, 2px offset shadow), positioned at the top-right corner with a slight overhang (`top:-6 to -8px; right:-8 to -10px`)
- Used in three places:
  1. **Brand mark (`.as-mark .glyph`)** — 40×40, lime fill, contains "AS"
  2. **Section numeral (`.s-num`)** — 104×104, ink fill on paper backgrounds, contains a small uppercase mono label and a large display numeral, rotated -2°
  3. **Reusable `.sq` utility** — for any future card-corner badge or callout, with colour modifiers `.lime` `.sky` `.grape` `.rose` `.tomato` `.ink`

**Rule of thumb:** if a card or block deserves a "stamp of authority", use the framed-square sigil. Don't proliferate — three to five instances per page is the right density.

---

## Components

### Buttons (neobrutalism)
- Hard 3px black border, 4px black offset shadow, 0 radius
- Hover: translate(-2,-2) and shadow grows to 6px
- Active: translate(2,2) and shadow shrinks to 1px
- Variants: `.btn` (white) / `.btn-primary` (lime) / `.btn-secondary` (ink) / `.btn-tomato` / `.btn-sky`
- Sizes: `.btn-sm` (10/14px padding, 11px text) / default (14/22px, 14px) / `.btn-lg` (18/28px, 15px, 4px border, 6/6/0 shadow)
- All-caps, 0.04em letter-spacing, weight 700

### Pills
- 6/12px padding, 2.5px black border, 2px offset shadow, mono 11px uppercase
- Optional 8px ink dot at the start
- Variants: white / lime / tomato (white text) / sky / grape

### Doc card (hero right)
- White surface, 4px border, 10/10/0 shadow, rotated 0.6°
- Floating "SAMPLE" stamp positioned top-right at +14/-12, rotated 8°, tomato fill
- Header row: name + reference number in a paper-2 mono pill
- Two-column "parties" block: rose + sky party cards, each with display name and mono meta
- Six-row milestone list — each row is `[number] [body + small meta] [amount pill]`
- Three states per milestone: `done` (lime fill) / `active` (tomato fill, animated 4s scaleX progress bar at the bottom) / pending (white)
- Footer status strip: ink fill, lime text, pulsing 9px lime dot

### Stat cards (problem section)
- Four-up grid, each card 100×100% with thick border + 6/6/0 shadow
- Background cycles: lime / sky / rose / paper-2
- Massive display numeral (`clamp(56px, 6.5vw, 92px)`) with `<em>` for the unit suffix at 0.55em
- Number animates on intersection-observer reveal (1.3s ease-out cubic, count-up from 0 to data-target)
- Source pill: ink fill, paper text, mono 10px uppercase

### Steps (method section)
- Four-up grid, each card has its own background colour (lime / sky / grape / tomato)
- Top row: uppercase label + 28px display numeral on an ink badge
- 48×48 ink-bordered icon square with stroked SVG glyph
- Display heading + 14px body
- Hover: translate(-3,-3), shadow grows to 9/9/0

### Diff matrix
- Single white-bordered table with a 6/6/0 shadow
- Header row paper-2 fill; "AllSquared" column header is lime
- Cell prefixes: `✗` (tomato) for missing / `~` for partial / `✓` for present / `★` for differentiator
- US column cells use lime fill + display 13px uppercase

### Persona cards (built-for section)
- Three-up grid, 100% height, full-coloured backgrounds (lime / rose / sky)
- Small ink-pill tag at top, display heading, 14.5px body, ink top-rule above a bullet list
- Bullets use `■` markers and inline mono pills for "typical deal size £X – £Y"

### FAQ accordions
- `<details>`/`<summary>` pattern, JS enforces "only one open at a time"
- Closed: white fill, 4/4/0 shadow, ink `+` icon in a 32×32 ink badge
- Open: lime fill, 6/6/0 shadow, `×` in a tomato badge
- Inner answer max-width 820px, 15px body
- Some answers contain `.faq-points` — a list of bordered sub-cards with their own numbered tags

### Pricing tiers
- Three-up grid, middle card is `.featured`: lime fill, 10/10/0 shadow, rotated -1°, with a tomato "Most chosen" ribbon at top-left
- Mono uppercase tier name in an ink pill
- 60px display price tag with mono unit suffix
- Top-ruled feature list with display `✓` markers
- Worked example block below: ink fill, lime label, 15px body, 6/6/0 shadow

### Final CTA
- Full-bleed tomato band with diagonal repeating-linear-gradient texture
- Display headline up to 108px with a lime stamp-treated word (5px border, 8/8/0 shadow, rotated -2°)
- Lime primary CTA on the dark background

### Footer
- Ink fill, paper text, lime accents
- 4-column grid: brand + tag / Platform / Built for / Company
- Bottom strip with mono copyright + legal links
- Sources paragraph in a smaller, lower-contrast neutral

---

## Interactions & Behavior

- **Smooth-scroll** anchors via `html { scroll-behavior: smooth }`
- **Stat count-up** — IntersectionObserver triggers a 1.3s ease-out cubic count from 0 to `data-target` when each `.stat` enters viewport, runs once per element (`dataset.done` flag)
- **Reveal** — same observer adds `.in` class to `.stat`, `.step`, `.persona`, `.price-card`, `.legal-card`, `.when-card`, and `.hero-pillars li`. Default state is `opacity:0; translate(0, 12px)`, transitions to opaque/zero over 0.55s
- **FAQ exclusivity** — `toggle` listener on each `<details>` closes its siblings when it opens
- **Active milestone** — clicking the active milestone in the doc card marks it `done`, advances the next pending milestone to `active`, updates the small timestamp text. One-shot listener; clones onto the new active row
- **Ticker** — pure CSS `@keyframes ticker` translating the track from 0 to -50% over 38s, with the children duplicated; pauses on hover
- **Hover affordances** — every card and CTA translates -2 to -3px on hover and grows its offset shadow; nav links flip to lime fill with a small offset shadow
- **Caret/blip** — pure CSS step animations (`caret` 1.05s, `blip` 1.4s, `pulse` 1.6s) on the hero cursor, FCA eyebrow, and milestone status dot
- **prefers-reduced-motion** — all animations and transitions reduce to 0.01ms; respect this in the rebuild

---

## Responsive

- 960px breakpoint:
  - Hero collapses to single column
  - Stats and steps go 2-up
  - Personas, pricing, legal, when-grid go 1-up
  - Nav anchor links hide (only logo + CTAs remain)
  - Footer goes 2-up
- 560px breakpoint:
  - Stats and steps go 1-up
  - Diff matrix hides columns 3 and 4 (keep DIY + AllSquared)
  - Footer goes 1-up

No mobile menu drawer is implemented — the design intentionally keeps the nav minimal on small screens and relies on the page-level CTAs.

---

## State

The page is fully static; no client state beyond the milestone-click handler and the IntersectionObserver flags. In a React/Next port:
- `Hero` / `Ticker` / `ProblemStats` / `MethodSteps` / `DiffMatrix` / `Personas` / `Proof` / `LegalServices` / `Pricing` / `FAQ` / `FinalCTA` / `Footer` are all natural component boundaries
- `Stat` should accept `{ value, suffix, label, source, color }` and own its count-up animation
- `Milestone` should accept `{ index, body, meta, amount, status }` and lift state to the parent doc card so click-advance works
- FAQ items can be a controlled accordion array with a single `openIndex` state

---

## Assets

- **Fonts** — Google Fonts: Archivo Black (400), Space Grotesk (400/500/600/700), JetBrains Mono (400/500/700) for neobrutalism; Source Serif 4, Inter Tight, JetBrains Mono for editorial. Self-host in production.
- **Icons** — All inline SVG, hand-drawn from scratch (document, card, check, arrow). Stroke 2px, currentColor. Replace with the host codebase's icon set if there is one.
- **Imagery** — None. The design is intentionally typographic and pattern-based. If real photography is added later, the persona cards are the natural slot.
- **Logo** — The `AS²` mark is composed of HTML + CSS only (a 40×40 lime square + a 14×14 tomato circular ² stamp). If a real SVG mark is produced later, drop it into `.as-mark .glyph` directly.

---

## Brand assets (`AllSquared - Brand Guide.html`)

A full brand guide is now bundled, in the chosen neobrutalism direction. It is the source of truth for everything the company puts into the world outside the marketing site.

### What it covers

1. **Logo system** — the framed-square sigil, in detail
   - **Primary lockup** (XL, 120×120 mark + Archivo Black wordmark)
   - **Four variants:** mark only · horizontal · stacked · on-dark
   - **Construction** — −2° rotation rule, 0.5× clear-space rule, stamp orbit position, minimum sizes (24×24px digital / 8mm print for the mark; 120px wide / 32mm for the lockup)
   - **Misuse** — four explicit "never do this" examples (don't straighten, don't recolour the tile, don't round the corners, don't drop the shadow)

2. **Colour** — full palette in foundation + supporting groupings, with HEX, RGB and Pantone references where relevant; explicit usage ratios (Paper 60% · Ink 22% · Lime 10% · Tomato 4% · Supporting 4%) and approved/avoided pairings

3. **Type** — three faces with specimen, weights, tracking, casing rule and use cases:
   - **Archivo Black** — display, single weight 900, UPPERCASE only
   - **Space Grotesk** — body/UI, weights 500/600/700, 13–19px
   - **JetBrains Mono** — meta/numerals, 500/700, 0.06–0.12em uppercase
   - The single rule: **no italics, ever**, in any face

4. **Voice** — four pillars (Plain · Direct · Dry · Specific) with concrete do/don't examples lifted from real copy

5. **Email signature**
   - Live preview rendered in a Gmail-style stage
   - **Copy/paste-ready table-based HTML** with a working copy button — tested-style layout for Outlook / Apple Mail / Gmail (no flexbox or CSS variables; inline styles + nested `<table>`s; Impact as Archivo Black fallback so the mark renders even when fonts are blocked)
   - Six "filled fields" cards specifying the exact format for name, role, phone, email, compliance strip, and URL

6. **Social basics**
   - Three profile mockups (LinkedIn, X, Instagram) with branded banners, the AS² avatar, and bio copy
   - Character-counted bio table covering LinkedIn tagline + About, X bio, Instagram bio, profile-photo spec, banner sizes for LinkedIn / X / Instagram / Facebook, and the cadence rule

### Implementation notes for the dev port

- **Logo as SVG, not HTML.** The HTML version composes the mark from a div + circle for prototyping. In production, ship a real **SVG** with the rotation, fill, stroke and stamp baked in. Provide:
  - `as-mark.svg` (mark only, square)
  - `as-mark-on-dark.svg` (same mark — fill stays lime, no change needed if rendered correctly)
  - `as-lockup-h.svg` (mark + wordmark, horizontal)
  - `as-lockup-v.svg` (stacked)
  - `favicon.ico` + `favicon-32.png` + `apple-touch-icon-180.png` — the mark cropped tight, no padding
- **Email signature** is plain HTML with table-based layout and inline styles. Do **not** rebuild it as a React component for the actual signature — Gmail / Outlook strip class-based styles. Keep it as static HTML and host it as a copy/paste page or distribute via Google Workspace's signature manager.
- **Social banners** should be exported as **PNG**, not implemented as HTML. The headlines in the social-card mockups use the same display tokens as the marketing site — render them in Figma at the specified sizes (LinkedIn 1584×396, X 1500×500, Instagram 1080×1080, Facebook 1640×624) and export.
- **Avatars** are 1:1, full-bleed mark, ² stamp clipping the upper-right corner. 400×400 PNG minimum, with a 1024×1024 export for retina.
- **Asset downloads** in the brand guide are placeholder anchors. Wire them up to a real CDN (or static `/brand` folder) once the SVG/PNG/PDF assets exist.

### Brand-guide structure

The guide is one long-scroll page with an 8-section TOC and matching framed-square section numerals. It uses the same neobrutalism design tokens, components and reveal behaviour as the marketing site — diff against `AllSquared - Neobrutalism.html` to see how nav, section heads and cards are reused.

---

## Files in this bundle

- `AllSquared - Neobrutalism.html` — primary marketing-site reference (chosen direction)
- `AllSquared - Brand Guide.html` — full brand guide: logo, colour, type, voice, email signature, social basics
- `AllSquared.html` — alternate editorial direction (archive)
- `design-guide.html` — typography/colour/component reference for the editorial direction (archive)

The two marketing directions share copy and structure verbatim; diff them to see exactly which classes/tokens differ. The brand guide is in the chosen neobrutalism direction only.
