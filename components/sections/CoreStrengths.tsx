import { coreStrengths } from "@/lib/site";
import { Section, SectionLabel } from "@/components/ui/Section";

/**
 * Our Core Strengths — seven points supplied by BSM, reproduced verbatim.
 * Presentation only: the numbering, headings and wording are not edited here.
 */
export default function CoreStrengths() {
  return (
    <Section id="core-strengths" label="Our core strengths" className="bg-ink">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel index="02">Our Core Strengths</SectionLabel>
          <h2 data-split className="mt-8 text-display font-semibold text-bone">
            What BSM is built <span className="accent-serif text-brass">on</span>.
          </h2>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ol className="grid gap-px border border-line bg-line sm:grid-cols-2" data-stagger>
            {coreStrengths.map((item) => {
              /* The DGR sponsorship is the one credential BSM has confirmed,
                 so that card carries the brass treatment. Wording unchanged. */
              const featured = item.index === "02";
              return (
                <li
                  key={item.index}
                  data-stagger-item
                  className={`group relative flex flex-col p-7 md:p-8 ${
                    featured ? "bg-brass/[0.07] ring-1 ring-inset ring-brass/45" : "bg-ink"
                  }`}
                >
                  <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
                  <span className="font-mono text-[11px] tracking-[0.2em] text-brass">
                    {item.index}
                  </span>
                  <h3
                    className={`mt-5 font-display text-lg font-semibold tracking-[-0.01em] ${
                      featured ? "text-brass" : "text-bone"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      featured ? "text-bone/90" : "text-mist"
                    }`}
                  >
                    {item.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
