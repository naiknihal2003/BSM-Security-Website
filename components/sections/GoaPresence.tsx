import { Building, Factory, Home, Waves, type LucideIcon } from "lucide-react";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Copy } from "@/components/ui/Placeholder";
import { goaPresence } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  "Coastal properties": Waves,
  "Urban and commercial": Building,
  "Industrial estates": Factory,
  "Residential societies": Home,
};

/**
 * Presence. The photograph pair that used to sit alongside this copy has been
 * removed at BSM's request; the section is a single text-and-cards block.
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
          <dl className="grid gap-4 sm:grid-cols-2" data-stagger>
            {goaPresence.map((area) => {
              const Icon = icons[area.name] ?? Building;
              return (
                <div key={area.name} data-stagger-item data-tilt="6" className="card card-void group p-7">
                  <span className="icon-tile">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                  <dt className="mt-6 font-display text-lg font-semibold tracking-[-0.02em] text-bone">
                    {area.name}
                  </dt>
                  <dd className="mt-3 text-sm text-mist">
                    <Copy text={area.note} />
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </Section>
  );
}
