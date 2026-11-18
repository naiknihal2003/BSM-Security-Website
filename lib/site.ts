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
  legalName: "BSM SECURITY AGENCY",
  tagline: "Protecting industries. Securing Businesses. Building Trust.",
  description:
    "BSM is a professional security agency based in Goa, India, providing trained security personnel and managed protection services for corporate, residential, industrial, hospitality and event environments.",
  url: "https://www.bsmsecurity.in",
  locale: "en_IN",
  region: "Goa, India",

  contact: {
    /* All three lines, in the order BSM gave them. The first is primary. */
    phones: [
      { display: "+91 94212 49677", href: "tel:+919421249677" },
      { display: "+91 87889 65649", href: "tel:+918788965649" },
      { display: "+91 87623 26038", href: "tel:+918762326038" },
    ],
    phone: "+91 94212 49677",
    phoneHref: "tel:+919421249677",
    email: "contact@bsmsecurityagency.com",
    emailHref: "mailto:contact@bsmsecurityagency.com",
    /* WhatsApp lines, same formatting as the phone list. */
    whatsapps: [{ display: "+91 94212 49677", href: "https://wa.me/919421249677" }],
    whatsapp: "+91 94212 49677",
    whatsappHref: "https://wa.me/919421249677",
    address: {
      street: "Kurtarkar Classic A2, Shop no. G-7, Opposite Lawande Hospital, Aquem",
      locality: "Margao",
      region: "Goa",
      postalCode: "403601",
      country: "India",
    },
    hours: [{ days: "Monday – Saturday", time: "9:00 AM – 5:30 PM" }],
    /* Service availability is separate from when the office is open. */
    servicesAvailable: "24 × 7",
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Kurtarkar+Classic+A2,+Shop+no.+G-7,+Opposite+Lawande+Hospital,+Aquem,+Margao,+Goa+403601",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Clients", href: "/clients" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Branch", href: "/branch" },
    { label: "Contact", href: "/contact" },
  ],

  /** Where enquiries are delivered. Mirrors ENQUIRY_TO_EMAIL on the server. */
  enquiryInbox: "contact@bsmsecurityagency.com",
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
  { name: "Coastal properties", note: "[COVERAGE DETAILS]" },
  { name: "Urban and commercial", note: "[COVERAGE DETAILS]" },
  { name: "Industrial estates", note: "[COVERAGE DETAILS]" },
  { name: "Residential societies", note: "[COVERAGE DETAILS]" },
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

/* --------------------------------------------------------------------------
   Clients
   Structure only. No client name, logo, sector claim or testimonial has been
   invented: every entry below is a bracketed placeholder that renders in the
   unverified treatment until BSM supplies the real information. To populate,
   replace the bracketed strings (and drop a logo file into /public/media,
   pointing `logo` at it).
   -------------------------------------------------------------------------- */

export type ClientEntry = {
  /** Client name, or a bracketed placeholder until BSM confirms it. */
  name: string;
  /** Environment the deployment covers. */
  sector: string;
  /** Optional one line about the deployment. */
  note?: string;
  /** Path to a logo in /public/media. Omitted until BSM supplies artwork. */
  logo?: string;
};

export const clients: ClientEntry[] = [
  { name: "[CLIENT NAME]", sector: "Corporate", note: "[DEPLOYMENT SUMMARY]" },
  { name: "[CLIENT NAME]", sector: "Hospitality", note: "[DEPLOYMENT SUMMARY]" },
  { name: "[CLIENT NAME]", sector: "Residential", note: "[DEPLOYMENT SUMMARY]" },
  { name: "[CLIENT NAME]", sector: "Industrial", note: "[DEPLOYMENT SUMMARY]" },
  { name: "[CLIENT NAME]", sector: "Events", note: "[DEPLOYMENT SUMMARY]" },
  { name: "[CLIENT NAME]", sector: "Retail & commercial", note: "[DEPLOYMENT SUMMARY]" },
];

export type Testimonial = {
  quote: string;
  attribution: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  { quote: "[CLIENT TESTIMONIAL]", attribution: "[NAME]", role: "[ROLE, ORGANISATION]" },
  { quote: "[CLIENT TESTIMONIAL]", attribution: "[NAME]", role: "[ROLE, ORGANISATION]" },
  { quote: "[CLIENT TESTIMONIAL]", attribution: "[NAME]", role: "[ROLE, ORGANISATION]" },
];

/** Figures BSM will confirm; shown as fields, never as claims. */
export const clientFacts = [
  { k: "Active deployments", v: "[NUMBER]" },
  { k: "Sites covered", v: "[NUMBER]" },
  { k: "Years in operation", v: "[NUMBER]" },
  { k: "Personnel on roll", v: "[NUMBER]" },
];

/* --------------------------------------------------------------------------
   Offices
   Supplied by BSM. Addresses, numbers, emails, names and designations are
   reproduced exactly as given — nothing here is inferred or invented.
   Exactly two locations are mapped: Head Office address A and the Goa branch.
   Head Office address B is shown as text and is deliberately NOT mapped.
   -------------------------------------------------------------------------- */

export type OfficePerson = {
  name: string;
  role: string;
  /** Marks the one non-partner advisory role at the Head Office. */
  advisory?: boolean;
  phone?: { display: string; href: string };
  email?: { display: string; href: string };
  responsibilities?: string;
};

