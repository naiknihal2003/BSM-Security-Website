import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-void pt-32">
      <span className="grain-layer" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 grid-veil opacity-30" aria-hidden="true" />

      <div className="shell relative grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4">
            <span className="h-1.5 w-1.5 bg-alert" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-alert">
              Error 404
            </span>
          </div>

          <h1 className="mt-10 text-mega font-semibold leading-[0.85] tracking-[-0.04em] text-bone">
            Post
            <br />
            <span className="text-mist">unmanned.</span>
          </h1>

          <p className="mt-10 max-w-md text-lead text-mist">
            This page does not exist, or it has moved. Nothing has gone wrong with your
            deployment — only with this address.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/">Back to home</Button>
            <Button href="/contact" variant="outline">
              Contact BSM
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <nav aria-label="Site sections" className="border-t border-line">
            {site.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-4 border-b border-line py-5 transition-colors duration-500 hover:text-brass"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl font-semibold text-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-brass">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
