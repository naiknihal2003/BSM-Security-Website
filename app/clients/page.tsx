import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import {
  ClipboardList,
  FileSignature,
  MapPin,
  Quote,
  RefreshCcw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { clients, testimonials, clientFacts } from "@/lib/site";
import { clientLogos } from "@/lib/media";
import { shortcuts } from "@/lib/navigation";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Placeholder, Copy } from "@/components/ui/Placeholder";
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

/** What a client relationship involves. Process, not claims. */
const commitments = [
  {
    title: "A named point of contact",
    body: "One supervisor accountable for the deployment, reachable without going through a switchboard.",
    icon: UserCheck,
  },
  {
    title: "A written deployment plan",
    body: "Post locations, shift pattern, patrol routes, reporting formats and the escalation chain — agreed before anyone is deployed.",
    icon: FileSignature,
  },
  {
    title: "Records you can inspect",
    body: "Gate registers, patrol checkpoints, occurrence books and handover notes, maintained on site and available to you.",
    icon: ClipboardList,
  },
  {
    title: "Review points",
    body: "Scheduled reviews so the deployment moves with the site, the season and the risk — not with the invoice cycle.",
    icon: RefreshCcw,
  },
];

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
        lead="The organisations below are BSM's clients, listed exactly as BSM supplied them. Logos remain each organisation's own artwork and are shown only once official files are provided."
      >
        <div className="mt-10 lg:mt-[clamp(1.5rem,4.5svh,3.25rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {clientFacts.map((fact) => (
            <div key={fact.k} data-stagger-item className="card card-void group p-6 lg:p-[clamp(1.1rem,2.6svh,1.75rem)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{fact.k}</p>
              <p className="mt-4 font-display text-2xl font-semibold text-bone">
                <Copy text={fact.v} />
              </p>
            </div>
          ))}
        </div>
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

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <p data-reveal="up" className="max-w-2xl text-lead text-mist lg:col-span-6">
            Organisations BSM is engaged with, with the locations and operational details as
            supplied. Public sector undertakings, government establishments, defence facilities and
            airports among them.
          </p>
          <div
            className="flex items-start gap-4 rounded-2xl border border-brass/25 bg-brass/[0.04] p-5 lg:col-span-5 lg:col-start-8"
            data-reveal="up"
          >
            <span className="icon-tile !h-10 !w-10 !rounded-xl">
              <ShieldCheck className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <p className="text-sm text-mist">
              Each card carries a frame for the organisation&apos;s official logo. Logos are their
              proprietors&apos; artwork, so none is reproduced here until the file is supplied — the
              frames are never filled with substitutes.
            </p>
          </div>
        </div>

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

      {/* What clients get */}
      <Section
        id="working-with-bsm"
        label="What a client relationship involves"
        className="bg-ink"
        fill
      >
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel index="02">Working with BSM</SectionLabel>
            <h2 data-split className="mt-6 max-w-3xl text-display font-semibold text-bone">
              What every client gets, named or not.
            </h2>
          </div>
          <p data-reveal="up" className="max-w-xl text-lead text-mist lg:col-span-5 lg:pb-[0.4em]">
            Four things come with every deployment, from a single guard post to a multi-shift site.
          </p>
        </div>

        <div className="mt-10 lg:mt-[clamp(1.5rem,5svh,3.5rem)] grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-stagger>
          {commitments.map((item, i) => (
            <div
              key={item.title}
              data-stagger-item
              className="card group flex flex-col p-7 lg:p-[clamp(1.25rem,3svh,2rem)]"
            >
              <div className="flex items-center justify-between">
                <span className="icon-tile !h-12 !w-12 !rounded-2xl">
                  <item.icon className="h-5 w-5" strokeWidth={1.25} />
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-[clamp(1.25rem,3.5svh,2rem)] font-display text-[clamp(1.2rem,min(1.6vw,3svh),1.6rem)] font-semibold leading-snug tracking-[-0.015em] text-bone">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" label="Client testimonials" fill>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel index="03">In their words</SectionLabel>
            <h2 data-split className="mt-6 max-w-2xl text-display font-semibold text-bone">
              Testimonials, once they are given.
            </h2>
          </div>
          <p data-reveal="up" className="max-w-xl text-lead text-mist lg:col-span-5 lg:pb-[0.4em]">
            No quotation is published until a client has written it and approved its use. The three
            frames below are where they go.
          </p>
        </div>

        <div className="mt-10 lg:mt-[clamp(1.5rem,5svh,3.5rem)] grid gap-4 lg:grid-cols-3" data-stagger>
          {testimonials.map((item, i) => (
            <figure
              key={i}
              data-stagger-item
              className="card card-void group flex flex-col p-7 lg:p-[clamp(1.25rem,3svh,2.25rem)]"
            >
              <span className="icon-tile">
                <Quote className="h-5 w-5" strokeWidth={1.25} />
              </span>
              <blockquote className="mt-[clamp(1.25rem,3.5svh,2rem)] text-lead text-mist">
                <Placeholder>{item.quote}</Placeholder>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4 border-t border-white/[0.06] pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-dim [margin-top:clamp(1.25rem,3.5svh,2rem)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-dashed border-brass/40 text-brass/70">
                  ?
                </span>
                <span>
                  <Placeholder>{item.attribution}</Placeholder>
                  <span className="mt-2 block text-dim/70">
                    <Placeholder>{item.role}</Placeholder>
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
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
