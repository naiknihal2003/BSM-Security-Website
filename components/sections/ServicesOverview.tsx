"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { services } from "@/lib/site";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/layout/PageTransition";

/**
 * The services index reads as a contents page. On desktop a framed preview
 * tracks the pointer as you move down the list; on touch it is simply a list,
 * which is what a list should be.
 */
export default function ServicesOverview() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = preview.current;
    const list = root.current;
    if (!el || !list || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches)
      return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.75, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.75, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX + 32);
      yTo(e.clientY - 170);
    };
    list.addEventListener("pointermove", onMove);
    return () => {
      list.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(el);
    };
  }, []);

  useEffect(() => {
    const el = preview.current;
    if (!el || prefersReducedMotion()) return;
    gsap.to(el, {
      opacity: active === null ? 0 : 1,
      scale: active === null ? 0.94 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <Section id="services" label="Services">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel index="04">What we do</SectionLabel>
          <h2 data-split className="mt-8 text-display font-semibold text-bone">
            Security services, matched to the site.
          </h2>
        </div>
        <div className="flex items-end lg:col-span-6 lg:col-start-7">
          <p data-reveal="up" className="text-lead text-mist">
            Seven areas of deployment. Each one starts from the same place — a survey of your site
            and a written plan — and ends with personnel who know that specific gate, lobby or
            perimeter.
          </p>
        </div>
      </div>

      <div ref={root} data-stagger className="mt-16 border-t border-line">
        {services.map((service, i) => (
          <TransitionLink
            key={service.slug}
            href={`/services#${service.slug}`}
            data-stagger-item
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className="group relative grid grid-cols-12 items-baseline gap-4 border-b border-line py-7 transition-colors duration-500 md:py-9"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-raise transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100" />
            <span className="relative col-span-2 font-mono text-[11px] tracking-[0.2em] text-dim md:col-span-1">
              {service.index}
            </span>
            <span className="relative col-span-10 md:col-span-4">
              <span className="block font-display text-2xl font-semibold tracking-[-0.02em] text-bone transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-3xl">
                {service.title}
              </span>
            </span>
            <span className="relative col-span-10 col-start-3 text-sm leading-relaxed text-mist md:col-span-6 md:col-start-6">
              {service.short}
            </span>
            <span className="relative col-span-1 hidden justify-end md:flex">
              <ArrowUpRight
                className="h-5 w-5 text-dim transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brass"
                strokeWidth={1.5}
              />
            </span>
          </TransitionLink>
        ))}
      </div>

      <div className="mt-14" data-reveal="up">
        <Button href="/services" variant="outline">
          All services
        </Button>
      </div>

      {/* Pointer-tracked preview */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-[340px] w-[260px] scale-95 opacity-0 lg:block"
      >
        <div className="relative h-full w-full border border-line bg-[radial-gradient(120%_90%_at_50%_0%,#131b27_0%,#070a10_70%)]">
          <svg className="absolute inset-0 h-full w-full text-line" aria-hidden="true">
            <defs>
              <pattern id="preview-grid" width="26" height="26" patternUnits="userSpaceOnUse">
                <path d="M26 0H0V26" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#preview-grid)" />
          </svg>
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
              {active !== null ? services[active].index : "00"}
            </span>
            <div>
              <p className="font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-bone">
                {active !== null ? services[active].title : ""}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                {active !== null ? services[active].environments.slice(0, 2).join(" · ") : ""}
              </p>
            </div>
          </div>
          <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-brass" />
          <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-brass" />
        </div>
      </div>
    </Section>
  );
}
