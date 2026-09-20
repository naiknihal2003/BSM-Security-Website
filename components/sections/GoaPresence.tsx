import { Section, SectionLabel } from "@/components/ui/Section";
import { GoaMap } from "@/components/ui/GoaMap";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Copy } from "@/components/ui/Placeholder";
import { goaPresence } from "@/lib/site";
import { media } from "@/lib/media";

export default function GoaPresence() {
  return (
    <Section id="goa" label="Presence in Goa">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="06">Presence</SectionLabel>
          <h2 data-split className="mt-8 text-display font-semibold text-bone">
            Goa is not one security problem. It is{" "}
            <span className="accent-serif text-brass">several</span>.
          </h2>
          <p data-reveal="up" className="mt-8 max-w-lg text-lead text-mist">
            The coast fills and empties with the season. The estates run around the clock. The
            capital keeps office hours and the villages keep their own. A deployment that ignores
            that rhythm is a deployment that fails quietly.
          </p>

          <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2" data-stagger>
            {goaPresence.map((area) => (
              <div key={area.name} data-stagger-item className="bg-void p-6">
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

        <div className="lg:col-span-6 lg:col-start-7">
          <div
            className="relative overflow-hidden border border-line bg-ink p-6 md:p-10"
            data-reveal="scale"
            data-parallax-scope
          >
            <div data-parallax="0.05">
              <GoaMap className="mx-auto max-w-sm" />
            </div>
            <span className="pointer-events-none absolute -left-px -top-px h-4 w-4 border-l border-t border-brass" />
            <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b border-r border-brass" />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <MediaFrame
              shot={media.coast}
              figure="Fig. 03 / Coast"
              ratio="4 / 3"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
            <MediaFrame
              shot={media.estate}
              figure="Fig. 04 / Estate"
              ratio="4 / 3"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
