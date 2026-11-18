import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, offices } from "@/lib/site";
import { JsonLd, breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Copy } from "@/components/ui/Placeholder";
import EnquiryForm from "@/components/sections/EnquiryForm";
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

const emailChannel = {
  icon: Mail,
  k: "Email",
  v: site.contact.email,
  href: site.contact.emailHref,
  note: "For written scopes, tenders and documentation.",
};

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
        index="06"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        title={
          <>
            Discuss your <span className="accent-serif text-brass">security</span> requirements
            with our team.
          </>
        }
        lead="Contact our team by phone, WhatsApp or through the enquiry form below for further information and assistance."
      >
        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3" data-stagger>
          {/* All three lines, in BSM's order. The first is the primary number. */}
          <div data-stagger-item className="group relative bg-void p-8">
            <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
            <Phone className="h-5 w-5 text-brass" strokeWidth={1.25} />
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Call</p>
            <ul className="mt-3 space-y-2">
              {site.contact.phones.map((line) => (
                <li key={line.href}>
                  <a
                    href={line.href}
                    className="link-wipe font-display text-lg font-semibold tracking-[-0.01em] text-bone transition-colors duration-300 hover:text-brass"
                  >
                    {line.display}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-mist">For enquiries and survey bookings.</p>
          </div>

          <div data-stagger-item className="group relative bg-void p-8">
            <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
            <WhatsAppIcon className="h-5 w-5 text-brass" />
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              WhatsApp
            </p>
            <ul className="mt-3 space-y-2">
              {site.contact.whatsapps.map((line) => (
                <li key={line.href}>
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-wipe font-display text-lg font-semibold tracking-[-0.01em] text-bone transition-colors duration-300 hover:text-brass"
                  >
                    {line.display}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-mist">
              Contact us on WhatsApp for further enquiries and assistance.
            </p>
          </div>

          <a
            href={emailChannel.href}
            data-stagger-item
            className="group relative bg-void p-8 transition-colors duration-500 hover:bg-raise"
          >
            <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
            <emailChannel.icon className="h-5 w-5 text-brass" strokeWidth={1.25} />
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              {emailChannel.k}
            </p>
            <p className="mt-3 font-display text-lg font-semibold tracking-[-0.01em] text-bone">
              {emailChannel.v}
            </p>
            <p className="mt-4 text-sm text-mist">{emailChannel.note}</p>
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
              Leave a contact number and we will call you back. Add a line about the site and the
              hours if you can — it makes our first reply more useful.
            </p>
            <div className="mt-12 max-w-xl" data-reveal="up" data-delay="0.08">
              <EnquiryForm idPrefix="contact" />
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              {/* Both offices, each labelled. Full details are on the
                  Branch page; these are the postal addresses. */}
              <div className="border border-line bg-ink p-8" data-reveal="up">
                <MapPin className="h-5 w-5 text-brass" strokeWidth={1.25} />
                <h3 className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                  Offices
                </h3>

                {offices.map((office, i) => (
                  <div key={office.id} className={i === 0 ? "mt-5" : "mt-7 border-t border-line-soft pt-6"}>
                    <div className="flex items-center gap-3">
                      <span className="h-px w-6 shrink-0 bg-brass" aria-hidden="true" />
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brass">
                        {office.kind}
                      </p>
                    </div>
                    <address className="mt-3 not-italic leading-relaxed text-mist">
                      {office.address}
                    </address>
                    {office.additionalAddress && (
                      <address className="mt-3 not-italic leading-relaxed text-dim">
                        {office.additionalAddress}
                      </address>
                    )}
                    <a
                      href={office.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="link-wipe mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-brass"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                ))}
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

      <RevealEngine />
    </>
  );
}
