import { Mail, MessageCircle, Phone, Siren } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Placeholder";

export default function CallToAction({
  title = "Tell us what you need protected.",
  body = "Send the site, the hours and the concern. We will come back with a survey slot and a written deployment plan — not a quote pulled out of the air.",
  eyebrow = "Get in touch",
}: {
  title?: string;
  body?: string;
  eyebrow?: string;
}) {
  return (
    <section
      aria-label="Contact BSM"
      className="relative overflow-hidden border-t border-line bg-void py-24 md:py-32 lg:py-40"
    >
      <span className="grain-layer" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_100%,rgba(200,164,92,0.10)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="flex items-center gap-4" data-reveal="up">
          <span className="h-1.5 w-1.5 bg-brass" />
          <span className="eyebrow">{eyebrow}</span>
        </div>

        <h2 data-split className="mt-10 max-w-4xl text-hero font-semibold text-bone">
          {title}
        </h2>

        <p data-reveal="up" className="mt-8 max-w-xl text-lead text-mist">
          {body}
        </p>

        <div className="mt-12 flex flex-wrap gap-4" data-reveal="up" data-delay="0.1">
          <Button href="/contact">Request Security</Button>
          <Button href={site.contact.whatsappHref} variant="outline">
            WhatsApp
          </Button>
        </div>

        <div className="mt-20 grid gap-px border border-line bg-line md:grid-cols-3" data-stagger>
          {[
            { icon: Phone, k: "Call", v: site.contact.phone, href: site.contact.phoneHref },
            { icon: Mail, k: "Email", v: site.contact.email, href: site.contact.emailHref },
            {
              icon: MessageCircle,
              k: "WhatsApp",
              v: site.contact.whatsapp,
              href: site.contact.whatsappHref,
            },
          ].map((item) => (
            <a
              key={item.k}
              href={item.href}
              data-stagger-item
              className="group relative bg-void p-8 transition-colors duration-500 hover:bg-raise"
            >
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <item.icon className="h-5 w-5 text-brass" strokeWidth={1.25} />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                {item.k}
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-bone">
                <Copy text={item.v} />
              </p>
            </a>
          ))}
        </div>

        <div
          className="mt-px flex flex-col gap-4 border border-t-0 border-line bg-raise p-8 sm:flex-row sm:items-center sm:justify-between"
          data-reveal="up"
        >
          <div className="flex items-start gap-4">
            <Siren className="mt-0.5 h-5 w-5 shrink-0 text-alert" strokeWidth={1.5} />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-alert">
                Urgent requirement
              </p>
              <p className="mt-2 text-sm text-mist">
                For an incident in progress, contact the local police on 112 first, then reach the
                BSM control room.
              </p>
            </div>
          </div>
          <a
            href={`tel:${site.contact.emergencyPhone}`}
            className="shrink-0 border border-alert/60 px-6 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-alert transition-colors duration-300 hover:bg-alert hover:text-void"
          >
            <Copy text={site.contact.emergencyPhone} />
          </a>
        </div>
      </div>
    </section>
  );
}
