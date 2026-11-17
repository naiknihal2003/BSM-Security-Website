import { industries } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Section";

/**
 * Sectors served.
 *
 * This used to be a pinned horizontal run driven by a scrubbed ScrollTrigger.
 * Pinning a full-height element left a blank viewport while the pin-spacer was
 * on screen, and the scrubbed transform on a very wide track was the single
 * most expensive thing on the home page. It is now an ordinary responsive
 * grid: the same cards, the same styling, no pin, no hijacked scroll — and no
 * client-side JavaScript at all.
 */
export default function Industries() {
  return (
    <section
      id="sectors"
      aria-label="Sectors served"
      className="relative border-t border-line py-28 md:py-36 lg:py-44"
    >
      {/* Section divider: a brass hairline that fades across the top edge, so
          one section visibly ends before the next begins. */}
      <span
        className="section-divider pointer-events-none absolute inset-x-0 top-0"
        aria-hidden="true"
      />

      <div className="shell">
        <SectionLabel index="05">Sectors served</SectionLabel>
        <h2 data-split className="mt-8 max-w-3xl text-display font-semibold text-bone">
          Every sector has its own idea of what going wrong looks like.
        </h2>

        <ul
          className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          data-stagger
        >
          {industries.map((industry, i) => (
            <li
              key={industry.name}
              data-stagger-item
              className="group relative flex min-h-[17rem] flex-col justify-between bg-void p-7 transition-colors duration-500 hover:bg-raise md:p-9"
            >
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-bone md:text-[1.75rem]">
                  {industry.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">{industry.note}</p>
                <span className="mt-7 block h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
