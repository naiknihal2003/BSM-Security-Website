import type { Metadata } from "next";
import { Check, Plus } from "lucide-react";
import { services, faqs, site } from "@/lib/site";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { media } from "@/lib/media";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Copy } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import CallToAction from "@/components/sections/CallToAction";
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

const serviceShots = {
  "security-guards": media.guarding,
  "corporate-security": media.corporate,
  "residential-security": media.residential,
  "event-security": media.event,
  "industrial-security": media.industrial,
  "hospitality-security": media.hospitality,
  "specialised-services": media.night,
} as const;

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd data={faqSchema} />

      <PageHero
        eyebrow="Services"
        index="02"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        title={
          <>
            Deployments planned for the site,{" "}
            <span className="accent-serif text-brass">not</span> the invoice.
          </>
        }
        lead="Seven areas of deployment across Goa. Scope specifics marked in brackets are confirmed directly with BSM rather than assumed here."
      >
        {/* Contents */}
        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {services.map((service) => (
            <li key={service.slug} data-stagger-item>
              <a
                href={`#${service.slug}`}
                className="group flex h-full items-baseline gap-3 bg-void p-5 transition-colors duration-500 hover:bg-raise"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-dim">
                  {service.index}
                </span>
                <span className="font-display text-sm font-semibold text-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
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
            className={i % 2 === 1 ? "bg-ink" : ""}
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

                <h2 data-split className="mt-8 text-display font-semibold text-bone">
                  {service.title}
                </h2>

                <p data-reveal="up" className="mt-8 max-w-xl text-lead text-mist">
                  {service.body}
                </p>

                <ul className="mt-10 space-y-px border-t border-line" data-stagger>
                  {service.points.map((point) => (
                    <li
                      key={point}
                      data-stagger-item
                      className="flex items-start gap-4 border-b border-line py-4"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                      <span className="text-sm leading-relaxed text-mist">
                        <Copy text={point} />
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2" data-reveal="up">
                  {service.environments.map((env) => (
                    <span
                      key={env}
                      className="border border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim"
                    >
                      <Copy text={env} />
                    </span>
                  ))}
                </div>

                <div className="mt-10" data-reveal="up">
                  <Button href="/contact" variant="outline">
                    Enquire about {service.title}
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

      {/* Scope note */}
      <Section label="Scope and pricing">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="08">Scope &amp; pricing</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              Quoted from a survey, never from a phone call.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p data-reveal="up" className="text-lead text-mist">
              Manpower numbers, shift patterns, supervision frequency and commercial terms depend
              on the site. BSM confirms these after a survey, in writing.
            </p>
            <dl className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2" data-stagger>
              {[
                { k: "Shift patterns", v: "[SHIFT OPTIONS]" },
                { k: "Minimum deployment", v: "[MINIMUM TERMS]" },
                { k: "Supervision frequency", v: "[SUPERVISION SCHEDULE]" },
                { k: "Commercial terms", v: "[RATES AND BILLING TERMS]" },
              ].map((row) => (
                <div key={row.k} data-stagger-item className="bg-void p-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                    {row.k}
                  </dt>
                  <dd className="mt-3 text-sm">
                    <Copy text={row.v} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section label="Frequently asked questions" className="bg-ink">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="09">Questions</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              Before you enquire.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-line" data-stagger>
              {faqs.map((faq) => (
                <details key={faq.q} data-stagger-item className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-lg font-semibold text-bone transition-colors duration-300 hover:text-brass [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <Plus
                      className="mt-1 h-4 w-4 shrink-0 text-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45"
                      strokeWidth={1.5}
                    />
                  </summary>
                  <p className="max-w-2xl pb-7 leading-relaxed text-mist">
                    <Copy text={faq.a} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CallToAction
        eyebrow="Request security"
        title="Tell us the site. We will tell you the plan."
        body="Send the location, the hours you need covered and what you are protecting. A survey comes before a number."
      />
      <RevealEngine />
    </>
  );
}
