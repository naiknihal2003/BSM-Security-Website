import type { ReactNode } from "react";
import { ChevronRight, House } from "lucide-react";
import { TransitionLink } from "@/components/layout/PageTransition";
import { SectionLabel } from "./Section";

/**
 * Shared masthead for inner pages.
 *
 * On desktop it fills the first screen exactly, like the home hero; the
 * page's shortcut bar opens the second section — at any window height,
 * including laptops and browsers zoomed out to 67–75%. Spacing and the title
 * size follow the screen height; the title and standfirst sit side by side so
 * the page's own content (cards, contacts) is in view without scrolling.
 *
 * A slowly turning radar ornament (public/patterns/radar.svg) gives the dark
 * field some depth on large screens.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  index,
  breadcrumb,
  children,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  index?: string;
  breadcrumb: { label: string; href: string }[];
  children?: ReactNode;
  /** Shortcut target for the hero's own content (data-anchor). */
  id?: string;
}) {
  return (
    <section
      id={id}
      data-anchor={id ? "" : undefined}
      className="relative overflow-hidden bg-void pb-12 pt-32 md:pt-40 lg:flex lg:min-h-[100svh] lg:flex-col lg:pb-[clamp(1.25rem,3.5svh,2.75rem)] lg:pt-[calc(var(--nav-h)+3rem)]"
    >
      <span className="grain-layer" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 grid-veil opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(60%_60%_at_15%_0%,rgba(200,164,92,0.10)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      {/* Radar ornament */}
      <div
        className="pointer-events-none absolute -right-40 -top-24 hidden h-[44rem] w-[44rem] opacity-60 lg:block"
        aria-hidden="true"
      >
        <img src="/patterns/radar.svg" alt="" className="absolute inset-0 h-full w-full" />
        <div data-spin="14" className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute left-1/2 top-0 h-1/2 w-1/2 origin-bottom-left bg-[conic-gradient(from_0deg_at_0%_100%,rgba(200,164,92,0.22),transparent_22%)]" />
        </div>
      </div>

      <div className="shell relative w-full lg:flex lg:flex-1 lg:flex-col">
        {/* Breadcrumb and page label share one row. */}
        <div className="flex flex-wrap items-center gap-3" data-reveal="up">
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex h-10 flex-wrap items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="h-3 w-3 text-line" strokeWidth={2} aria-hidden="true" />}
                  {i === breadcrumb.length - 1 ? (
                    <span aria-current="page" className="rounded-full bg-brass/12 px-3 py-1 text-brass">
                      {crumb.label}
                    </span>
                  ) : (
                    <TransitionLink
                      href={crumb.href}
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-white/[0.05] hover:text-bone"
                    >
                      {i === 0 && <House className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />}
                      {crumb.label}
                    </TransitionLink>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <SectionLabel index={index}>{eyebrow}</SectionLabel>
        </div>

        {/* Everything below the fixed breadcrumb row is centred in the
            remaining height, so the row itself sits at the same place on
            every page while short and tall heroes both look balanced. */}
        <div className="lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-[clamp(0.75rem,2.5svh,2rem)]">
        {/* Title and standfirst: stacked on small screens, side by side on desktop. */}
        <div className="mt-8 grid gap-6 lg:mt-0 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1
            data-split
            className={`text-[clamp(2.2rem,min(4.8vw,7.6svh),4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-bone ${
              lead ? "lg:col-span-7" : "lg:col-span-10"
            }`}
          >
            {title}
          </h1>

          {lead && (
            <p
              data-reveal="up"
              data-delay="0.08"
              className="max-w-2xl text-lead text-mist lg:col-span-5 lg:pb-[0.4em]"
            >
              {lead}
            </p>
          )}
        </div>

        {children}
        </div>
      </div>
    </section>
  );
}
