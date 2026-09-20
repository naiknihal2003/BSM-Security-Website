import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { site, services } from "@/lib/site";
import { TransitionLink } from "./PageTransition";
import { Copy } from "@/components/ui/Placeholder";
import { LogoMark } from "@/components/ui/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <LogoMark className="h-10 w-9 text-brass" />
              <span className="font-display text-3xl font-semibold tracking-[-0.03em]">BSM</span>
            </div>
            <p className="mt-6 max-w-sm text-mist">
              A professional security agency based in Goa, India. Trained personnel, written
              deployment plans and supervision you can verify.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.contact.whatsappHref}
                className="inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mist transition-colors duration-300 hover:border-brass hover:text-brass"
              >
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
                WhatsApp
              </a>
              <TransitionLink
                href="/contact"
                className="inline-flex items-center gap-2 bg-brass px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-void transition-colors duration-300 hover:bg-brass-lit"
              >
                Request Security
              </TransitionLink>
            </div>
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Site</h2>
            <ul className="mt-6 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    className="link-wipe text-sm text-mist transition-colors duration-300 hover:text-bone"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:col-span-2">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Services</h2>
            <ul className="mt-6 space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <TransitionLink
                    href={`/services#${s.slug}`}
                    className="link-wipe text-sm text-mist transition-colors duration-300 hover:text-bone"
                  >
                    {s.title}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Contact</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <a href={site.contact.phoneHref} className="text-mist hover:text-bone">
                  <Copy text={site.contact.phone} />
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <a href={site.contact.emailHref} className="text-mist hover:text-bone">
                  <Copy text={site.contact.email} />
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <address className="not-italic text-mist">
                  <Copy text={site.contact.address.street} />
                  <br />
                  <Copy text={site.contact.address.locality} />, Goa,{" "}
                  <Copy text={site.contact.address.postalCode} />
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark: the closing beat of the page */}
        <div className="mt-20 overflow-hidden border-t border-line pt-10">
          <p
            className="select-none font-display text-[22vw] font-semibold leading-[0.8] tracking-[-0.05em] text-bone/[0.05] lg:text-[16vw]"
            aria-hidden="true"
          >
            BSM SECURITY
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-dim md:flex-row md:items-center md:justify-between">
          <p>
            © {year} <Copy text={site.legalName} />. All rights reserved.
          </p>
          <p>Goa · India</p>
        </div>

        <p className="mt-6 max-w-3xl border-l border-brass/40 pl-4 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-dim">
          Build note — every bracketed item on this site is a placeholder awaiting verified
          information from BSM, and the photography is licensed demo imagery standing in for
          BSM&apos;s own. No awards, certifications, client names, statistics or years of operation
          have been assumed anywhere in this build.
        </p>
      </div>
    </footer>
  );
}
