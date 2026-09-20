"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { processSteps } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Section";
import { Copy } from "@/components/ui/Placeholder";

/** How an engagement runs, with a rail that fills as you move through it. */
export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-rail",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".process-list",
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      aria-label="How we work"
      className="relative border-t border-line bg-ink py-24 md:py-32 lg:py-40"
    >
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="05">How we work</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              Six steps, in order, every time.
            </h2>
            <p data-reveal="up" className="mt-8 max-w-sm text-mist">
              The sequence does not change with the size of the site. A single guard post gets the
              same survey, plan and review cycle as a multi-shift industrial deployment.
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-7 lg:col-start-6">
          {/* Rail */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-line md:block" aria-hidden="true">
            <div className="process-rail h-full w-px origin-top scale-y-0 bg-brass" />
          </div>

          <ol className="process-list md:pl-12" data-stagger>
            {processSteps.map((step) => (
              <li
                key={step.index}
                data-stagger-item
                className="group relative border-b border-line py-8 first:pt-0 last:border-b-0"
              >
                <span
                  className="absolute -left-12 top-9 hidden h-1.5 w-1.5 -translate-x-[3px] bg-line transition-colors duration-500 group-hover:bg-brass md:block"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-3 md:flex-row md:gap-8">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-brass md:w-12 md:shrink-0">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-bone">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-mist">
                      <Copy text={step.body} />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