export type Office = {
  id: string;
  index: string;
  kind: string;
  name: string;
  /** The mapped address. */
  address: string;
  /** Shown as text only — never a second map pin for this office. */
  additionalAddress?: string;
  /** Google Maps embed for the mapped address. */
  mapEmbed: string;
  /** Opens the location in Google Maps. */
  mapLink: string;
  mapTitle: string;
  phones: { display: string; href: string }[];
  whatsapps: { display: string; href: string }[];
  email: { display: string; href: string };
  leadershipLabel: string;
  leadership: OfficePerson[];
};

export const offices: Office[] = [
  {
    id: "head-office",
    index: "01",
    kind: "Head Office",
    name: "Head Office — Margao",
    address:
      "Kurtarkar Classic A2, Shop no. G-7, Opposite Lawande Hospital, Aquem, Margao, Goa – 403601.",
    additionalAddress:
      "42/D/7, God's Gift Residency, Plot no. 15, Dicarpale Davorlim, Navelim, Salcete, Goa.",
    mapEmbed:
      "https://www.google.com/maps?q=Kurtarkar+Classic+A2,+Shop+no.+G-7,+Opposite+Lawande+Hospital,+Aquem,+Margao,+Goa+403601&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Kurtarkar+Classic+A2,+Shop+no.+G-7,+Opposite+Lawande+Hospital,+Aquem,+Margao,+Goa+403601",
    mapTitle: "Map showing the BSM Head Office at Aquem, Margao, Goa",
    phones: [
      { display: "+91 94212 49677", href: "tel:+919421249677" },
      { display: "+91 87889 65649", href: "tel:+918788965649" },
    ],
    whatsapps: [
      { display: "+91 94212 49677", href: "https://wa.me/919421249677" },
      { display: "+91 87889 65649", href: "https://wa.me/918788965649" },
    ],
    email: {
      display: "headoffice@bsmsecurityagency.com",
      href: "mailto:headoffice@bsmsecurityagency.com",
    },
    leadershipLabel: "Leadership and management",
    leadership: [
      {
        name: "Mr. Dattatray B Naik",
        role: "Principal Partner",
        phone: { display: "+91 94212 49677", href: "tel:+919421249677" },
      },
      { name: "Lt. Col. Bhupinder S Malhi (retd.)", role: "Partner" },
      { name: "Mrs. Bhagyashree Dattatray Naik", role: "Partner" },
      {
        name: "Adv Nihal D Naik",
        role: "Legal Advisor",
        advisory: true,
      },
    ],
  },
  {
    id: "branch-office-goa",
    index: "02",
    kind: "Branch Office – Goa",
    name: "Branch Office — Chimbel, Goa",
    address:
      "House 3, Kadamba Govt Housing Society, National Hwy 4A Bypass Rd, Chimbel, Goa – 403006.",
    mapEmbed:
      "https://www.google.com/maps?q=House+3,+Kadamba+Govt+Housing+Society,+National+Hwy+4A+Bypass+Rd,+Chimbel,+Goa+403006&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=House+3,+Kadamba+Govt+Housing+Society,+National+Hwy+4A+Bypass+Rd,+Chimbel,+Goa+403006",
    mapTitle: "Map showing the BSM Branch Office at Kadamba Govt Housing Society, Chimbel, Goa",
    phones: [{ display: "+91 87623 26038", href: "tel:+918762326038" }],
    whatsapps: [{ display: "+91 87623 26038", href: "https://wa.me/918762326038" }],
    email: { display: "bsmgoa.dgr@gmail.com", href: "mailto:bsmgoa.dgr@gmail.com" },
    leadershipLabel: "Branch leadership",
    leadership: [
      {
        name: "Mr. Vighnesh Shet (M.D)",
        role: "Branch In-Charge – Panjim Operations",
        responsibilities:
          "Responsible for branch administration, security operations, manpower coordination, client relations and operational supervision.",
      },
      {
        name: "Mrs. Pranali V Shet",
        role: "She heads Administration & Billing department - Panjim",
        phone: { display: "+91 91086 63502", href: "tel:+919108663502" },
      },
    ],
  },
];

/* --------------------------------------------------------------------------
   Core strengths, vision and mission — supplied by BSM, reproduced verbatim.
   -------------------------------------------------------------------------- */

export const coreStrengths = [
  {
    index: "01",
    title: "Experienced Leadership",
    body: "Over three decades of security industry experience at the leadership level.",
  },
  {
    index: "02",
    title: "Established Agency",
    body: "Established in 2013 as a DGR-sponsored security agency.",
  },
  {
    index: "03",
    title: "PSU Operational Experience",
    body: "Operational experience in providing security services to major Public Sector Undertakings.",
  },
  {
    index: "04",
    title: "Professional Management",
    body: "Strong leadership, structured supervision and professional operational management.",
  },
  {
    index: "05",
    title: "Military-Guided Training",
    body: "Emphasis on military-guided training, discipline, alertness and professional conduct.",
  },
  {
    index: "06",
    title: "Trained Security Personnel",
    body: "Experienced security supervisors and trained personnel committed to maintaining high standards of security.",
  },
  {
    index: "07",
    title: "Compliance & Client Commitment",
    body: "Commitment to statutory compliance, service quality and client satisfaction.",
  },
];

export const vision =
  "To establish BSM Security Agency as a trusted and respected name in the security industry through professional management, disciplined personnel and reliable security solutions.";

export const mission =
  "To safeguard people, property, infrastructure and business operations by delivering dependable, professionally managed and well-supervised security services, driven by discipline, integrity and commitment.";
