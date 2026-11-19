# BSM — Security Agency, Goa

Marketing site for BSM, a professional security agency based in Goa, India.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger + SplitText) · Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the finished site to ./out
npm run start      # serve the built site locally
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run media      # assets-src/media -> public/media
npm run check:content   # what is still waiting on BSM
```

> `npm run lint` needs its dev dependencies installed once: `npm install`.

## A static site — no server

`npm run build` produces **`out/`**: plain HTML, CSS, JS and images. There is no
Node server, no API route and no API key anywhere in the project.

**To put it online:** upload the *contents* of `out/` to any web host — Netlify,
GitHub Pages, Hostinger, cPanel, a plain folder on a web server. Nothing else to
install or configure.

**To look at it on this machine:**

```bash
npx serve out      # then open the address it prints
```

Opening `out/index.html` by double-clicking it will not work: browsers block a
page from loading its own scripts over `file://`, so the page would appear
unstyled. The one command above is the way to view it locally.

## Project structure

```
app/              routes — one folder per page, plus layout, globals.css, metadata
components/
  layout/         chrome that persists across routes (navbar, footer, scroll,
                  transitions, the enquiry drawer, the content guard)
  sections/       whole page sections, composed of ui pieces
  ui/             the smallest reusable pieces (Button, Section, MediaFrame…)
lib/
  media/          the media dictionaries — see below
  site.ts         contact details, offices, navigation, services, clients
  about.ts        About Us copy, verbatim as BSM supplied it
  schema.tsx      structured data for search engines
  gsap.ts         the single GSAP registration point
public/           served as-is: /media photographs, /media/clients logos
assets-src/       masters that are NOT served — run `npm run media`
scripts/          one-off tooling (media pipeline, content check)
```

A page composes sections; a section composes ui pieces; nothing reaches for a
file path or a phone number directly — it imports from `lib`. That is the whole
architecture.

### Images and media

Every image on the site is one line in a dictionary under **`lib/media/`**,
imported as one module:

```ts
import { media, logo, gallery, clientLogos } from "@/lib/media";
```

| File | What it holds |
| --- | --- |
| `lib/media/types.ts` | the shapes — `Shot`, `GalleryItem` |
| `lib/media/photos.ts` | every photograph, plus the BSM logo |
| `lib/media/gallery.ts` | which photographs appear on the gallery page |
| `lib/media/client-logos.ts` | one line per client, keyed by slug |

**To change an image** point its entry at another file in `public/media`.
**To remove one** set the value to `""` — the frame falls back to a placeholder
that states on the page what belongs there. **To add one** drop the file in
`public/media` (or put the master in `assets-src/media` and run `npm run media`)
and add an entry. No component is touched either way.

`npm run check:content` lists every placeholder and every empty media slot, so
nothing unfinished reaches the live site by accident.

### Enquiries

With no server the form cannot send mail itself. It fills a message addressed to
`contact@bsmsecurityagency.com` with the visitor's number and enquiry, and opens
it in their Gmail (or their own mail app); they press Send. Nothing is ever
reported as delivered when it has not been.

---

## Before this site goes live

Nothing on this site invents BSM's awards, certifications, client names, years of
operation, headcount, ratings or statistics. Everything unverified is a bracketed
placeholder that renders in a distinct brass, dashed style so it cannot be mistaken
for a claim.

**Find every placeholder:**

```bash
grep -rn "\[[A-Z][A-Z /&-]*\]" lib/ app/ components/
```

### 1. Contact and identity — `lib/site.ts`

| Field | Placeholder |
| --- | --- |
| Business hours | `9am-5:30pm` |
| Legal entity | `BSM SECURITY AGENCY` |
| `site.url` | currently `https://www.bsmsecurity.in` — set the real domain; it drives canonical URLs, sitemap, OG tags and schema |

Phone, WhatsApp, email and the Head Office address are set. `contact.phones`
holds all three general lines in order and `contact.phone` / `phoneHref` is the
primary one, used wherever a single number is shown.

**Offices** live in the `offices` array in the same file and drive `/branch`:
Head Office (Margao) and Branch Office – Goa (Chimbel), each with its address,
numbers, WhatsApp, email, one photograph frame and one Google Maps embed.
Head Office address B renders as text and is deliberately not mapped, so the
site shows exactly two mapped locations.

Three addresses, kept apart on purpose: general enquiries
`contact@bsmsecurityagency.com`, Head Office `headoffice@bsmsecurityagency.com`,
Branch Office `bsmgoa.dgr@gmail.com`. The enquiry form always delivers to the
general address.

