"use client";

/**
 * MAINTENANCE NOTICE — the whole feature lives in this one file.
 *
 *   Show it ........ nothing to do; it is on while this file exists.
 *   Hide it ........ set ENABLED to false below, or
 *   Remove it ...... delete the folder  app/@maintenance  — that is all.
 *                    app/layout.tsx renders whatever this slot provides, and
 *                    renders nothing when the slot is not there, so no other
 *                    file needs editing and nothing is left behind.
 *
 * While it is up: the page behind is heavily blurred and cannot be scrolled,
 * clicked or tabbed into (it is marked `inert`), and the notice cannot be
 * dismissed — visitors are pointed to phone and WhatsApp instead. When the
 * notice goes away for any reason, scrolling and focus are restored.
 *
 * Contact details come from lib/site.ts, so they are never retyped here.
 */

import { useEffect, useRef } from "react";
import { Clock, Phone, Wrench } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { setScrollLocked } from "@/components/layout/SmoothScroll";

/** Master switch: false hides the notice without deleting anything. */
const ENABLED = true;

export default function MaintenanceNotice() {
  const root = useRef<HTMLDivElement>(null);

  /* ---- Lock the page while the notice is up -------------------------------- */
  useEffect(() => {
    if (!ENABLED) return;
    const overlay = root.current;
    if (!overlay) return;

    // Stop Lenis and freeze the body.
    setScrollLocked(true);

    // Everything else on the page becomes inert: no clicks, no focus, no
    // screen-reader access to content that is hidden behind the notice.
    const others = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== overlay,
    );
    const previous = others.map((el) => el.hasAttribute("inert"));
    others.forEach((el) => el.setAttribute("inert", ""));

    // Other parts of the site (the first-visit intro) release the body lock
    // when they finish; hold it for as long as the notice is showing.
    const hold = new MutationObserver(() => {
      if (document.body.style.overflow !== "hidden") document.body.style.overflow = "hidden";
    });
    hold.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    // Keyboard: keep focus inside the notice.
    const first = overlay.querySelector<HTMLElement>("a[href]");
    first?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = overlay.querySelectorAll<HTMLElement>("a[href]");
      if (!focusable.length) return;
      const a = focusable[0];
      const z = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      hold.disconnect();
      others.forEach((el, i) => {
        if (!previous[i]) el.removeAttribute("inert");
      });
      setScrollLocked(false);
    };
  }, []);

  /* ---- Entrance --------------------------------------------------------------- */
  useEffect(() => {
    if (!ENABLED || !root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".mn-scrim", { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" })
        .fromTo(
          ".mn-panel",
          { opacity: 0, y: 24, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          0.15,
        )
        .fromTo(
          ".mn-item",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 },
          0.35,
        );
    }, root);
    return () => ctx.revert();
  }, []);

  if (!ENABLED) return null;

  const { contact } = site;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mn-title"
      aria-describedby="mn-text"
    >
      {/* The page behind: darkened and blurred heavily enough that nothing on it
          can be read, while its colours still show through. */}
      <div
        className="mn-scrim absolute inset-0 bg-void/70 [-webkit-backdrop-filter:blur(34px)_saturate(130%)] [backdrop-filter:blur(34px)_saturate(130%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(200,164,92,0.14)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div
        data-lenis-prevent
        className="mn-panel relative max-h-full w-full max-w-2xl overflow-y-auto overscroll-contain rounded-[1.75rem] border border-brass/25 bg-ink/90 p-5 shadow-[0_50px_140px_-40px_rgba(0,0,0,1)] sm:p-9"
      >
        <span className="grain-layer" aria-hidden="true" />
        <div className="relative">
          <div className="mn-item flex items-center justify-between gap-4">
            <Logo size={72} imgClassName="w-14 sm:w-[4.5rem]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/[0.08] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
              <Wrench className="h-3.5 w-3.5" strokeWidth={1.75} />
              Under maintenance
            </span>
          </div>

          <h2
            id="mn-title"
            className="mn-item mt-5 text-[clamp(1.6rem,4.5vw,2.6rem)] sm:mt-7 font-semibold leading-[1.05] tracking-[-0.03em] text-bone"
          >
            Our website is being <span className="accent-serif text-brass">updated</span>.
          </h2>
          <p id="mn-text" className="mn-item mt-3 max-w-xl text-[0.95rem] leading-relaxed text-mist sm:mt-4 sm:text-base">
            We are working on the BSM Security Agency website and it will be back shortly. For
            security services or any enquiry in the meantime, please call or WhatsApp us directly.
          </p>

          <div className="mt-5 grid gap-3 sm:mt-7 sm:grid-cols-2">
            {/* Call */}
            <div className="mn-item rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="icon-tile !h-10 !w-10 !rounded-xl">
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Call</p>
              </div>
              <ul className="mt-2.5 space-y-1.5 sm:mt-3 sm:space-y-2">
                {contact.phones.map((line, i) => (
                  <li key={line.href}>
                    <a
                      href={line.href}
                      className={`flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-[15px] font-semibold transition-colors duration-300 sm:py-3 ${
                        i === 0
                          ? "bg-brass text-void hover:bg-brass-lit"
                          : "border border-white/10 text-bone hover:border-brass hover:text-brass"
                      }`}
                    >
                      {line.display}
                      <Phone className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp */}
            <div className="mn-item rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="icon-tile !h-10 !w-10 !rounded-xl">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">WhatsApp</p>
              </div>
              <ul className="mt-2.5 space-y-1.5 sm:mt-3 sm:space-y-2">
                {contact.whatsappByOffice.map((line) => (
                  <li key={line.href}>
                    <a
                      href={line.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group block rounded-xl border border-[#25d366]/30 bg-[#25d366]/[0.07] px-4 py-2.5 transition-colors duration-300 hover:border-[#25d366] hover:bg-[#25d366]/15"
                    >
                      <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[#25d366]">
                        {line.label}
                      </span>
                      <span className="mt-0.5 flex items-center justify-between gap-3 text-[15px] font-semibold text-bone">
                        {line.display}
                        <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25d366]" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mn-item mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-white/[0.06] pt-4 text-[13px] text-dim sm:mt-6 sm:pt-5">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-brass" strokeWidth={1.75} />
              {contact.hours[0].days}, {contact.hours[0].time}
            </span>
            <span>Services available {contact.servicesAvailable}</span>
            <a href={contact.emailHref} className="text-mist transition-colors hover:text-brass">
              {contact.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
