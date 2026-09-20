"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { industries } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Section";

/**
 * Sectors served, as a pinned horizontal run on desktop. On small screens and
 * under reduced-motion it degrades to an ordinary scrollable row — no pinning,
 * no hijacked scroll on the devices where that behaves worst.
 */
export default function Industries() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = root.current;
    const pinned = pin.current;
    const rail = track.current;
    if (!section || !pinned || !rail) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const distance = () => rail.scrollWidth - window.innerWidth + 96;
        gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            // Pin an INNER element, never the section itself. ScrollTrigger
            // wraps whatever it pins in a .pin-spacer; if that were a direct
            // child of <main>, React would later try to remove it from a
            // parent it no longer belongs to and tear the app down on
            // navigation. Wrapping an inner node keeps React's own removal
            // target (the <section>) exactly where React left it.
            trigger: pinned,
            pin: pinned,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
      return () => mm.revert();
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      aria-label="Sectors served"
      className="relative overflow-hidden border-t border-line"
    >
      <div ref={pin} className="py-24 lg:h-screen lg:py-0">
        <div className="flex h-full flex-col justify-center">
          <div className="shell">
            <SectionLabel index="04">Sectors served</SectionLabel>
            <h2 data-split className="mt-8 max-w-3xl text-display font-semibold text-bone">
              Every sector has its own idea of what going wrong looks like.
            </h2>
          </div>

          <div className="mt-14 lg:mt-20">
            <ul
              ref={track}
              className="flex gap-px overflow-x-auto bg-line pl-5 pr-5 md:pl-10 md:pr-10 lg:overflow-visible lg:pl-16 lg:pr-16"
              style={{ scrollbarWidth: "none" }}
            >
              {industries.map((industry, i) => (
                <li
                  key={industry.name}
                  className="group relative flex min-h-[19rem] w-[17rem] shrink-0 flex-col justify-between bg-void p-7 transition-colors duration-500 hover:bg-raise md:w-[21rem] md:p-9"
                >
                  <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
                  <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
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

          <div className="shell mt-10 hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-dim lg:flex">
            <span className="h-px w-16 bg-line" />
            Keep scrolling to move across sectors
          </div>
        </div>
      </div>
    </section>
  );
}
