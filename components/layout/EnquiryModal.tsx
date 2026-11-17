"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import EnquiryForm from "@/components/sections/EnquiryForm";
import { setScrollLocked } from "./SmoothScroll";

type EnquiryContextValue = { open: () => void; close: () => void; isOpen: boolean };

const EnquiryContext = createContext<EnquiryContextValue>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useEnquiry() {
  return useContext(EnquiryContext);
}

/**
 * Request Security enquiry drawer. The form itself lives in
 * components/sections/EnquiryForm.tsx and is shared with the contact page, so
 * both routes stay identical: contact number (required) and enquiry
 * (optional), delivered by email server-side.
 */
export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <EnquiryContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && <EnquiryPanel onClose={close} />}
    </EnquiryContext.Provider>
  );
}

function EnquiryPanel({ onClose }: { onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  /* Scroll lock, escape to close, focus handed to the field and handed back. */
  useEffect(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(
      () =>
        panel.current
          ?.querySelector<HTMLInputElement>('input[type="tel"]')
          ?.focus({ preventScroll: true }),
      prefersReducedMotion() ? 0 : 260,
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      setScrollLocked(false);
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  /* Entrance, in the same register as the mobile menu. */
  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(".enquiry-scrim", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .fromTo(
          ".enquiry-panel",
          { yPercent: 8, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, ease: "expo.out" },
          "-=0.25",
        )
        .fromTo(
          ".enquiry-row",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "expo.out" },
          "-=0.4",
        );
    }, root);
    return () => ctx.revert();
  }, []);

  /* Keep tab focus inside the dialog. */
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = el.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[128] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close enquiry form"
        className="enquiry-scrim absolute inset-0 w-full cursor-default bg-void/80 backdrop-blur-sm"
        tabIndex={-1}
      />

      <div
        ref={panel}
        data-lenis-prevent
        className="enquiry-panel relative z-10 max-h-[92dvh] w-full overflow-y-auto border-2 border-brass/55 bg-ink sm:max-w-lg"
      >
        <span className="grain-layer" aria-hidden="true" />

        <div className="relative p-6 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div className="enquiry-row">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-brass" />
                <span className="eyebrow">Request security</span>
              </div>
              <h2
                id="enquiry-title"
                className="mt-5 font-display text-title font-semibold text-bone"
              >
                Leave a number. We will call back.
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="-mr-1 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-line text-mist transition-colors duration-300 hover:border-brass hover:text-brass"
            >
              <span className="sr-only">Close</span>
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="mt-8">
            <EnquiryForm idPrefix="drawer" rowClass="enquiry-row">
              <button
                type="button"
                onClick={onClose}
                className="bg-brass px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-void transition-colors duration-300 hover:bg-brass-lit"
              >
                Close
              </button>
            </EnquiryForm>
          </div>
        </div>
      </div>
    </div>
  );
}
