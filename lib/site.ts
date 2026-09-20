/**
 * Single source of truth for BSM's site content.
 *
 * Anything wrapped in square brackets is an UNVERIFIED placeholder. It renders
 * on the page with a distinct treatment (see <Placeholder />) so it is obvious
 * what still needs real information from BSM. Nothing here invents awards,
 * certifications, client names, headcount, years of operation or statistics.
 */

export const site = {
  name: "BSM",
  legalName: "[BSM LEGAL ENTITY NAME]",
  tagline: "Security You Can Trust. Protection You Can Count On.",
  description:
    "BSM is a professional security agency based in Goa, India, providing trained security personnel and managed protection services for corporate, residential, industrial, hospitality and event environments.",
  url: "https://www.bsmsecurity.in",
  locale: "en_IN",
  region: "Goa, India",

  contact: {
    phone: "[PHONE NUMBER]",
    phoneHref: "tel:[PHONE NUMBER]",
    emergencyPhone: "[24/7 CONTROL ROOM NUMBER]",
    email: "[EMAIL]",
    emailHref: "mailto:[EMAIL]",
    whatsapp: "[WHATSAPP NUMBER]",
    whatsappHref: "https://wa.me/[WHATSAPP NUMBER]",
    address: {
      street: "[OFFICE ADDRESS]",
      locality: "[CITY / TALUKA]",
      region: "Goa",
      postalCode: "[PIN CODE]",
      country: "India",
    },
    hours: [
      { days: "Monday – Saturday", time: "[OPENING HOURS]" },
      { days: "Sunday", time: "[OPENING HOURS]" },
      { days: "Control room", time: "[CONTROL ROOM AVAILABILITY]" },
    ],
    // Replace with the embed URL from Google Maps -> Share -> Embed a map.
    mapsEmbed: "https://www.google.com/maps?q=Goa,+India&output=embed",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Goa%2C+India",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type ServiceSlug =
  | "security-guards"
  | "corporate-security"
  | "residential-security"
  | "event-security"
  | "industrial-security"
  | "hospitality-security"
  | "specialised-services";

export type Service = {
  slug: ServiceSlug;
  index: string;
  title: string;
  short: string;
  body: string;
  points: string[];
  environments: string[];
};

export const services: Service[] = [
  {
    slug: "security-guards",
    index: "01",
    title: "Security Guarding",
    short: "Trained, uniformed guarding for static posts and access points.",
    body: "Deployed personnel who hold the perimeter, control who enters and leaves, and keep an accurate record of everything that happens on shift. Presence is the point: a visible, disciplined post changes behaviour before an incident ever starts.",
    points: [
      "Static guarding at gates, lobbies and access points",
      "Access control, visitor screening and gate register",
      "Patrol rounds with documented checkpoints",
      "Shift handover and daily occurrence reporting",
      "[GUARD TRAINING AND VERIFICATION PROCESS]",
    ],
    environments: ["Offices", "Gated communities", "Warehouses", "Institutions"],
  },
  {
    slug: "corporate-security",
    index: "02",
    title: "Corporate Security",
    short: "Front-of-house security that protects people, assets and reputation.",
    body: "Security that reads as hospitality at the door and as discipline behind it. Corporate deployments are built around your working day — reception flow, contractor movement, after-hours access and the escalation path when something is wrong.",
    points: [
      "Reception and front-desk security presence",
      "Employee, contractor and visitor access protocols",
      "Asset and material movement control",
      "Incident escalation and management reporting",
      "[CORPORATE SECURITY SCOPE DETAILS]",
    ],
    environments: ["Corporate offices", "IT parks", "Co-working", "Banks"],
  },
  {
    slug: "residential-security",
    index: "03",
    title: "Residential Security",
    short: "Guarding for villas, apartments and gated communities across Goa.",
    body: "Residential security lives or dies on consistency. The same faces, the same rounds, the same discipline at 3am as at 3pm — so residents, staff and deliveries move freely while everything unfamiliar is checked.",
    points: [
      "Gate management and resident vehicle protocols",
      "Visitor, delivery and domestic-staff verification",
      "Night patrol rounds across common areas",
      "Coordination with society management and committees",
      "[RESIDENTIAL SECURITY SCOPE DETAILS]",
    ],
    environments: ["Villas", "Apartments", "Gated societies", "Second homes"],
  },
  {
    slug: "event-security",
    index: "04",
    title: "Event Security",
    short: "Crowd, access and perimeter management for events of every size.",
    body: "Goa runs on events — weddings, festivals, conferences, beach and venue programming. Event security is planned backwards from the crowd: entry lanes, accreditation, stage and backstage lines, and a clear plan for the moment things do not go to plan.",
    points: [
      "Pre-event site survey and deployment planning",
      "Accreditation, ticket and wristband checks at entry",
      "Crowd flow, queue and barrier management",
      "Stage, backstage and VIP area control",
      "[EVENT SECURITY SCOPE DETAILS]",
    ],
    environments: ["Weddings", "Festivals", "Conferences", "Private venues"],
  },
  {
    slug: "industrial-security",
    index: "05",
    title: "Industrial Security",
    short: "Perimeter, material gate and shift discipline for industrial sites.",
    body: "Industrial estates demand procedure. Gate registers that reconcile, material movement that is documented, contractor labour that is verified, and patrols that cover the parts of a site nobody else walks at night.",
    points: [
      "Perimeter patrolling and boundary integrity checks",
      "Material inward and outward gate control",
      "Contractor and labour verification at entry",
      "Shift-based deployment across 24-hour operations",
      "[INDUSTRIAL SECURITY SCOPE DETAILS]",
    ],
    environments: ["Factories", "Warehouses", "Industrial estates", "Plants"],
  },
  {
    slug: "hospitality-security",
    index: "06",
    title: "Hotel & Hospitality Security",
    short: "Guest-facing security calibrated to hospitality standards.",
    body: "In hospitality the security team is part of the guest experience. Presentation, language and judgement matter as much as vigilance — protecting guests, staff and property without ever making the property feel guarded.",
    points: [
      "Lobby, entrance and driveway presence",
      "Guest, staff and vendor access management",
      "Banquet, pool and beachfront area coverage",
      "Discreet handling of guest incidents and escalations",
      "[HOSPITALITY SECURITY SCOPE DETAILS]",
    ],
    environments: ["Hotels", "Resorts", "Restaurants", "Beach clubs"],
  },
  {
    slug: "specialised-services",
    index: "07",
    title: "Specialised Services",
    short: "Additional capabilities to be confirmed directly with BSM.",
    body: "BSM may offer further capabilities beyond standing deployments. These are listed as placeholders until confirmed, so that nothing is promised on this site that has not been verified by the company.",
    points: [
      "[PERSONAL SECURITY / BODYGUARD SERVICES — TO BE CONFIRMED]",
      "[SURVEILLANCE AND CCTV MONITORING — TO BE CONFIRMED]",
      "[SECURITY CONSULTING AND RISK SURVEYS — TO BE CONFIRMED]",
      "[FACILITY AND SUPPORT MANPOWER — TO BE CONFIRMED]",
      "[ADDITIONAL SERVICE DETAILS]",
    ],
    environments: ["[SECTOR]", "[SECTOR]", "[SECTOR]", "[SECTOR]"],
  },
];

export const industries = [
  { name: "Hospitality & Resorts", note: "Hotels, resorts, beach clubs and restaurants." },
  { name: "Corporate & IT", note: "Offices, IT parks and shared workspaces." },
  { name: "Residential Communities", note: "Villas, apartments and gated societies." },
  { name: "Industrial & Logistics", note: "Factories, warehouses and estates." },
  { name: "Retail & Commercial", note: "Showrooms, malls and commercial complexes." },
  { name: "Events & Entertainment", note: "Weddings, festivals and private events." },
  { name: "Healthcare & Education", note: "Hospitals, clinics, schools and campuses." },
  { name: "Construction & Projects", note: "Project sites and material yards." },
];

export const processSteps = [
  {
    index: "01",
    title: "Consultation",
    body: "We start with a conversation about the site, the risk you are actually worried about, and what the day looks like when everything runs well.",
  },
  {
    index: "02",
    title: "Site Survey",
    body: "A physical walk-through of entry points, blind spots, lighting, movement patterns and the hours that matter most.",
  },
  {
    index: "03",
    title: "Deployment Plan",
    body: "A written plan: post locations, shift pattern, patrol routes, reporting formats and the escalation chain — agreed before anyone is deployed.",
  },
  {
    index: "04",
    title: "Personnel Selection",
    body: "Personnel matched to the environment and briefed on the site specifically. [VERIFICATION AND TRAINING PROCESS]",
  },
  {
    index: "05",
    title: "Supervision",
    body: "Field supervision, surprise checks and shift discipline — because a deployment is only as good as the night nobody is watching.",
  },
  {
    index: "06",
    title: "Review & Reporting",
    body: "Regular reporting back to you, with review points to adjust the deployment as the site, season or risk profile changes.",
  },
];

export const values = [
  {
    index: "01",
    title: "Integrity",
    body: "Security is a position of trust before it is a service. We say what we will deploy, and we deploy it.",
  },
  {
    index: "02",
    title: "Discipline",
    body: "Uniform, punctuality, handover, register. The unglamorous routines are exactly what make a site secure.",
  },
  {
    index: "03",
    title: "Vigilance",
    body: "Attention that does not decay across a twelve-hour shift, and supervision built to verify that it does not.",
  },
  {
    index: "04",
    title: "Accountability",
    body: "Documented rounds, written incident reports and a named point of contact who answers for the deployment.",
  },
  {
    index: "05",
    title: "Respect",
    body: "Guests, residents, staff and visitors are treated with courtesy. Firmness and politeness are not opposites.",
  },
  {
    index: "06",
    title: "Local Knowledge",
    body: "Goa is not one place. A beachfront resort, an industrial estate in the hinterland and a city office each need different judgement.",
  },
];

export const goaPresence = [
  { name: "North Goa", note: "[COVERAGE DETAILS]" },
  { name: "South Goa", note: "[COVERAGE DETAILS]" },
  { name: "Panaji & Capital Region", note: "[COVERAGE DETAILS]" },
  { name: "Industrial Estates", note: "[COVERAGE DETAILS]" },
];

export const faqs = [
  {
    q: "Which areas of Goa does BSM cover?",
    a: "BSM operates across Goa. Specific taluka-level coverage and response times are confirmed at the time of enquiry. [COVERAGE DETAILS]",
  },
  {
    q: "How quickly can personnel be deployed?",
    a: "Deployment timelines depend on the scope, shift pattern and number of personnel required. [DEPLOYMENT TIMELINE]",
  },
  {
    q: "Is BSM licensed under PSARA?",
    a: "[PSARA LICENCE NUMBER AND ISSUING AUTHORITY — TO BE CONFIRMED BY BSM]",
  },
  {
    q: "How are personnel screened and trained?",
    a: "[VERIFICATION, BACKGROUND CHECK AND TRAINING PROCESS — TO BE CONFIRMED BY BSM]",
  },
  {
    q: "Can deployments be scaled up for a season or an event?",
    a: "Yes. Seasonal and event deployments are planned from a site survey and a written deployment plan. [SCALING TERMS]",
  },
];
