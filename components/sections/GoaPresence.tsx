import { Section, SectionLabel } from "@/components/ui/Section";
import { Copy } from "@/components/ui/Placeholder";
import { goaPresence } from "@/lib/site";

/**
 * Presence. The photograph pair that used to sit alongside this copy has been
 * removed at BSM's request; the section is now a single text-and-cards block.
 */
export default function GoaPresence() {
  return (
    <Section id="presence" label="Presence">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="07">Presence</SectionLabel>
          <h2 data-split className="mt-8 text-display font-semibold text-bone">
            Security is not one problem. It is{" "}
            <span className="accent-serif text-brass">several</span>.
          </h2>
          <p data-reveal="up" className="mt-8 max-w-lg text-lead text-mist">
            The coast fills and empties with the season. The estates run around the clock. The
            capital keeps office hours and the villages keep their own. A deployment that ignores
            that rhythm is a deployment that fails quietly.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2" data-stagger>
            {goaPresence.map((area) => (
              <div key={area.name} data-stagger-item className="bg-void p-7">
                <dt className="font-display text-lg font-semibold tracking-[-0.02em] text-bone">
                  {area.name}
                </dt>
                <dd className="mt-3 text-sm text-mist">
                  <Copy text={area.note} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
