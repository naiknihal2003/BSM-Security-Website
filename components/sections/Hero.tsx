"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Copy } from "@/components/ui/Placeholder";
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
        .to(".hero-meta", { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, "-=0.8")
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
      className="relative overflow-hidden bg-void pt-28 md:pt-36"
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
                <span className="hero-line block">Security You</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line block">
                  Can <span className="accent-serif text-brass">Trust.</span>
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line block text-mist">Protection You</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line block text-mist">Can Count On.</span>
              </span>
            </h1>

            <p className="hero-sub mt-8 max-w-xl text-lead text-mist">
              BSM provides trained security personnel and managed protection across Goa — from
              beachfront resorts and gated communities to corporate offices, industrial estates
              and events. Local presence, written deployment plans, supervision you can verify.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <span className="hero-cta inline-block">
                <Button href="/contact">Request Security</Button>
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

      {/* Meta strip: the technical register that runs through the whole site */}
      <div className="relative border-t border-line">
        <div className="shell grid grid-cols-2 divide-line font-mono text-[10px] uppercase tracking-[0.18em] text-dim md:grid-cols-4 md:divide-x">
          {[
            { k: "Based in", v: "Goa, India" },
            { k: "Coverage", v: "North & South Goa" },
            { k: "Control room", v: site.contact.emergencyPhone },
            { k: "Enquiries", v: site.contact.phone },
          ].map((item, i) => (
            <div key={item.k} className={`hero-meta py-6 ${i % 2 === 0 ? "pr-4" : "pl-4 md:pl-6"} md:px-6 md:first:pl-0`}>
              <p className="text-dim/60">{item.k}</p>
              <p className="mt-2 text-bone/90">
                <Copy text={item.v} />
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-cue pointer-events-none absolute bottom-28 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Scroll</span>
        <ArrowDown className="hero-cue-arrow h-4 w-4 text-brass" strokeWidth={1.5} />
      </div>
    </section>
  );
}
