import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { site } from "@/lib/site";
import { gallery, galleryGroups } from "@/lib/media";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import CallToAction from "@/components/sections/CallToAction";
import RevealEngine from "@/components/layout/RevealEngine";

export const metadata: Metadata = {
  title: "Gallery — BSM Security, Goa",
  description:
    "Photography from BSM's security operations across Goa, India: personnel on post, shift briefings, patrol rounds and the sites covered.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | BSM Security, Goa",
    description: "Photography from BSM's security operations across Goa, India.",
    url: `${site.url}/gallery`,
  },
};

/** Heading for each gallery group. */
const GROUP_TITLES: Record<(typeof galleryGroups)[number], string> = {
  Personnel: "The people on post.",
  Operations: "Briefings, rounds and records.",
  Sites: "The environments we cover.",
  Goa: "Where we work.",
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />

      <PageHero
        eyebrow="Gallery"
        index="04"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
        title={
          <>
            Personnel, posts and the{" "}
            <span className="accent-serif text-brass">places</span> we hold.
          </>
        }
        lead="Filed by what the photograph shows. Frames still marked as awaiting a photograph are where BSM's own images go."
      >
        <nav aria-label="Gallery sections" className="mt-14" data-reveal="up">
          <ul className="flex flex-wrap gap-3">
            {galleryGroups.map((group) => (
              <li key={group}>
                <a
                  href={`#${group.toLowerCase()}`}
                  className="inline-block border border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist transition-colors duration-300 hover:border-brass hover:text-brass"
                >
                  {group}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="mt-10 flex items-start gap-3 border-l border-brass/50 pl-4"
          data-reveal="up"
        >
          <Camera className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
          <p className="max-w-2xl text-sm text-dim">
            The photographs currently shown are licensed demo imagery standing in for BSM&apos;s
            own. Drop real files into <code className="font-mono text-brass">/public/media</code>,
            declare them in <code className="font-mono text-brass">lib/media.ts</code> and this page
            picks them up without any layout change.
          </p>
        </div>
      </PageHero>

      {galleryGroups.map((group, groupIndex) => {
        const items = gallery.filter((item) => item.group === group);
        if (!items.length) return null;
        return (
          <Section
            key={group}
            id={group.toLowerCase()}
            label={`Gallery — ${group}`}
            className={groupIndex % 2 === 1 ? "bg-ink" : ""}
          >
            <SectionLabel index={String(groupIndex + 1).padStart(2, "0")}>{group}</SectionLabel>
            <div className="mt-8 flex flex-wrap items-baseline justify-between gap-6">
              <h2 data-split className="text-display font-semibold text-bone">
                {GROUP_TITLES[group]}
              </h2>
              <p
                data-reveal="up"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim"
              >
                {String(items.length).padStart(2, "0")} frames
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {items.map((item, i) => (
                <div
                  key={`${group}-${i}`}
                  data-stagger-item
                  className={item.wide ? "sm:col-span-2" : ""}
                >
                  <MediaFrame
                    shot={item.shot}
                    label={item.label}
                    note={item.brief}
                    figure={item.figure}
                    ratio={item.wide ? "16 / 10" : "4 / 5"}
                    sizes={
                      item.wide
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                  />
                </div>
              ))}
            </div>
          </Section>
        );
      })}

      <CallToAction
        eyebrow="See it in person"
        title="The best photograph is the site itself."
        body="Ask for a site survey and meet the supervisor who would run the deployment. That tells you more than any gallery."
      />
      <RevealEngine />
    </>
  );
}
