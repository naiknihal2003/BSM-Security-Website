"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Logo } from "@/components/ui/Logo";
import { TransitionLink } from "./PageTransition";
import { RequestSecurityTrigger } from "@/components/ui/RequestSecurityButton";
import { setScrollLocked } from "./SmoothScroll";

export default function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Transparent over the hero, solid once the page has moved. */
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu on route change. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Menu: scroll lock, escape to close, focus handed to the panel and back. */
  useEffect(() => {
    setScrollLocked(open);
    if (!open) {
      toggleRef.current?.focus({ preventScroll: true });
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Staggered entrance for the mobile panel. */
  useEffect(() => {
    if (!open || !menuRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          ".menu-sheet",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "expo.inOut" },
        )
        .fromTo(
          ".menu-item",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.07, ease: "expo.out" },
          "-=0.35",
        )
        .fromTo(".menu-foot", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.4");
    }, menuRef);
    return () => ctx.revert();
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:bg-brass focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-void"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid || open
            ? "border-b border-line bg-void/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="shell flex h-28 items-center justify-between md:h-32" aria-label="Primary">
          <TransitionLink href="/" aria-label="BSM — home" className="relative z-10 flex items-center">
            <Logo size={104} priority className="transition-opacity duration-300 hover:opacity-85" />
          </TransitionLink>

          <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
            {site.nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative block py-2 font-mono text-[14px] uppercase tracking-[0.14em] text-mist transition-colors duration-300 hover:text-bone aria-[current=page]:text-bone"
                  >
                    <span
                      className={`absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 bg-brass transition-opacity duration-300 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                  </TransitionLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={site.contact.phoneHref}
              className="hidden items-center gap-2 border border-brass/60 bg-brass/10 px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-brass transition-colors duration-300 hover:border-brass hover:bg-brass/20 md:inline-flex lg:hidden xl:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
              {site.contact.phone}
            </a>
            <RequestSecurityTrigger className="hidden bg-brass px-6 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-void transition-colors duration-300 hover:bg-brass-lit lg:inline-block" />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 flex h-11 w-11 items-center justify-center border border-line text-bone transition-colors duration-300 hover:border-brass lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-0 z-[99] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="menu-sheet absolute inset-0 bg-ink">
            <span className="grain-layer" aria-hidden="true" />
            <div className="shell flex h-full flex-col justify-between pb-10 pt-36">
              <ul>
                {site.nav.map((item, i) => {
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li key={item.href} className="overflow-hidden border-b border-line">
                      <TransitionLink
                        href={item.href}
                        onNavigate={() => setOpen(false)}
                        className="menu-item flex items-baseline gap-4 py-5"
                      >
                        <span className="font-mono text-[11px] text-dim">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-title font-semibold ${active ? "text-brass" : "text-bone"}`}
                        >
                          {item.label}
                        </span>
                      </TransitionLink>
                    </li>
                  );
                })}
              </ul>

              <div className="menu-foot space-y-4">
                <a
                  href={site.contact.phoneHref}
                  className="block font-mono text-[11px] uppercase tracking-[0.18em] text-mist"
                >
                  {site.contact.phone}
                </a>
                <a
                  href={site.contact.emailHref}
                  className="block font-mono text-[11px] uppercase tracking-[0.18em] text-mist"
                >
                  {site.contact.email}
                </a>
                <RequestSecurityTrigger
                  onActivate={() => setOpen(false)}
                  className="mt-4 block w-full bg-brass px-6 py-4 text-center font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-void"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
