/**
 * Demo photography.
 *
 * These are stand-in images from Unsplash (Unsplash License — free for
 * commercial use) so the site can be shown complete. They are NOT photographs
 * of BSM, its personnel or its sites. Replace each `src` with BSM's own
 * photography before launch and update the `alt` text to describe the real
 * image; `brief` records what the shot is meant to show.
 *
 * Dropping the `src` from any entry makes that frame fall back to the composed
 * placeholder state, which states on the page what photograph belongs there.
 */

export type Shot = {
  src: string;
  /** Describes what is actually visible, for screen readers. */
  alt: string;
  /** Caption shown under the frame. */
  label: string;
  /** What BSM's replacement photograph should show. */
  brief: string;
};

export const media = {
  heroDeployment: {
    src: "/media/hero-security-officer.jpg",
    alt: "Security officer in a dark suit wearing a security identification lanyard, lit from one side",
    label: "Personnel on post",
    brief: "Replace with BSM's own photography — a guard at a gate or lobby, shot in low light.",
  },
  briefing: {
    src: "/media/briefing-team.jpg",
    alt: "Group of people silhouetted against the windows of an empty building interior",
    label: "Shift briefing before deployment",
    brief: "Supervisor briefing a team at handover.",
  },
  patrol: {
    src: "/media/patrol-light-shadow.jpg",
    alt: "Uniformed officer walking through bands of light and shadow cast across a floor",
    label: "Patrol round in progress",
    brief: "Supervisor or guard walking a perimeter on a real site.",
  },
  records: {
    src: "/media/records-occurrence-book.jpg",
    alt: "Open notebook with handwritten entries, a pen and reading glasses on a dark desk",
    label: "Occurrence book and gate register",
    brief: "Close-up of the documentation kept on post.",
  },
  coast: {
    src: "/media/goa-beach-huts.jpg",
    alt: "Thatched beach huts and sun loungers along a palm-lined shore",
    label: "Coastal property, Goa",
    brief: "A resort or beachfront perimeter BSM covers, ideally after dark.",
  },
  estate: {
    src: "/media/industrial-hall-night.jpg",
    alt: "Long industrial hall lit at the far end, empty and dark in the foreground",
    label: "Industrial estate, night shift",
    brief: "Gate register and material movement control at an estate.",
  },
  goaLandscape: {
    src: "/media/coast-goa-evening.jpg",
    alt: "Palm trees above a rocky shoreline with the sea beyond",
    label: "Goa coastline",
    brief: "A recognisable Goa location relevant to BSM's coverage.",
  },
  guarding: {
    src: "/media/corporate-lobby-guard.jpg",
    alt: "Security officer standing in the dark lobby of a commercial building near the entrance doors",
    label: "Guard on static post",
    brief: "Uniformed personnel at a gate or lobby.",
  },
  corporate: {
    src: "/media/reception-desk-corporate.jpg",
    alt: "Dark marble reception counter in a corporate lobby",
    label: "Reception and access control",
    brief: "Front-desk security at a corporate entrance.",
  },
  residential: {
    src: "/media/residential-gate.jpg",
    alt: "Entrance gate and driveway of a walled residential property",
    label: "Gated community entrance",
    brief: "Gate management at a residential society.",
  },
  event: {
    src: "/media/event-crowd-barrier.jpg",
    alt: "Crowd pressed against a barrier at a night-time event",
    label: "Event entry lane",
    brief: "Accreditation and crowd flow at an event gate.",
  },
  industrial: {
    src: "/media/industrial-interior.jpg",
    alt: "Interior of a large industrial building with structural columns receding into darkness",
    label: "Material gate check",
    brief: "Inward and outward movement being documented.",
  },
  hospitality: {
    src: "/media/hotel-reception-dark.jpg",
    alt: "Low-lit hotel reception desk in dark stone with warm pendant lighting",
    label: "Hotel lobby presence",
    brief: "Guest-facing security in a hospitality setting.",
  },
  night: {
    src: "/media/night-torch.jpg",
    alt: "Torch beam thrown across the ground in near darkness",
    label: "After dark",
    brief: "Imagery follows once the specialised service list is verified.",
  },
} satisfies Record<string, Shot>;

export type MediaKey = keyof typeof media;
