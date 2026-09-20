"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A precision reticle rather than a novelty cursor: a 4px dot that tracks
 * exactly, and a square ring that lags behind and opens over anything
 * interactive. Desktop pointers only, and never under reduced-motion.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    document.body.classList.add("has-cursor");
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dx = gsap.quickTo(dotEl, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dotEl, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(ringEl, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ringEl, "y", { duration: 0.5, ease: "power3.out" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);

      const interactive = (e.target as HTMLElement)?.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor='hover']",
      );
      gsap.to(ringEl, {
        scale: interactive ? 1.9 : 1,
        borderColor: interactive ? "#c8a45c" : "#3a4350",
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onLeave = () => gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.body.classList.remove("has-cursor");
      gsap.killTweensOf([dotEl, ringEl]);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[115] hidden md:block" aria-hidden="true">
      <div ref={dot} className="fixed left-0 top-0 h-1 w-1 bg-brass opacity-0" />
      <div ref={ring} className="fixed left-0 top-0 h-8 w-8 border border-[#3a4350] opacity-0" />
    </div>
  );
}
