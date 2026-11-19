"use client";

import { useEffect } from "react";

/**
 * Pointer-driven light for every `.card` (and anything marked data-spotlight).
 *
 * One delegated listener for the whole document: as the pointer moves over a
 * card, its position inside that card is written to the card's --mx / --my
 * custom properties, and the CSS in globals.css centres the glow and the lit
 * edge on it. Writes are batched to one per animation frame.
 *
 * It only ever writes CSS custom properties, in response to the visitor's own
 * pointer, so it is safe in the root layout: nothing is written before the
 * page has hydrated. Touch and coarse pointers are skipped entirely.
 */
export default function PointerFX() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let target: HTMLElement | null = null;
    let x = 0;
    let y = 0;

    const flush = () => {
      frame = 0;
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${x - r.left}px`);
      target.style.setProperty("--my", `${y - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".card, [data-spotlight]");
      if (!el) return;
      target = el;
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