`coreStrengths`, `vision` and `mission` hold copy supplied by BSM and are
reproduced on the home page verbatim — presentation only, no rewording.

### 2. Services — `lib/site.ts`

The seven service categories are structured and ready. Scope specifics are
bracketed (`[EVENT SECURITY SCOPE DETAILS]` and so on). **Specialised Services**
(`slug: "specialised-services"`) is entirely unconfirmed — every line is marked
*to be confirmed*. Delete the whole entry if BSM does not offer those services.

### 3. Clients — `lib/site.ts`

`clients`, `testimonials` and `clientFacts` drive `/clients`. Every entry is a
bracketed placeholder: no client name, logo, testimonial or figure has been
invented. Replace the bracketed strings, and point `logo` at a file in
`public/media` once BSM supplies artwork. Publish a client name only with that
client's written permission.

### 4. Leadership and history — `app/about/page.tsx`

Four leadership cards and the company-history block are placeholders. Timeline
markup is not included, because no verified dates exist yet — add it alongside
the history block once BSM supplies real milestones.

### 5. Photography

The site ships with **demo photography** so it can be shown complete. Every
image is a licensed stand-in from Unsplash (Unsplash License — free for
commercial use, no attribution required), stored in `public/media/`. **None of
these are photographs of BSM, its personnel or its sites**, and the footer says
so on every page.

All of it is declared in one place, `lib/media.ts`:

```ts
heroDeployment: {
  src: "/media/hero-security-officer.jpg",
  alt: "Security officer in a dark suit wearing a security identification lanyard...",
  label: "Personnel on post",
  brief: "Replace with BSM's own photography — a guard at a gate or lobby, shot in low light.",
},
```

To swap in BSM's own photography: drop the file into `public/media/`, point
`src` at it, and rewrite `alt` to describe the real image. `brief` records what
the shot is meant to show. **Deleting a `src` is safe** — that frame falls back
to the composed placeholder state, which states on the page what photograph
belongs there.

Shot list, in priority order (the `brief` field on each entry says the same
thing in context):

1. `heroDeployment` — uniformed personnel on post, gate or lobby, low light
2. `briefing` — shift briefing / handover
3. `patrol` — patrol round or perimeter walk
4. `records` — gate register and occurrence book, close up
5. `coast` / `goaLandscape` — a recognisable Goa location BSM covers
6. `estate`, `guarding`, `corporate`, `residential`, `event`, `industrial`,
   `hospitality`, `night` — one per service block
7. Leadership portraits — see below

**Leadership portraits are deliberately still placeholders.** Attaching a real,
identifiable person's face to an invented BSM job title is a different and worse
kind of fiction than a generic stock interior, so those four cards render the
`[Portrait]` frame until BSM supplies real photographs and names.

`/gallery` is driven by the `gallery` array at the bottom of `lib/media.ts`.
Entries point at a shot declared above; an entry with no `shot` renders the
placeholder frame and states what photograph belongs there. Add BSM's files to
`public/media`, declare them in `media`, and the page picks them up with no
layout change.

The official BSM logo is `public/bsm-logo.jpg`, declared as `logo` in
`lib/media.ts` and rendered by `<Logo />` at its native square ratio in the
navbar and footer. It is never stretched or recoloured.

`next.config.ts` also allows `images.unsplash.com` if you would rather serve
from a remote CDN; add your own hostname to `remotePatterns` for anything else.

### 6. Enquiry delivery

One form, in two places: the **Request Security** drawer and the enquiry block
on `/contact` both render `components/sections/EnquiryForm.tsx` and post to
`app/api/enquiry/route.ts`. Two fields only — contact number (required, +91,
ten digits starting 6-9) and enquiry (optional). Submissions are validated
again on the server, rate limited per IP, and screened with a honeypot and a
minimum fill time.

