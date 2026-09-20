import type { Metadata } from "next";
import { Compass, Crosshair, ScrollText, Users } from "lucide-react";
import { site, values } from "@/lib/site";
import { media } from "@/lib/media";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Placeholder, Copy } from "@/components/ui/Placeholder";
import CallToAction from "@/components/sections/CallToAction";
import RevealEngine from "@/components/layout/RevealEngine";

export const metadata: Metadata = {
  title: "About BSM — Security Agency in Goa",
  description:
    "BSM is a professional security agency based in Goa, India. Our mission, values, standards and approach to protecting corporate, residential, industrial and hospitality sites across Goa.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About BSM — Security Agency in Goa",
    description:
      "The story, mission, values and professional standards behind BSM, a security agency based in Goa, India.",
    url: `${site.url}/about`,
  },
};

const leadership = [
  { role: "Founder / Managing Director", name: "[NAME]", note: "[BACKGROUND AND EXPERIENCE]" },
  { role: "Operations Head", name: "[NAME]", note: "[BACKGROUND AND EXPERIENCE]" },
  { role: "Field Supervisor — North Goa", name: "[NAME]", note: "[BACKGROUND AND EXPERIENCE]" },
  { role: "Field Supervisor — South Goa", name: "[NAME]", note: "[BACKGROUND AND EXPERIENCE]" },
];

