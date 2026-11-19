"use client";

import { useEffect, useState } from "react";
import { MapPin, MousePointerClick, Navigation } from "lucide-react";

/**
 * Google Maps embed that does not hijack the page's scroll.
 *
 * An embedded map swallows wheel and touch gestures, so scrolling down the page
 * stops dead (and stutters) the moment the pointer crosses it. Here the map is
 * inert until it is clicked or tapped; leaving it makes it inert again. The
 * address and directions sit on a bar over the map, always clickable.
 */
export function MapEmbed({
  src,
  title,
  address,
  directionsHref,
  openHref,
  className = "",
}: {
  src: string;
  title: string;
  address: string;
  directionsHref: string;
  openHref: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  /* Hidden until Google's tiles arrive, so there is no white flash. */
  const [loaded, setLoaded] = useState(false);
  /* The iframe can finish loading before hydration, when onLoad is missed —
     never leave the map hidden because of that. */
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className={`relative isolate overflow-hidden rounded-[1.25rem] border border-white/10 bg-surface ${className}`}
      onMouseLeave={() => setActive(false)}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        /* Night styling to match the site: inverted, hue-turned back so
           water stays blue, desaturated, with the contrast eased so street
           names remain readable. */
        className={`absolute inset-0 h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_grayscale(0.55)_contrast(0.92)_brightness(0.95)] transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${active ? "" : "pointer-events-none"}`}
      />
      {/* A faint brass wash and vignette tie the map to the theme. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(4,6,10,0.55)_100%)] mix-blend-normal"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-brass/[0.06] mix-blend-color"
      />
      {!loaded && (
        <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span className="dot-field absolute inset-0" />
          <span className="relative h-8 w-8 animate-spin rounded-full border-2 border-brass/20 border-t-brass" />
        </span>
      )}

      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 z-10 flex cursor-pointer items-start justify-end p-4"
          aria-label={`Use the map: ${title}`}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            <MousePointerClick className="h-3.5 w-3.5 text-brass" strokeWidth={1.75} />
            Click to use the map
          </span>
        </button>
      )}

      {/* Address and directions: always on top, always clickable. */}
      <div className="absolute inset-x-3 bottom-3 z-20 flex flex-col gap-3 rounded-xl border border-white/10 bg-void/90 p-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-3.5">
        <p className="flex min-w-0 items-start gap-2.5 text-[13px] leading-snug text-bone/90">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.75} />
          <span className="line-clamp-2">{address}</span>
        </p>
        <div className="flex shrink-0 gap-2">
          <a
            href={directionsHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-void transition-colors hover:bg-brass-lit"
          >
            <Navigation className="h-3.5 w-3.5" strokeWidth={2} />
            Directions
          </a>
          <a
            href={openHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-white/15 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors hover:border-brass hover:text-brass"
          >
            Open map
          </a>
        </div>
      </div>
    </div>
  );
}
