/**
 * Search and sharing metadata, in one place.
 *
 * Every page builds its <head> through pageMetadata(), so canonical URLs,
 * Open Graph, Twitter cards and keywords stay consistent and complete. All
 * wording here is drawn from facts already on the site (lib/site, lib/about):
 * nothing is claimed in search results that the pages themselves do not say.
 */

import type { Metadata } from "next";
import { site } from "./site";

export const brand = {
  name: "BSM Security Agency",
  short: "BSM Security",
  /** Shown after every page title: "Services | BSM Security Agency, Goa". */
  suffix: "BSM Security Agency, Goa",
};

/** Search terms the whole site is relevant to. */
export const baseKeywords = [
  "BSM Security Agency",
  "BSM security",
  "security agency in Goa",
  "security services Goa",
  "security guards Goa",
  "security company Goa",
  "private security agency Goa",
  "DGR sponsored security agency",
  "security agency Margao",
  "security agency Panjim",
  "security agency Vasco",
  "manpower security Goa",
];

/**
 * The generated share card (app/opengraph-image.tsx). Set explicitly because a
 * page that defines its own openGraph replaces the one Next.js would attach.
 */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "BSM Security Agency, Goa — Protecting industries. Securing Businesses. Building Trust.",
};

export function pageMetadata({
  path,
  title,
  description,
  keywords = [],
  absoluteTitle = false,
}: {
  /** Route, e.g. "/services". */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  /** Use the title as-is, without the brand suffix (home page). */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${brand.suffix}`;
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...keywords, ...baseKeywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: brand.name,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}
