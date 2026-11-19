"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { processSteps } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Section";
import { Copy } from "@/components/ui/Placeholder";

/**
 * How an engagement runs. A brass rail fills as you move through the steps,
 * and each step's node lights up as the rail reaches it.
 */
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
            end: "bottom 70%",
            scrub: 0.5,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.to(step.querySelector(".process-node"), {
          backgroundColor: "#c8a45c",
          borderColor: "#c8a45c",
          color: "#04060a",
          scale: 1.08,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      aria-label="How we work"
      className="relative border-t border-line bg-ink section-pad"
    >
      <span
        className="section-divider pointer-events-none absolute inset-x-0 top-0"
        aria-hidden="true"
      />
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <SectionLabel index="06">How we work</SectionLabel>
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
          <div
            className="absolute bottom-8 left-[1.375rem] top-8 hidden w-px bg-line md:block"
            aria-hidden="true"
          >
            <div className="process-rail h-full w-px origin-top scale-y-0 bg-gradient-to-b from-brass to-brass-lit" />
          </div>

          <ol className="process-list space-y-4" data-stagger>
            {processSteps.map((step) => (
              <li key={step.index} data-stagger-item className="process-step relative md:pl-20">
                <span
                  className="process-node absolute left-0 top-7 z-10 hidden h-11 w-11 place-items-center rounded-full border border-line bg-ink font-mono text-[11px] tracking-[0.1em] text-brass md:grid"
                  aria-hidden="true"
                >
                  {step.index}
                </span>
                <div className="card card-still group p-7 md:p-8">
                  <span className="index-chip md:hidden">{step.index}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-bone md:mt-0">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-mist">
                    <Copy text={step.body} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
