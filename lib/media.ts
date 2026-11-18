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
  publicSectorSecurity: {
    src: "/media/public-sector-security.jpg",
    alt: "Two uniformed security officers on post at the gated entrance of a government building, with the national flag flying above the dome behind them",
    label: "Public sector and government premises",
    brief: "Supplied by BSM for the public sector, government and defence service category.",
  },
  industrialCorporateSecurity: {
    src: "/media/industrial-corporate-security.jpg",
    alt: "Security officer with a radio on post outside an industrial complex, with plant structures behind",
    label: "Industrial and corporate premises",
    brief: "Supplied by BSM for the industrial and corporate service category.",
  },
  securityGuardServices: {
    src: "/media/security-guard-services.jpg",
    alt: "Uniformed security officer at a corporate office entrance while a visitor passes through the access gate",
    label: "Guarding and visitor management",
    brief: "Supplied by BSM for the security guard services category.",
  },
  bouncerPersonalSecurity: {
    src: "/media/bouncer-personal-security.jpg",
    alt: "Suited personal security officers managing a roped guest arrival at a venue entrance",
    label: "Bouncer and personal security",
    brief: "Supplied by BSM for the bouncer and personal security category.",
  },
  accessControlSurveillance: {
    src: "/media/access-control-surveillance.jpg",
    alt: "Security officer on radio beside a monitoring station showing camera feeds, with a dome camera above the entrance",
    label: "Access control and surveillance",
    brief: "Supplied by BSM for the access control and surveillance category.",
  },
  bankingCommercialSecurity: {
    src: "/media/banking-commercial-security.jpg",
    alt: "Security officers at a bank entrance, one screening a visitor at the walk-through detector",
    label: "Banking and commercial premises",
    brief: "Supplied by BSM for the banking and commercial category.",
  },
  residentialInstitutionalSecurity: {
    src: "/media/residential-institutional-security.jpg",
    alt: "Security officers at the lit entrance of a residential community, with a vehicle at the boom barrier",
    label: "Residential and institutional premises",
    brief: "Supplied by BSM for the residential and institutional category.",
  },
  weddingEventSecurity: {
    src: "/media/wedding-event-security.jpg",
    alt: "Event security team on a red-carpet entrance at a decorated wedding venue, with guests screened at the detector",
    label: "Wedding and event security",
    brief: "Supplied by BSM for the wedding, event and specialised category.",
  },
  securitySupervisionManagement: {
    src: "/media/security-supervision-management.jpg",
    alt: "Supervisor overseeing operators at a control room wall of camera feeds",
    label: "Supervision and management",
    brief: "Supplied by BSM for the supervision and management category.",
  },
  securityTrainingDevelopment: {
    src: "/media/security-training-development.jpg",
    alt: "Instructor addressing ranks of security personnel standing to attention on a training ground",
    label: "Training and personnel development",
    brief: "Supplied by BSM for the training and personnel development category.",
  },
  leaderPrincipalPartner: {
    src: "",
    alt: "",
    label: "Mr. Dattatray B. Naik",
    brief: "Awaiting BSM's photograph. Drop the file into /public/media and set `src`.",
  },
  leaderTrainingPartner: {
    src: "",
    alt: "",
    label: "Lt. Col. Bhupinder Singh Malhi (Retd.)",
    brief: "Awaiting BSM's photograph. Drop the file into /public/media and set `src`.",
  },
  leaderAdminPartner: {
    src: "",
    alt: "",
    label: "Mrs. Bhagyashree Dattatray Naik",
    brief: "Awaiting BSM's photograph. Drop the file into /public/media and set `src`.",
  },
  headOffice: {
    src: "",
    alt: "",
    label: "Head Office — Aquem, Margao",
    brief:
      "Awaiting BSM's photograph of the Head Office. Drop the file into /public/media and set `src`.",
  },
  branchOfficeGoa: {
    src: "",
    alt: "",
    label: "Branch Office — Chimbel, Goa",
    brief:
      "Awaiting BSM's photograph of the Goa branch office. Drop the file into /public/media and set `src`.",
  },
  night: {
    src: "/media/night-torch.jpg",
    alt: "Torch beam thrown across the ground in near darkness",
    label: "After dark",
    brief: "Imagery follows once the specialised service list is verified.",
  },
} satisfies Record<string, Shot>;

export type MediaKey = keyof typeof media;

/**
 * The BSM logo. The only image on the site that is genuinely BSM's own —
 * used at its native square proportions and never stretched or recoloured.
 */
export const logo = {
  src: "/bsm-logo.jpg",
  alt: "BSM Security logo",
  width: 1254,
  height: 1254,
} as const;

/**
 * Gallery.
 *
 * Reuses the shots declared above so there is still one source of truth per
 * image. Entries without a `shot` render the composed placeholder frame and
 * state what photograph belongs there — that is where BSM's own photography
 * goes. To populate: add the file to /public/media, declare it in `media`
 * above, and point the entry at it.
 */
export type GalleryItem = {
  /** An existing shot, or omitted to render the placeholder frame. */
  shot?: Shot;
  /** Group the frame is filed under on the gallery page. */
  group: string;
  figure: string;
  /** Used when there is no shot yet. */
  label?: string;
  brief?: string;
  /** Frames marked wide span two columns on large screens. */
  wide?: boolean;
};

export const gallery: GalleryItem[] = [
  { shot: media.heroDeployment, group: "Personnel", figure: "Fig. 01" },
  { shot: media.guarding, group: "Personnel", figure: "Fig. 02" },
  { shot: media.briefing, group: "Operations", figure: "Fig. 03", wide: true },
  { shot: media.patrol, group: "Operations", figure: "Fig. 04" },
  { shot: media.records, group: "Operations", figure: "Fig. 05" },
  { shot: media.corporate, group: "Sites", figure: "Fig. 06" },
  { shot: media.residential, group: "Sites", figure: "Fig. 07" },
  { shot: media.hospitality, group: "Sites", figure: "Fig. 08" },
  { shot: media.industrial, group: "Sites", figure: "Fig. 09" },
  { shot: media.event, group: "Sites", figure: "Fig. 10" },
  { shot: media.coast, group: "Goa", figure: "Fig. 11", wide: true },
  { shot: media.goaLandscape, group: "Goa", figure: "Fig. 12" },
  { shot: media.estate, group: "Sites", figure: "Fig. 13" },
  { shot: media.night, group: "Operations", figure: "Fig. 14" },
];

/** The groups, in display order. Used for the gallery filter rail. */
export const galleryGroups = ["Personnel", "Operations", "Sites", "Goa"] as const;
