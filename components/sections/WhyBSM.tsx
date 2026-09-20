import { ClipboardList, Eye, MapPin, ShieldCheck, UserCheck, Radio } from "lucide-react";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Copy } from "@/components/ui/Placeholder";

const reasons = [
  {
    icon: MapPin,
    title: "Goa-based, not Goa-serving",
    body: "Teams and supervision are local. Coverage across North and South Goa, coastal properties and inland estates. [COVERAGE DETAILS]",
  },
  {
    icon: ClipboardList,
    title: "A written deployment plan",
    body: "Post locations, shift patterns, patrol routes, reporting formats and escalation chain — agreed in writing before the first shift.",
  },
  {
    icon: UserCheck,
    title: "Personnel matched to the site",
    body: "A resort lobby and a material gate need different people. Deployments are staffed accordingly. [VERIFICATION AND TRAINING PROCESS]",
  },
  {
    icon: Eye,
    title: "Supervision that checks",
    body: "Field supervision and surprise checks, because a security deployment is only as strong as the night nobody is watching it.",
  },
  {
    icon: ClipboardList,
    title: "Documentation you can audit",
    body: "Gate registers, patrol checkpoints, occurrence reports and handover records — so incidents can be reconstructed, not argued about.",
  },
  {
    icon: Radio,
    title: "A named point of contact",
    body: "One person who answers for the deployment and is reachable when something changes. [ESCALATION CONTACT DETAILS]",
  },
];

export default function WhyBSM() {
  return (
    <Section id="why" label="Why BSM" className="bg-ink">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="03">Why BSM</SectionLabel>
          <h2 data-split className="mt-8 text-display font-semibold text-bone">
            The difference is what happens{" "}
            <span className="accent-serif text-brass">before</span> deployment.
          </h2>
        </div>
        <div className="flex items-end lg:col-span-5 lg:col-start-8">
          <p data-reveal="up" className="text-lead text-mist">
            Anyone can put a person at a gate. What decides whether a site is actually secure is
            the planning, the selection and the supervision around that person.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3" data-stagger>
        {reasons.map((reason) => (
          <article
            key={reason.title}
            data-stagger-item
            className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-raise lg:p-10"
          >
            <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
            <reason.icon
              className="h-6 w-6 text-brass transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
              strokeWidth={1.25}
            />
            <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.02em] text-bone">
              {reason.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-mist">
              <Copy text={reason.body} />
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-start gap-4 border-t border-line pt-8" data-reveal="up">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brass" strokeWidth={1.25} />
        <p className="max-w-3xl text-sm leading-relaxed text-dim">
          BSM makes no claims on this site about awards, ratings, client names, headcount or years
          of operation. Licence details, certifications and credentials appear only once BSM has
          supplied and verified them.
        </p>
      </div>
    </Section>
  );
}
