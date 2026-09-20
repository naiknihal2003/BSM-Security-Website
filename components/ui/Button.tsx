"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { TransitionLink } from "@/components/layout/PageTransition";

type Variant = "primary" | "outline" | "quiet";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-500";

const variants: Record<Variant, string> = {
  primary: "bg-brass text-void hover:text-void",
  outline: "border border-line text-bone hover:text-void",
  quiet: "border border-transparent text-mist hover:text-bone",
};

const wipes: Record<Variant, string> = {
  primary: "bg-brass-lit",
  outline: "bg-brass",
  quiet: "bg-transparent",
};

/**
 * Magnetic CTA. The button drifts toward the pointer and the label trails it
 * slightly, which reads as weight rather than as a gimmick. Pointer-fine only.
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
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
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
      const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.45;
      xTo(x);
      yTo(y);
      lxTo?.(x * 0.4);
      lyTo?.(y * 0.4);
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
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100 ${wipes[variant]}`}
      />
      <span data-btn-label className="relative z-10 flex items-center gap-3">
        {children}
        {icon && (
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            strokeWidth={1.75}
          />
        )}
      </span>
    </>
  );

  const classes = `${base} ${variants[variant]} ${className}`;

  return (
    <span ref={ref} className="inline-block">
      {href ? (
        <TransitionLink href={href} className={classes}>
          {inner}
        </TransitionLink>
      ) : (
        <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={classes}>
          {inner}
        </button>
      )}
    </span>
  );
}
