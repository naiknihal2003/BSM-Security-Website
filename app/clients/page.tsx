import type { Metadata } from "next";
import { Building2, Quote, ShieldCheck } from "lucide-react";
import { site, clients, testimonials, clientFacts } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Placeholder, Copy } from "@/components/ui/Placeholder";
import CallToAction from "@/components/sections/CallToAction";
import RevealEngine from "@/components/layout/RevealEngine";

export const metadata: Metadata = {
  title: "Clients — Security Deployments Across Goa",
  description:
    "The environments BSM protects across Goa, India — corporate, hospitality, residential, industrial, retail and event sites — and what clients can expect from a deployment.",
  alternates: { canonical: "/clients" },
  openGraph: {
    title: "Clients | BSM Security, Goa",
    description:
      "The environments BSM protects across Goa, India, and what a client relationship involves.",
    url: `${site.url}/clients`,
  },
};

/** What a client relationship involves. Process, not claims. */
const commitments = [
  {
    title: "A named point of contact",
    body: "One supervisor accountable for the deployment, reachable without going through a switchboard.",
  },
  {
    title: "A written deployment plan",
    body: "Post locations, shift pattern, patrol routes, reporting formats and the escalation chain — agreed before anyone is deployed.",
  },
  {
    title: "Records you can inspect",
    body: "Gate registers, patrol checkpoints, occurrence books and handover notes, maintained on site and available to you.",
  },
  {
    title: "Review points",
    body: "Scheduled reviews so the deployment moves with the site, the season and the risk — not with the invoice cycle.",
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
        eyebrow="Clients"
        index="02"
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
        lead="Client names, logos and testimonials are published here only once BSM has supplied them and the client has agreed to be named. Nothing below is assumed."
      >
        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {clientFacts.map((fact) => (
            <div key={fact.k} data-stagger-item className="bg-void p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{fact.k}</p>
              <p className="mt-4 font-display text-2xl font-semibold text-bone">
                <Copy text={fact.v} />
              </p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Client roster */}
      <Section id="roster" label="Client roster">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionLabel index="01">Who we protect</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              Deployments by environment.
            </h2>
            <p data-reveal="up" className="mt-8 max-w-sm text-mist">
              Each card below is a slot waiting for a real client. The sector is the environment the
              deployment covers; the name, logo and summary come from BSM.
            </p>
            <div
              className="mt-8 flex items-start gap-3 border-l border-brass/50 pl-4"
              data-reveal="up"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
              <p className="text-sm text-dim">
                Client names are published only with the client&apos;s written permission. Where a
                client prefers not to be named, the sector is listed on its own.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2" data-stagger>
              {clients.map((client, i) => (
                <article key={i} data-stagger-item className="group relative bg-void p-7">
                  <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
                  <div className="flex h-20 w-full items-center justify-center border-2 border-brass/55 bg-surface">
                    {client.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className="max-h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass">
                        [Logo]
                      </span>
                    )}
                  </div>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                    {client.sector}
                  </p>
                  <p className="mt-3 font-display text-lg font-semibold text-bone">
                    <Placeholder>{client.name}</Placeholder>
                  </p>
                  {client.note && (
                    <p className="mt-3 text-sm text-mist">
                      <Copy text={client.note} />
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* What clients get */}
      <Section label="What a client relationship involves" className="bg-ink">
        <SectionLabel index="02">Working with BSM</SectionLabel>
        <h2 data-split className="mt-8 max-w-3xl text-display font-semibold text-bone">
          What every client gets, named or not.
        </h2>

        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2" data-stagger>
          {commitments.map((item, i) => (
            <div key={item.title} data-stagger-item className="group relative bg-ink p-8 md:p-10">
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-title font-semibold text-bone">{item.title}</h3>
              <p className="mt-4 max-w-md text-mist">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section label="Client testimonials">
        <div className="flex items-end justify-between gap-8">
          <div>
            <SectionLabel index="03">In their words</SectionLabel>
            <h2 data-split className="mt-8 max-w-2xl text-display font-semibold text-bone">
              Testimonials, once they are given.
            </h2>
          </div>
          <Building2 className="hidden h-8 w-8 shrink-0 text-brass/50 md:block" strokeWidth={1} />
        </div>

        <p data-reveal="up" className="mt-8 max-w-xl text-mist">
          No quotation is published until a client has written it and approved its use. The three
          frames below are where they go.
        </p>

        <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-3" data-stagger>
          {testimonials.map((item, i) => (
            <figure key={i} data-stagger-item className="group relative bg-void p-8 md:p-10">
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <Quote className="h-5 w-5 text-brass" strokeWidth={1.25} />
              <blockquote className="mt-6 text-lead text-mist">
                <Placeholder>{item.quote}</Placeholder>
              </blockquote>
              <figcaption className="mt-8 border-t border-line-soft pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                <Placeholder>{item.attribution}</Placeholder>
                <span className="mt-2 block text-dim/70">
                  <Placeholder>{item.role}</Placeholder>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CallToAction
        eyebrow="Become a client"
        title="Start with a site survey."
        body="Tell us where the site is and what the hours look like. We will walk it, then put a written deployment plan in front of you."
      />
      <RevealEngine />
    </>
  );
}