const standards = [
  {
    title: "Selection",
    body: "Personnel are screened before they are deployed, not after. [VERIFICATION, POLICE CHECK AND DOCUMENTATION PROCESS]",
  },
  {
    title: "Training",
    body: "Briefing on the site, its people and its escalation path is part of every deployment. [TRAINING CURRICULUM AND REFRESHER SCHEDULE]",
  },
  {
    title: "Turnout",
    body: "Uniform, identification and presentation are checked at the start of every shift. A post that looks unprofessional is treated as unprofessional.",
  },
  {
    title: "Records",
    body: "Gate registers, patrol checkpoints, occurrence books and handover notes — maintained on site and available to the client.",
  },
  {
    title: "Supervision",
    body: "Scheduled and unscheduled checks by a field supervisor. [SUPERVISION FREQUENCY]",
  },
  {
    title: "Statutory compliance",
    body: "Wages, statutory cover and licensing handled as the employer's responsibility, not the client's problem. [COMPLIANCE DETAILS]",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="About BSM"
        index="01"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        title={
          <>
            A security agency built in Goa,{" "}
            <span className="accent-serif text-brass">for</span> Goa.
          </>
        }
        lead="BSM provides trained security personnel and managed protection services across the state. This page sets out how we work, what we hold ourselves to, and what we will not claim."
      />

      {/* Story */}
      <Section label="Our story">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionLabel index="02">Our story</SectionLabel>
            <div className="mt-10">
              <MediaFrame
                shot={media.patrol}
                figure="Fig. 01 / Field"
                ratio="4 / 5"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 data-split className="text-display font-semibold text-bone">
              Security is a promise kept on the days nothing happens.
            </h2>

            <div className="mt-10 space-y-6 text-lead text-mist">
              <p data-reveal="up">
                BSM was founded to bring procedure to a service that is too often sold as bodies on
                a roster. The company operates out of Goa and deploys across the state, in
                environments that could not be more different from one another — a resort in
                December, an industrial gate at 2am, a gated community in monsoon.
              </p>
              <p data-reveal="up" data-delay="0.06">
                The founding history, milestones and scale of the company are BSM&apos;s to tell.
                Rather than invent them, this section holds the space for the real account.
              </p>
            </div>

            <div className="mt-12 border border-line bg-ink p-8" data-reveal="up">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                Company history
              </p>
              <p className="mt-4 text-mist">
                <Placeholder>[FOUNDING YEAR, FOUNDER&apos;S BACKGROUND AND THE REASON BSM WAS STARTED]</Placeholder>
              </p>
              <p className="mt-6 text-sm text-dim">
                A timeline is ready to be published here as soon as verified dates and milestones
                are supplied. No years of operation, client counts or growth figures have been
                assumed.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section label="Mission and vision" className="bg-ink">
        <div className="grid gap-px border border-line bg-line lg:grid-cols-2" data-stagger>
          {[
            {
              icon: Crosshair,
              k: "Mission",
              h: "To make professional security the ordinary standard in Goa.",
              p: "To deploy personnel who are selected, briefed and supervised properly — and to document the work so that clients can verify it rather than take it on trust.",
            },
            {
              icon: Compass,
              k: "Vision",
              h: "To be the agency Goa's serious properties call first.",
              p: "To be known, across hospitality, industry and residential Goa, for deployments that hold their standard in the twelfth hour of a shift and the sixth month of a contract.",
            },
          ].map((item) => (
            <div key={item.k} data-stagger-item className="bg-ink p-10 lg:p-14">
              <item.icon className="h-6 w-6 text-brass" strokeWidth={1.25} />
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                {item.k}
              </p>
              <h2 className="mt-4 font-display text-title font-semibold text-bone">{item.h}</h2>
              <p className="mt-5 leading-relaxed text-mist">{item.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section label="Core values">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="03">Core values</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              Six things we do not negotiate.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="border-t border-line" data-stagger>
              {values.map((value) => (
                <div
                  key={value.index}
                  data-stagger-item
                  className="group grid grid-cols-12 gap-4 border-b border-line py-7"
                >
                  <dt className="col-span-12 flex items-baseline gap-4 sm:col-span-5">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-brass">
                      {value.index}
                    </span>
                    <span className="font-display text-xl font-semibold tracking-[-0.02em] text-bone">
                      {value.title}
                    </span>
                  </dt>
                  <dd className="col-span-12 text-sm leading-relaxed text-mist sm:col-span-7">
                    {value.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section label="Our approach" className="bg-ink">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionLabel index="04">Our approach</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              Plan the site. Then staff it.
            </h2>
            <div className="mt-10 space-y-6 text-mist">
              <p data-reveal="up">
                Most security failures are not dramatic. A gate register that nobody reconciles. A
                patrol route that quietly stops being walked. A handover done by phone instead of
                in person. These are planning failures, and they are preventable.
              </p>
              <p data-reveal="up" data-delay="0.06">
                So BSM starts with the site: where people actually enter, where the light stops,
                when the property is busiest and when it is emptiest, and what must never be
                allowed to leave. The deployment is written to that, then staffed, then supervised
                against it.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="grid gap-6">
              <MediaFrame
                shot={media.goaLandscape}
                figure="Fig. 02 / Coverage"
                ratio="4 / 3"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
              <MediaFrame
                shot={media.records}
                figure="Fig. 03 / Records"
                ratio="4 / 3"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Standards */}
      <Section label="Professional standards">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="05">Professional standards</SectionLabel>
            <h2 data-split className="mt-8 max-w-2xl text-display font-semibold text-bone">
              What a BSM deployment holds itself to.
            </h2>
          </div>
          <ScrollText className="hidden h-8 w-8 text-brass md:block" strokeWidth={1} />
        </div>

        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3" data-stagger>
          {standards.map((standard, i) => (
            <article
              key={standard.title}
              data-stagger-item
              className="group relative bg-void p-8 transition-colors duration-500 hover:bg-raise lg:p-10"
            >
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em] text-bone">
                {standard.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mist">
                <Copy text={standard.body} />
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section label="Leadership" className="bg-ink">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="06">Leadership</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              The people accountable for your deployment.
            </h2>
            <p data-reveal="up" className="mt-8 max-w-sm text-mist">
              Names, roles and backgrounds are published here once BSM supplies them. Placeholders
              are shown rather than invented profiles.
            </p>
            <div className="mt-8 flex items-start gap-3 border-l border-brass/50 pl-4" data-reveal="up">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
              <p className="text-sm text-dim">
                Replace each card below with a real name, role and photograph.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2" data-stagger>
              {leadership.map((person, i) => (
                <article key={i} data-stagger-item className="bg-ink p-7">
                  <div className="relative aspect-4/5 w-full border border-line bg-surface">
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="border border-brass/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-brass">
                        [Portrait]
                      </span>
                    </div>
                  </div>
                  <p className="mt-6 font-display text-lg font-semibold text-bone">
                    <Placeholder>{person.name}</Placeholder>
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                    {person.role}
                  </p>
                  <p className="mt-4 text-sm text-mist">
                    <Placeholder>{person.note}</Placeholder>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CallToAction
        eyebrow="Work with BSM"
        title="Start with a site survey."
        body="The fastest way to understand what BSM would actually do at your property is to have someone walk it. Tell us where and when."
      />
      <RevealEngine />
    </>
  );
}
