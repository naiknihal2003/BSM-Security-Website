"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

/**
 * One declarative motion engine for the whole site. Sections opt in with data
 * attributes instead of each one shipping its own effect:
 *
 *   data-split                  headline, revealed line by line from a mask
 *   data-scrub-words            paragraph/headline whose words light up as it
 *                               scrolls through the viewport
 *   data-reveal="up|fade|scale|left|right|blur|pop"
 *                               element rises / fades / settles / slides /
 *                               un-blurs / pops into place
 *   data-delay="0.08"           delays a data-reveal
 *   data-clip                   media frame fades in while its inner
 *                               [data-clip-img] settles from a slight zoom
 *   data-stagger                container whose [data-stagger-item] cascade
 *   data-tilt                   card tilts in 3D toward the pointer (desktop)
 *   data-parallax="0.15"        drifts against the scroll (desktop)
 *   data-zoom                   panel grows from inset to full as it enters
 *   data-rule                   hairline that draws itself across
 *   data-spin="40"              ornament rotating once every N seconds
 *   data-float                  gentle, endless bob (chips, badges)
 *
 * Reveal points sit near the bottom of the screen (94–97%): sections are
 * sized to fit one screen, so anything visible must be allowed to appear.
 *
 * Everything is created inside a gsap.context scoped to the document and
 * reverted when the page unmounts, so no ScrollTrigger outlives its DOM.
 *
 * IMPORTANT: this is rendered by each page, not by the root layout. GSAP
 * writes inline transform/opacity/clip-path onto the nodes it animates, and a
 * layout-level effect runs before the page subtree has hydrated — which meant
 * React found styles it never rendered and threw the whole tree away. Mounting
 * the engine inside the page guarantees its effect runs after that page has
 * hydrated.
 */
export default function RevealEngine() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cleanup: (() => void) | null = null;
    const listeners: (() => void)[] = [];

    // Let the new route paint before measuring anything.
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const splits: SplitText[] = [];

        /* ---- Headlines: masked, line-by-line ------------------------------ */
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 115,
                rotate: 1.5,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 95%", once: true },
              });
            },
          });
          splits.push(split);
          gsap.set(el, { opacity: 1 });
        });

        /* ---- Words that light up with the scroll -------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words", wordsClass: "scrub-word" });
          splits.push(split);
          gsap.fromTo(
            split.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.6 },
            },
          );
        });

        /* ---- Generic reveals ---------------------------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const mode = el.dataset.reveal || "up";
          const delay = parseFloat(el.dataset.delay || "0");
          const to: gsap.TweenVars = {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: mode === "scale" ? 1.6 : mode === "pop" ? 0.9 : 1.1,
            delay,
            ease: mode === "pop" ? "back.out(1.6)" : "expo.out",
            onComplete: () => gsap.set(el, { willChange: "auto" }),
            scrollTrigger: { trigger: el, start: "top 97%", once: true },
          };
          if (mode === "blur") to.filter = "blur(0px)";
          gsap.to(el, to);
        });

        /* ---- Photographs: a soft fade, the image settling from a slight zoom */
        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          const img = el.querySelector<HTMLElement>("[data-clip-img]");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 97%", once: true },
          });
          tl.to(el, { opacity: 1, duration: 1.2, ease: "power2.out" });
          if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
        });

        /* ---- Staggered groups --------------------------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
          if (!items.length) return;
          gsap.fromTo(
            items,
            { opacity: 0, y: 44, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "expo.out",
              stagger: { each: 0.08, from: "start" },
              scrollTrigger: { trigger: group, start: "top 94%", once: true },
            },
          );
        });

        /* ---- Hairline rules that draw themselves -------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.5,
              ease: "expo.inOut",
              scrollTrigger: { trigger: el, start: "top 95%", once: true },
            },
          );
        });

        /* ---- Panels that grow into place ---------------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.92, borderRadius: "3.5rem" },
            {
              scale: 1,
              borderRadius: "2rem",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.6 },
            },
          );
        });

        /* ---- Ornaments ------------------------------------------------------ */
        gsap.utils.toArray<HTMLElement>("[data-spin]").forEach((el) => {
          gsap.to(el, {
            rotate: 360,
            duration: parseFloat(el.dataset.spin || "40"),
            repeat: -1,
            ease: "none",
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
          gsap.to(el, {
            y: -8,
            duration: 2.4 + (i % 3) * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });

        /* ---- Pointer-driven: tilt and parallax (desktop only) ------------- */
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine)", () => {
          gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
            gsap.set(el, { transformPerspective: 900 });
            const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
            const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
            const strength = parseFloat(el.dataset.tilt || "6") || 6;
            const onMove = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              ry(px * strength);
              rx(-py * strength);
            };
            const onLeave = () => {
              rx(0);
              ry(0);
            };
            el.addEventListener("pointermove", onMove);
            el.addEventListener("pointerleave", onLeave);
            listeners.push(() => {
              el.removeEventListener("pointermove", onMove);
              el.removeEventListener("pointerleave", onLeave);
            });
          });
        });

        mm.add("(min-width: 1024px)", () => {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const strength = parseFloat(el.dataset.parallax || "0.12");
            gsap.fromTo(
              el,
              { yPercent: -strength * 100 },
              {
                yPercent: strength * 100,
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest("[data-parallax-scope]") || el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.4,
                },
              },
            );
          });
        });

        return () => {
          splits.forEach((s) => s.revert());
          mm.revert();
        };
      });

      // Type metrics settle after webfonts land; re-measure so triggers are true.
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      cleanup = () => {
        listeners.forEach((off) => off());
        ctx.revert();
      };
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, []);

  return null;
}
