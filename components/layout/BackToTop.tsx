"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "./SmoothScroll";

const RADIUS = 26;
const PERIMETER = 2 * Math.PI * RADIUS; // circular progress ring

/**
 * Appears once the page has been scrolled, with a circular progress ring that
 * traces how much of the page is behind you.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setVisible(window.scrollY > 600);
      if (ring.current) {
        ring.current.style.strokeDashoffset = String(PERIMETER * (1 - progress));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-6 right-6 z-[105] grid h-14 w-14 place-items-center rounded-full border border-line bg-void/80 text-mist backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-brass hover:text-brass md:bottom-10 md:right-10 ${
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90 text-brass"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
      >
        <circle
          ref={ring}
          cx="28"
          cy="28"
          r={RADIUS}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={PERIMETER}
          strokeDashoffset={PERIMETER}
        />
      </svg>
      <ArrowUp
        className="relative h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
        strokeWidth={1.75}
      />
    </button>
  );
}
