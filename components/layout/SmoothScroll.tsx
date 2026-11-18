"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

/** Clearance for the fixed header, so an anchored heading is not hidden by it. */
export function headerOffset() {
  if (typeof window === "undefined") return 0;
  return window.innerWidth >= 768 ? 152 : 136;
}

/**
 * Shared accessor so other components (Back to Top, anchors) can drive scroll.
 * Anything that moves the page must go through here: Lenis keeps its own
 * scroll target and will pull the page back to it, so a native scrollIntoView
 * gets undone and the visitor lands somewhere else entirely.
 */
export function scrollToTarget(
  target: number | string,
  { offset = 0, immediate = false }: { offset?: number; immediate?: boolean } = {},
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.2, offset, immediate });
    return;
  }
  if (typeof window === "undefined") return;
  const el = typeof target === "string" ? document.querySelector(target) : null;
  const base =
    typeof target === "number" ? target : el ? el.getBoundingClientRect().top + window.scrollY : 0;
  window.scrollTo({
    top: base + offset,
    behavior: immediate || prefersReducedMotion() ? "auto" : "smooth",
  });
}

/** Freezes scrolling while an overlay (the mobile menu) owns the screen. */
export function setScrollLocked(locked: boolean) {
  if (typeof document === "undefined") return;
  if (locked) {
    lenisInstance?.stop();
    document.body.style.overflow = "hidden";
  } else {
    lenisInstance?.start();
    document.body.style.overflow = "";
  }
}

/** Hard reset to the top, used between page transitions. */
export function jumpToTop() {
  lenisInstance?.scrollTo(0, { immediate: true });
  if (typeof window !== "undefined") window.scrollTo(0, 0);
}

/**
 * Inertial scrolling, wired into the GSAP ticker so ScrollTrigger and Lenis
 * share a single rAF loop. Disabled outright under reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
