import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, services, offices } from "@/lib/site";
import { TransitionLink } from "./PageTransition";
import { Copy } from "@/components/ui/Placeholder";
import { Logo } from "@/components/ui/Logo";
import { RequestSecurityTrigger } from "@/components/ui/RequestSecurityButton";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-5">
              <Logo size={84} />
              <span className="sr-only">BSM Security</span>
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
                <WhatsAppIcon className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <RequestSecurityTrigger className="inline-flex items-center gap-2 bg-brass px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-void transition-colors duration-300 hover:bg-brass-lit" />
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
                <span className="flex flex-col gap-1.5">
                  {site.contact.phones.map((line) => (
                    <a
                      key={line.href}
                      href={line.href}
                      className="text-mist transition-colors duration-300 hover:text-bone"
                    >
                      {line.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <span className="flex flex-col gap-1.5">
                  {site.contact.whatsapps.map((line) => (
                    <a
                      key={line.href}
                      href={line.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-mist transition-colors duration-300 hover:text-bone"
                    >
                      {line.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <a href={offices[0].email.href} className="text-mist hover:text-bone">
                  {offices[0].email.display}
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

        {/* Oversized wordmark: the closing beat of the page.
            The two words are set as explicit lines, and the size is capped
            against the shell's own max width — sized off the viewport alone,
            the last letters of SECURITY ran past the container on wide
            screens and were clipped. */}
        <div className="mt-20 overflow-hidden border-t border-line pt-10">
          <p
            className="select-none font-display text-[17.5vw] font-semibold leading-[0.84] tracking-normal text-white md:text-[17vw] lg:text-[min(16vw,16.5rem)]"
            /* Archivo kerns the TY pair tightly enough at this size that the Y
               tucks under the T. Kerning off, tracking neutral. */
            style={{ fontKerning: "none", fontFeatureSettings: '"kern" 0' }}
            aria-hidden="true"
          >
            <span className="block">BSM</span>
            <span className="block">SECURITY</span>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-dim md:flex-row md:items-center md:justify-between">
          <p>
            © 2013 {site.legalName}. All rights reserved.
          </p>
          <p>India</p>
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
