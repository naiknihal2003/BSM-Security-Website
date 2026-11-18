import type { Metadata } from "next";
import { Check } from "lucide-react";
import { services, site, type ServiceSlug } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { media, type Shot } from "@/lib/media";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Copy } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import RevealEngine from "@/components/layout/RevealEngine";

export const metadata: Metadata = {
  title: "Security Services in Goa — Guards, Corporate, Event & Industrial",
  description:
    "Security services from BSM in Goa, India: security guarding, corporate security, residential security, event security, industrial security and hotel and hospitality security.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Security Services in Goa | BSM",
    description:
      "Security guarding, corporate, residential, event, industrial and hospitality security across Goa, India.",
    url: `${site.url}/services`,
  },
};

/**
 * One frame per category. These are the site's licensed stand-in photographs
 * (see lib/media.ts) chosen for the closest subject match — none of them
 * depicts BSM, its people or its sites, and the footer says so. Replace a
 * `src` in lib/media.ts to drop BSM's own photography in behind these frames.
 */
const serviceShots: Record<ServiceSlug, Shot> = {
  "public-sector-government-defence-security": media.publicSectorSecurity,
  "industrial-corporate-security": media.industrial,
  "security-guard-services": media.heroDeployment,
  "bouncer-personal-security-services": media.event,
  "access-control-surveillance": media.records,
  "banking-commercial-security": media.corporate,
  "residential-institutional-security": media.residential,
  "wedding-event-specialised-security": media.hospitality,
  "security-supervision-management": media.briefing,
  "security-training-personnel-development": media.patrol,
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHero
        eyebrow="Services"
        index="03"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        title={
          <>
            Deployments planned for the{" "}
            <span className="accent-serif text-brass">site</span>.
          </>
        }
        lead="Our services are designed to address a wide range of security requirements across different sectors and establishments."
      >
        {/* Contents */}
        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2" data-stagger>
          {services.map((service) => (
            <li key={service.slug} data-stagger-item>
              <a
                href={`#${service.slug}`}
                className="group flex h-full items-baseline gap-3 bg-void p-6 transition-colors duration-500 hover:bg-raise"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-brass">
                  {service.index}
                </span>
                <span className="font-display text-sm font-semibold uppercase leading-snug tracking-[0.01em] text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  {service.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Service detail blocks */}
      {services.map((service, i) => {
        const shot = serviceShots[service.slug];
        const flipped = i % 2 === 1;
        return (
          <Section
            key={service.slug}
            id={service.slug}
            label={service.title}
            className={`scroll-mt-28 md:scroll-mt-32 ${i % 2 === 1 ? "bg-ink" : ""}`}
          >
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className={`lg:col-span-6 ${flipped ? "lg:order-2 lg:col-start-7" : ""}`}>
                <div className="flex items-center gap-4" data-reveal="up">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
                    {service.index}
                  </span>
                  <span className="h-px w-8 bg-brass" />
                  <span className="eyebrow">Service</span>
                </div>

                <h2
                  data-split
                  className="mt-8 text-title font-semibold uppercase tracking-[-0.01em] text-bone"
                >
                  {service.title}
                </h2>
                <span
                  className="mt-6 block h-0.5 w-28 bg-brass"
                  data-reveal="up"
                  aria-hidden="true"
                />

                <ul className="mt-10 space-y-px border-t border-line" data-stagger>
                  {service.points.map((point) => (
                    <li
                      key={point}
                      data-stagger-item
                      className="flex items-start gap-4 border-b border-line py-4"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                      <span className="text-sm leading-relaxed text-white">
                        <Copy text={point} />
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10" data-reveal="up">
                  <Button href="/contact" variant="outline">
                    Enquire about this service
                  </Button>
                </div>
              </div>

              <div className={`lg:col-span-5 ${flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                <MediaFrame
                  shot={shot}
                  figure={`Fig. ${service.index} / ${service.title}`}
                  ratio="4 / 5"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
              </div>
            </div>
          </Section>
        );
      })}

      <RevealEngine />
    </>
  );
}
