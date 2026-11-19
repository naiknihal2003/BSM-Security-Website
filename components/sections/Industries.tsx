import {
  Building2,
  Factory,
  GraduationCap,
  HardHat,
  Home,
  Hotel,
  PartyPopper,
  Store,
  type LucideIcon,
} from "lucide-react";
import { industries } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Section";

/** A mark per sector, keyed by the names in lib/site. */
const icons: Record<string, LucideIcon> = {
  "Hospitality & Resorts": Hotel,
  "Corporate & IT": Building2,
  "Residential Communities": Home,
  "Industrial & Logistics": Factory,
  "Retail & Commercial": Store,
  "Events & Entertainment": PartyPopper,
  "Healthcare & Education": GraduationCap,
  "Construction & Projects": HardHat,
};

/**
 * Sectors served — an ordinary responsive grid of cards. No pin and no
 * hijacked scroll (that version left a blank viewport while the pin-spacer
 * was on screen); the motion is in the cards themselves.
 */
export default function Industries() {
  return (
    <section
      id="sectors"
      aria-label="Sectors served"
      className="relative border-t border-line section-pad"
    >
      <span
        className="section-divider pointer-events-none absolute inset-x-0 top-0"
        aria-hidden="true"
      />

      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="05">Sectors served</SectionLabel>
            <h2 data-split className="mt-8 max-w-3xl text-display font-semibold text-bone">
              Every sector has its own idea of what going wrong looks like.
            </h2>
          </div>
          <p data-reveal="up" className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
            {String(industries.length).padStart(2, "0")} sectors
          </p>
        </div>

        <ul
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          data-stagger
        >
          {industries.map((industry, i) => {
            const Icon = icons[industry.name] ?? Building2;
            return (
              <li
                key={industry.name}
                data-stagger-item
                data-tilt="7"
                className="card card-void group flex min-h-[16rem] flex-col justify-between p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="icon-tile">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-dim transition-colors duration-500 group-hover:text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-10">
                  <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-bone md:text-[1.4rem]">
                    {industry.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{industry.note}</p>
                  <span className="mt-6 block h-0.5 w-10 rounded-full bg-brass/50 transition-[width,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-hover:bg-brass" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
