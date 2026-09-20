"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A brief entrance, shown once per browsing session. It waits on the webfonts
 * (capped, so a slow network never holds the page hostage) and then lifts.
 * Skipped entirely for repeat views and for reduced-motion visitors.
 */
export default function Intro() {
  const [active, setActive] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (sessionStorage.getItem("bsm-intro") === "seen") return;
    sessionStorage.setItem("bsm-intro", "seen");
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active || !root.current) return;
    const el = root.current;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setActive(false);
        },
      });
      tl.fromTo(
        ".intro-mark",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
      )
        .fromTo(
          ".intro-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.85, ease: "power2.inOut" },
          "-=0.35",
        )
        .to(".intro-mark", { opacity: 0, duration: 0.3, ease: "power2.in" }, "+=0.05")
        .to(el, {
          yPercent: -100,
          duration: 0.85,
          ease: "expo.inOut",
        });
    }, el);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[125] grid place-items-center bg-void"
    >
      <div className="w-[min(22rem,70vw)] text-center">
        <p className="intro-mark font-display text-4xl font-semibold tracking-[-0.03em] text-bone">
          BSM
        </p>
        <p className="intro-mark mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
          Security · Goa
        </p>
        <div className="intro-rule mt-6 h-px w-full origin-left bg-brass" />
      </div>
    </div>
  );
}
