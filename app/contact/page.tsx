import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, Siren } from "lucide-react";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Copy } from "@/components/ui/Placeholder";
import ContactForm from "@/components/sections/ContactForm";
import RevealEngine from "@/components/layout/RevealEngine";

export const metadata: Metadata = {
  title: "Contact BSM — Security Agency in Goa",
  description:
    "Contact BSM for security services in Goa, India. Phone, email, WhatsApp, office address and enquiry form for corporate, residential, event, industrial and hospitality security.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact BSM — Security Agency in Goa",
    description: "Phone, email, WhatsApp and office address for BSM security services in Goa, India.",
    url: `${site.url}/contact`,
  },
};

const channels = [
  {
    icon: Phone,
    k: "Call",
    v: site.contact.phone,
    href: site.contact.phoneHref,
    note: "For enquiries and survey bookings.",
  },
  {
    icon: MessageCircle,
    k: "WhatsApp",
    v: site.contact.whatsapp,
    href: site.contact.whatsappHref,
    note: "Send site photographs and details directly.",
  },
  {
    icon: Mail,
    k: "Email",
    v: site.contact.email,
    href: site.contact.emailHref,
    note: "For written scopes, tenders and documentation.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd data={localBusinessSchema} />

      <PageHero
        eyebrow="Contact"
        index="03"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        title={
          <>
            Talk to someone who will{" "}
            <span className="accent-serif text-brass">walk</span> the site.
          </>
        }
        lead="Call, message or send the details below. For anything time-critical, use the control room number rather than the form."
      >
        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3" data-stagger>
          {channels.map((channel) => (
            <a
              key={channel.k}
              href={channel.href}
              data-stagger-item
              className="group relative bg-void p-8 transition-colors duration-500 hover:bg-raise"
            >
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <channel.icon className="h-5 w-5 text-brass" strokeWidth={1.25} />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                {channel.k}
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-bone">
                <Copy text={channel.v} />
              </p>
              <p className="mt-3 text-sm text-mist">{channel.note}</p>
            </a>
          ))}
        </div>

        {/* Emergency */}
        <div
          className="mt-px flex flex-col gap-5 border border-t-0 border-line bg-raise p-8 sm:flex-row sm:items-center sm:justify-between"
          data-reveal="up"
        >
          <div className="flex items-start gap-4">
            <Siren className="mt-0.5 h-5 w-5 shrink-0 text-alert" strokeWidth={1.5} />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-alert">
                Incident in progress
              </p>
              <p className="mt-2 max-w-xl text-sm text-mist">
                Call the police on 112 first. Then reach the BSM control room so a supervisor can be
                dispatched and the incident recorded.
              </p>
            </div>
          </div>
          <a
            href={`tel:${site.contact.emergencyPhone}`}
            className="shrink-0 border border-alert/60 px-6 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-alert transition-colors duration-300 hover:bg-alert hover:text-void"
          >
            <Copy text={site.contact.emergencyPhone} />
          </a>
        </div>
      </PageHero>

      {/* Form + details */}
      <Section label="Enquiry form" id="enquiry">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel index="01">Enquiry</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              Request security.
            </h2>
            <p data-reveal="up" className="mt-8 max-w-xl text-mist">
              The more specific you are about the site and the hours, the more useful our first
              reply will be.
            </p>
            <div className="mt-12" data-reveal="up" data-delay="0.08">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              <div className="border border-line bg-ink p-8" data-reveal="up">
                <MapPin className="h-5 w-5 text-brass" strokeWidth={1.25} />
                <h3 className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                  Office
                </h3>
                <address className="mt-4 not-italic leading-relaxed text-mist">
                  <Copy text={site.contact.address.street} />
                  <br />
                  <Copy text={site.contact.address.locality} />
                  <br />
                  Goa <Copy text={site.contact.address.postalCode} />
                  <br />
                  India
                </address>
                <a
                  href={site.contact.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="link-wipe mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-brass"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="mt-px border border-t-0 border-line bg-ink p-8" data-reveal="up">
                <Clock className="h-5 w-5 text-brass" strokeWidth={1.25} />
                <h3 className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                  Business hours
                </h3>
                <dl className="mt-4 space-y-3">
                  {site.contact.hours.map((row) => (
                    <div key={row.days} className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-3 text-sm">
                      <dt className="text-mist">{row.days}</dt>
                      <dd className="text-right">
                        <Copy text={row.time} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Map */}
      <section aria-label="Office location map" className="relative border-t border-line">
        <div className="shell py-16">
          <SectionLabel index="02">Find us</SectionLabel>
          <h2 data-split className="mt-8 max-w-2xl text-display font-semibold text-bone">
            Based in Goa. On site across the state.
          </h2>
          <p data-reveal="up" className="mt-6 max-w-xl text-sm text-dim">
            The map below is centred on Goa. Replace the embed URL in{" "}
            <code className="font-mono text-brass">lib/site.ts</code> with BSM&apos;s exact office
            location once confirmed.
          </p>
        </div>

        <div className="relative border-t border-line" data-reveal="up">
          <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden bg-surface">
            <iframe
              src={site.contact.mapsEmbed}
              title="Map showing BSM's location in Goa, India"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.9] contrast-[1.1] invert-[0.92] hue-rotate-180"
            />
          </div>
          <span className="pointer-events-none absolute left-6 top-6 border border-brass/50 bg-void/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brass backdrop-blur">
            BSM · Goa, India
          </span>
        </div>
      </section>
      <RevealEngine />
    </>
  );
}
