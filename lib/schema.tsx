import { site, services, faqs } from "./site";

/**
 * Structured data for a local business. Placeholder values are left bracketed
 * on purpose — publishing invented contact details or credentials into schema
 * would be worse than publishing none, since search engines surface them
 * directly. Replace the bracketed fields before going live.
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SecurityService"],
  "@id": `${site.url}/#organization`,
  name: "BSM",
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    addressLocality: site.contact.address.locality,
    addressRegion: "Goa",
    postalCode: site.contact.address.postalCode,
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "State", name: "Goa" },
    { "@type": "Country", name: "India" },
  ],
  knowsLanguage: ["en-IN", "hi-IN", "kok"],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: s.title,
      description: s.points[0] ?? s.title,
      serviceType: s.title,
      areaServed: { "@type": "State", name: "Goa" },
    },
  })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    description: "[OPENING HOURS]",
  },
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: "BSM Security",
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en-IN",
} as const;

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
} as const;

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Small helper so pages can drop a schema block without repeating boilerplate. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
