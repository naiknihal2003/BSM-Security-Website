import { Section, SectionLabel } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Button } from "@/components/ui/Button";
import { media } from "@/lib/media";

export default function Statement() {
  return (
    <Section id="about" label="About BSM">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel index="01">Who we are</SectionLabel>
          <div className="mt-10 hidden lg:block">
            <MediaFrame
              shot={media.briefing}
              figure="Fig. 02 / Briefing"
              ratio="3 / 4"
              sizes="(max-width: 1024px) 100vw, 28vw"
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <h2 data-split className="text-display font-semibold text-bone">
            BSM is a security agency built around one idea: security is a{" "}
            <span className="accent-serif text-brass">discipline</span>, not a headcount.
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <p data-reveal="up" className="text-lead text-mist">
              Goa is a state of extremes — a beachfront property in peak season and the same
              property in monsoon are two different security problems. A gated community, an
              industrial estate and a hotel lobby each demand different judgement from the person
              standing at the door.
            </p>
            <p data-reveal="up" data-delay="0.08" className="text-lead text-mist">
              We plan for that difference before anyone is deployed: a site survey, a written
              deployment plan, personnel matched to the environment, and supervision that verifies
              the plan is actually being followed at three in the morning.
            </p>
          </div>

          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3" data-stagger>
            {[
              { k: "Based in", v: "Goa", note: "Local teams, local knowledge, local response." },
              { k: "Operating across", v: "India", note: "Coastal, urban and industrial sites." },
              { k: "Built on", v: "Procedure", note: "Written plans, documented rounds, reporting." },
            ].map((item) => (
              <div key={item.k} data-stagger-item className="bg-void p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{item.k}</p>
                <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-bone">
                  {item.v}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-12" data-reveal="up">
            <Button href="/about" variant="outline">
              About BSM
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
