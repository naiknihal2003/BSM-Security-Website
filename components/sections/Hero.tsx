"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { RequestSecurityButton } from "@/components/ui/RequestSecurityButton";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { media } from "@/lib/media";

/**
 * The hero is the one place the site spends its full motion budget: a single
 * choreographed entrance, then it gets out of the way.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "expo.out" } });

      // The CSS gate parks the lines at translateY(118%). GSAP reads that
      // computed transform as pixels, so animating yPercent alone would leave
      // the pixel offset in place and the headline stuck inside its mask.
      // Restating the start state in GSAP's own units costs nothing visually
      // and makes the tween land at zero.
      tl.set(".hero-line", { yPercent: 118, y: 0 })
        .to(".hero-rule", { scaleX: 1, duration: 1.2, ease: "expo.inOut" })
        .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.8 }, "-=0.9")
        .to(".hero-line", { yPercent: 0, duration: 1.3, stagger: 0.09 }, "-=0.7")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 1 }, "-=0.85")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.75")
        .to(
          ".hero-media",
          { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.inOut" },
          "-=1.4",
        )
        .to(".hero-cue", { opacity: 1, duration: 0.6 }, "-=0.5");

      // The cue keeps breathing until the visitor starts scrolling.
      gsap.to(".hero-cue-arrow", {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-void pt-36 md:pt-44"
      aria-label="Introduction"
    >
      <span className="grain-layer" aria-hidden="true" />

      {/* Column rules: the grid made visible, faintly */}
      <div
        className="pointer-events-none absolute inset-0 grid-veil opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(70%_60%_at_18%_0%,rgba(200,164,92,0.09)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="hero-rule h-px w-full origin-left bg-line" />

        <div className="grid gap-12 pb-16 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          {/* Headline block */}
          <div className="lg:col-span-7">
            <div className="hero-eyebrow flex items-center gap-4">
              <span className="h-1.5 w-1.5 bg-brass" />
              <span className="eyebrow">Security Agency · Goa, India</span>
            </div>

            <h1 className="mt-8 text-hero font-semibold text-bone">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line block">Protecting industries.</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line block text-mist">Securing Businesses.</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line block">
                  Building <span className="accent-serif text-brass">Trust.</span>
                </span>
              </span>
            </h1>

            <p className="hero-sub mt-8 max-w-xl text-lead text-mist">
              BSM provides trained security personnel and managed protection across India — from
              beachfront resorts and gated communities to corporate offices, industrial estates
              and events. Local presence, written deployment plans, supervision you can verify.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <span className="hero-cta inline-block">
                <RequestSecurityButton />
              </span>
              <span className="hero-cta inline-block">
                <Button href="/contact#enquiry" variant="outline">
                  Contact Us
                </Button>
              </span>
            </div>
          </div>

          {/* Media column */}
          <div className="lg:col-span-5">
            <div className="hero-media">
              <MediaFrame
                shot={media.heroDeployment}
                figure="Fig. 01 / Deployment"
                ratio="4 / 5"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-cue pointer-events-none absolute bottom-28 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Scroll</span>
        <ArrowDown className="hero-cue-arrow h-4 w-4 text-brass" strokeWidth={1.5} />
      </div>
    </section>
  );
}
