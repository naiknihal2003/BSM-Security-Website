"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import type { Shortcut } from "@/lib/navigation";
import { headerOffset, scrollToTarget } from "./SmoothScroll";

/**
 * Shortcut bar for inner pages. Sticks under the floating navbar once the page
 * hero has scrolled past, lists the page's sections, and follows the reader:
 * the section in view is highlighted by a brass pill that slides to it, the
 * strip scrolls itself to keep that pill visible on narrow screens, and a
 * hairline along the bottom shows how far through the page you are.
 *
 * The bar is only as wide as its shortcuts: the nav sizes to its content
 * and caps at the page gutter, so a page with four sections does not draw a
 * rule across an empty half-screen. Past that width the strip scrolls
 * instead of stretching.
 *
 * Every target is an element with the matching id and `data-anchor`.
 */
export default function SubNav({ items, label }: { items: Shortcut[]; label: string }) {
  const pathname = usePathname();
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [stuck, setStuck] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  /* Scrollspy: the active section is the last one whose top has passed the
     line just under the chrome. Read on scroll, batched per frame. */
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = headerOffset() + 8;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = item.id;
      }
      setActive(current);

      // Progress through the stretch of page the shortcuts cover.
      const first = document.getElementById(items[0]?.id ?? "");
      if (barRef.current && first) {
        const start = first.getBoundingClientRect().top + window.scrollY - line;
        const end = document.documentElement.scrollHeight - window.innerHeight;
        const p = end > start ? (window.scrollY - start) / (end - start) : 0;
        barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items, pathname]);

  /* Glass only once it is actually stuck under the navbar. */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      rootMargin: `-${headerOffset()}px 0px 0px 0px`,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  /* Slide the pill to the active item and keep it in view. */
  useEffect(() => {
    const strip = stripRef.current;
    const pill = pillRef.current;
    const el = strip?.querySelector<HTMLElement>(`[data-id="${CSS.escape(active)}"]`);
    if (!strip || !pill || !el) return;
    const props = { x: el.offsetLeft, width: el.offsetWidth, opacity: 1 };
    if (prefersReducedMotion()) gsap.set(pill, props);
    else gsap.to(pill, { ...props, duration: 0.55, ease: "expo.out" });

    const left = el.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2;
    strip.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [active]);

  /* Re-seat the pill whenever the strip's layout changes — webfonts arriving,
     a resize, a zoom — so it never sits off the active label. */
  useEffect(() => {
    const strip = stripRef.current;
    const pill = pillRef.current;
    if (!strip || !pill) return;
    const place = () => {
      const el = strip.querySelector<HTMLElement>(`[data-id="${CSS.escape(active)}"]`);
      if (el) gsap.set(pill, { x: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    };
    const ro = new ResizeObserver(place);
    ro.observe(strip);
    strip.querySelectorAll("li").forEach((li) => ro.observe(li));
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [active]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <div
        ref={rootRef}
        data-subnav
        className="sticky z-[90] -mt-px"
        style={{ top: "calc(var(--nav-h) + 0.5rem)" }}
      >
        <div className="shell">
          <nav
            aria-label={label}
            className={`relative flex h-[var(--subnav-h)] w-fit max-w-full items-center gap-3 overflow-hidden rounded-full pl-2 pr-2 transition-[background-color,border-color,box-shadow] duration-500 ${
              stuck
                ? "glass shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]"
                : "border border-white/[0.06] bg-white/[0.02]"
            }`}
          >
            <span className="hidden shrink-0 items-center gap-2 rounded-full bg-brass/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brass md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
              Jump to
            </span>
            <ul ref={stripRef} className="no-scrollbar relative flex min-w-0 items-center gap-1 overflow-x-auto">
              <span
                ref={pillRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 h-9 -translate-y-1/2 rounded-full bg-brass opacity-0 shadow-[0_8px_24px_-10px_rgba(200,164,92,0.8)]"
              />
              {items.map((item) => {
                const on = item.id === active;
                return (
                  <li key={item.id} data-id={item.id} className="relative shrink-0">
                    <a
                      href={`#${item.id}`}
                      aria-current={on ? "location" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        setActive(item.id);
                        // The page's own hero sits at the very top: go there.
                        const el = document.getElementById(item.id);
                        const atTop = el ? el.getBoundingClientRect().top + window.scrollY < headerOffset() : false;
                        if (atTop) scrollToTarget(0);
                        else scrollToTarget(`#${item.id}`, { offset: -headerOffset() });
                        window.history.replaceState(null, "", `#${item.id}`);
                      }}
                      className={`relative block whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                        on ? "text-void" : "text-mist hover:text-bone"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px overflow-hidden" aria-hidden="true">
              <span ref={barRef} className="block h-full origin-left scale-x-0 bg-gradient-to-r from-brass/0 via-brass to-brass-lit" />
            </span>
          </nav>
        </div>
      </div>
    </>
  );
}
