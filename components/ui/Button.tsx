"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { TransitionLink } from "@/components/layout/PageTransition";

type Variant = "primary" | "outline" | "quiet";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  quiet: "btn-quiet",
};

/** The arrow that slips out top-right while its twin slides in. */
export function ArrowSwap() {
  return (
    <span className="btn-arrow" aria-hidden="true">
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
    </span>
  );
}

/**
 * Magnetic pill CTA. The button drifts toward the pointer and the label trails
 * it slightly, which reads as weight rather than as a gimmick; on hover a
 * liquid fill rises from below (see .btn in globals.css). Pointer-fine only.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  icon = true,
  type,
  onClick,
  disabled,
  external,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  /** Opens in a new tab (WhatsApp, maps). */
  external?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = el.firstElementChild as HTMLElement | null;
    const label = el.querySelector<HTMLElement>("[data-btn-label]");
    if (!target) return;

    const xTo = gsap.quickTo(target, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.6, ease: "power3.out" });
    const lxTo = label && gsap.quickTo(label, "x", { duration: 0.8, ease: "power3.out" });
    const lyTo = label && gsap.quickTo(label, "y", { duration: 0.8, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.3;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
      xTo(x);
      yTo(y);
      lxTo?.(x * 0.35);
      lyTo?.(y * 0.35);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
      lxTo?.(0);
      lyTo?.(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([target, label]);
    };
  }, []);

  const inner = (
    <>
      <span className="btn-fill" aria-hidden="true" />
      <span data-btn-label className="relative flex items-center gap-3">
        {children}
        {icon && <ArrowSwap />}
      </span>
    </>
  );

  const classes = `btn ${variants[variant]} ${className}`;

  return (
    <span ref={ref} className="inline-block">
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noreferrer" className={classes}>
            {inner}
          </a>
        ) : (
          <TransitionLink href={href} className={classes}>
            {inner}
          </TransitionLink>
        )
      ) : (
        <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={classes}>
          {inner}
        </button>
      )}
    </span>
  );
}