Delivery is by email through [Resend](https://resend.com):

```bash
cp .env.example .env.local
# RESEND_API_KEY=re_...
# ENQUIRY_FROM_EMAIL="BSM Security <enquiries@your-verified-domain>"
# ENQUIRY_TO_EMAIL=contact@bsmsecurityagency.com
```

`ENQUIRY_FROM_EMAIL` must be an address on a domain verified with Resend, or
the provider rejects the send. The API key is read server-side only and is
never exposed to the browser.

Until `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` are both set, the endpoint
returns `501` and the form states that the enquiry has **not** been delivered,
pointing the visitor at phone, email and WhatsApp instead. A rejected send
returns `502` and shows the same kind of error. A success message is only ever
shown once Resend has accepted the message for delivery.

`ENQUIRY_WEBHOOK_URL` is still honoured, as a fallback for deployments that
forward enquiries to a CRM or chat webhook rather than email. It is used only
when the Resend variables are unset.

---

## How the site is put together

```
app/
  layout.tsx            fonts, metadata, LocalBusiness schema, global chrome
  page.tsx              home
  about|clients|services|gallery|branch|contact/page.tsx
  api/enquiry/route.ts  enquiry endpoint
  sitemap.ts robots.ts opengraph-image.tsx twitter-image.tsx icon.svg
  not-found.tsx loading.tsx globals.css
components/
  layout/   Navbar, Footer, SmoothScroll, RevealEngine, PageTransition,
            EnquiryModal, ScrollProgress, BackToTop, Intro
  sections/ Hero, Statement, CoreStrengths, VisionMission, ServicesOverview,
            Industries, Process, GoaPresence, CallToAction, EnquiryForm
  ui/       Button, MediaFrame, Section, PageHero, Placeholder, Logo,
            RequestSecurityButton
lib/
  site.ts    all copy and contact data (single source of truth)
  media.ts   every image: src, alt, caption and replacement brief
  schema.tsx structured data
  gsap.ts    plugin registration + reduced-motion helper
```

### Motion

`components/layout/RevealEngine.tsx` is the one place scroll animation is
defined. Sections opt in with data attributes rather than shipping their own
effects:

| Attribute | Effect |
| --- | --- |
| `data-split` | headline revealed line by line out of a mask (SplitText) |
| `data-reveal="up\|fade\|scale"` | element rises, fades or settles in |
| `data-clip` | media frame wiped open with a clip-path |
| `data-stagger` / `data-stagger-item` | children cascade in |
| `data-parallax="0.15"` | drifts against the scroll (desktop only) |
| `data-rule` | hairline rule draws itself across |
| `data-delay="0.08"` | delays a `data-reveal` |

Every animation is created inside a `gsap.context()` and reverted on route
change, so no ScrollTrigger outlives its DOM. Bespoke timelines (hero,
horizontal sector run, process rail, page curtain) live with their components
and clean up the same way.

**Two things worth knowing if you extend the motion work:**

1. `RevealEngine` is rendered by *each page*, never by the root layout. GSAP
   writes inline `transform`/`opacity`/`clip-path` onto the nodes it animates,
   and a layout-level effect runs before the page subtree has hydrated — React
   then finds styles it never rendered and throws the whole tree away.
2. Never give ScrollTrigger `pin` a top-level child of `<main>`. It wraps
   whatever it pins in a `.pin-spacer`; if React later tries to remove that node
   from a parent it no longer belongs to, the app tears down on navigation. Pin
   an inner element instead (see `components/sections/Industries.tsx`).

**Reduced motion:** `prefers-reduced-motion: reduce` disables Lenis, the intro, the page curtain and every scroll effect. The pre-animation
hidden states are applied only by the `anim-ready` class, which an inline script
in `app/layout.tsx` adds before paint and only when JS is running and motion is
allowed — so the page can never be stuck invisible.

### Design tokens

Defined as Tailwind v4 `@theme` variables in `app/globals.css`: near-black navy
base (`void`/`ink`/`surface`/`raise`), bone type, `mist`/`dim` for secondary
text, one brass accent (`#c8a45c`) and one alert red reserved for emergency
contact. Type scale is fluid (`text-mega` → `text-label`). The site is dark by
design; there is no light theme.

Fonts: **Archivo** (display and body), **Instrument Serif** (italic accents),
**JetBrains Mono** (labels, indices, technical read-outs), all via `next/font`.

### SEO

Per-page metadata and canonicals, Open Graph and Twitter cards with a generated
share image, `LocalBusiness` + `SecurityService` schema, `FAQPage` schema on
services, `BreadcrumbList` on inner pages, semantic landmarks, one `h1` per page,
plus `sitemap.xml` and `robots.txt`.

Placeholder values are intentionally left bracketed in the structured data too —
publishing invented phone numbers or licence details into schema is worse than
publishing none, because search engines surface them directly.

### Accessibility

Skip link, keyboard-operable navigation and mobile menu (Escape closes, focus
returns to the toggle), visible brass focus rings, `aria-current` on the active
nav item, labelled form fields with inline errors and a live region, semantic
headings, and `alt` text driven by the `alt`/`label` props on every media frame.
The site uses the visitor's native pointer — there is no custom cursor.
