import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { MapPin } from "lucide-react";
import { clients } from "@/lib/site";
import { clientLogos } from "@/lib/media";
import { shortcuts } from "@/lib/navigation";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import SubNav from "@/components/layout/SubNav";
import CallToAction from "@/components/sections/CallToAction";
import RevealEngine from "@/components/layout/RevealEngine";

export const metadata: Metadata = pageMetadata({
  path: "/clients",
  title: "Our Esteemed Clients — PSUs, Defence, Airports & Government",
  description:
    "Organisations BSM Security Agency is engaged with across Goa, including HPCL, Goa Shipyard Limited, CSIR–NIO, Airports Authority of India, Indian Oil, BPCL, Goa International Airport, INS Hansa, ESIC and CONCOR — and what every client gets from a deployment.",
  keywords: [
    "security services for PSUs Goa",
    "airport security services Goa",
    "defence establishment security Goa",
    "government security contractor Goa",
  ],
});

export default function ClientsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients" },
        ])}
      />

      <PageHero
        id="overview"
        eyebrow="Clients"
        index="03"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Clients", href: "/clients" },
        ]}
        title={
          <>
            The sites we hold, and the people who{" "}
            <span className="accent-serif text-brass">rely</span> on it.
          </>
        }
      >
        <p
          data-reveal="up"
          className="mt-8 max-w-4xl text-lead text-mist lg:mt-[clamp(1.5rem,4.5svh,3.25rem)]"
        >
          Our client portfolio includes reputed organisations across aviation, energy, maritime,
          industrial, research, public-sector and logistics sectors.
        </p>
      </PageHero>

      <SubNav items={shortcuts.clients} label="Client page shortcuts" />

      {/* Client roster */}
      <Section id="roster" label="Our esteemed clients">
        <SectionLabel index="01">Our clients</SectionLabel>
        <h2
          data-split
          className="mt-8 text-display font-semibold uppercase tracking-[-0.01em] text-bone"
        >
          Our Esteemed <span className="text-brass">Clients</span>
        </h2>

        <p data-reveal="up" className="mt-10 max-w-4xl text-lead text-mist">
          Explore the organisations associated with BSM Security Agency, along with their
          respective locations and operational details across the public, government, defence,
          aviation and industrial sectors.
        </p>

        {/* Ten cards: five across on a desktop, three on a tablet, one on a
            phone. Each card is an anchor target for the navbar's Clients menu. */}
        <div
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          data-stagger
        >
          {clients.map((client) => {
            /* Artwork comes from the clientLogos dictionary in lib/media —
               a local file or a URL on the organisation's own site. */
            const logo = clientLogos[client.slug];
            return (
              <article
                key={client.slug}
                id={`client-${client.slug}`}
                data-anchor=""
                data-stagger-item
                data-tilt="6"
                className="card card-void group flex h-full flex-col p-3"
              >
                {/* Logos are printed on a light plate: these are the
                    organisations' own marks, in their own colours, and are
                    drawn for white. An empty frame keeps the dark surface. */}
                <div
                  className={`relative flex w-full items-center justify-center overflow-hidden rounded-[1.1rem] ${
                    logo ? "bg-white p-5" : "border border-dashed border-brass/30 bg-surface"
                  }`}
                  style={{ aspectRatio: "3 / 2" }}
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt={`${client.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                  ) : (
                    <span className="flex flex-col items-center gap-2">
                      {client.abbr && (
                        <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-bone/80">
                          {client.abbr}
                        </span>
                      )}
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass/80">
                        [Logo]
                      </span>
                    </span>
                  )}
                  <span className="absolute left-2.5 top-2.5">
                    <span className="index-chip !h-7 !min-w-7 !text-[10px]">{client.index}</span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <h3 className="font-display text-base font-semibold leading-snug text-white">
                    {client.name}
                  </h3>
                  {client.abbr && (
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                      {client.abbr}
                    </p>
                  )}

                  <ul className="mt-4 space-y-2.5 border-t border-white/[0.06] pt-4">
                    {client.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2.5 text-[13px] leading-relaxed text-mist"
                      >
                        <MapPin className="mt-1 h-3 w-3 shrink-0 text-brass/70" strokeWidth={1.75} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <CallToAction
        id="get-in-touch"
        eyebrow="Become a client"
        title="Start with a site survey."
        body="Tell us where the site is and what the hours look like. We will walk it, then put a written deployment plan in front of you."
      />
      <RevealEngine />
    </>
  );
}
