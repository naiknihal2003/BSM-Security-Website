# BSM — Security Agency, Goa

Marketing site for BSM, a professional security agency based in Goa, India.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger + SplitText) · Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

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
| Phone | `[PHONE NUMBER]` (and `phoneHref`) |
| Control room | `[24/7 CONTROL ROOM NUMBER]` |
| Email | `[EMAIL]` (and `emailHref`) |
| WhatsApp | `[WHATSAPP NUMBER]` — `whatsappHref` needs the full international number, digits only, e.g. `https://wa.me/919812345678` |
| Address | `[OFFICE ADDRESS]`, `[CITY / TALUKA]`, `[PIN CODE]` |
| Business hours | `[OPENING HOURS]`, `[CONTROL ROOM AVAILABILITY]` |
| Legal entity | `[BSM LEGAL ENTITY NAME]` |
| `site.url` | currently `https://www.bsmsecurity.in` — set the real domain; it drives canonical URLs, sitemap, OG tags and schema |
| Google Map | `mapsEmbed` — replace with Google Maps → Share → Embed a map |

### 2. Services — `lib/site.ts`

The seven service categories are structured and ready. Scope specifics are
bracketed (`[EVENT SECURITY SCOPE DETAILS]` and so on). **Specialised Services**
(`slug: "specialised-services"`) is entirely unconfirmed — every line is marked
*to be confirmed*. Delete the whole entry if BSM does not offer those services.

### 3. Credentials — `components/sections/Credentials.tsx`

PSARA licence, GST, PF/ESIC, insurance and personnel verification are listed as
*fields to ask for*, never as claims BSM has them. Fill in the verified values,
or remove any row that does not apply.

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

`next.config.ts` also allows `images.unsplash.com` if you would rather serve
from a remote CDN; add your own hostname to `remotePatterns` for anything else.

### 6. Enquiry form delivery

`app/api/enquiry/route.ts` validates submissions and forwards them to whatever
endpoint is set in `ENQUIRY_WEBHOOK_URL` (an email service, a CRM, or a
Slack/Teams incoming webhook — anything that accepts a JSON `POST`).

```bash
cp .env.example .env.local
# ENQUIRY_WEBHOOK_URL="https://..."
```

Until that variable is set the endpoint returns `501` and the form tells the
visitor plainly that delivery is not connected yet, pointing them at phone,
email and WhatsApp instead. It never silently swallows an enquiry.

---

## How the site is put together

```
app/
  layout.tsx            fonts, metadata, LocalBusiness schema, global chrome
  page.tsx              home
  about|services|contact/page.tsx
  api/enquiry/route.ts  enquiry endpoint
  sitemap.ts robots.ts opengraph-image.tsx twitter-image.tsx icon.svg
  not-found.tsx loading.tsx globals.css
components/
  layout/   Navbar, Footer, SmoothScroll, RevealEngine, PageTransition,
            ScrollProgress, BackToTop, CustomCursor, Intro
  sections/ Hero, Statement, ServicesOverview, WhyBSM, Industries, Process,
            GoaPresence, Credentials, CallToAction, ContactForm
  ui/       Button, MediaFrame, Section, PageHero, Placeholder, Logo, GoaMap
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

**Reduced motion:** `prefers-reduced-motion: reduce` disables Lenis, the custom
cursor, the intro, the page curtain and every scroll effect. The pre-animation
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
The custom cursor is additive only — it never replaces focus or hover states and
is disabled on touch and coarse pointers.
