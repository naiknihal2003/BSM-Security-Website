import { Compass, Target } from "lucide-react";
import { vision, mission } from "@/lib/site";
import { Section, SectionLabel } from "@/components/ui/Section";

/**
 * Our Vision and Our Mission — supplied by BSM, reproduced verbatim and
 * given equal visual weight.
 */
export default function VisionMission() {
  return (
    <Section id="vision-mission" label="Our vision and mission">
      <SectionLabel index="03">Vision &amp; Mission</SectionLabel>

      <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2" data-stagger>
        <article data-stagger-item className="group relative bg-void p-8 md:p-12">
          <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
          <Compass className="h-6 w-6 text-brass" strokeWidth={1.25} />
          <h2 className="mt-8 font-display text-display font-semibold text-bone">Our Vision</h2>
          <p className="mt-8 max-w-xl text-lead leading-relaxed text-mist">{vision}</p>
        </article>

        <article data-stagger-item className="group relative bg-void p-8 md:p-12">
          <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
          <Target className="h-6 w-6 text-brass" strokeWidth={1.25} />
          <h2 className="mt-8 font-display text-display font-semibold text-bone">Our Mission</h2>
          <p className="mt-8 max-w-xl text-lead leading-relaxed text-mist">{mission}</p>
        </article>
      </div>
    </Section>
  );
}
