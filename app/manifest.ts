import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { brand } from "@/lib/seo";

/** Written once at build time — this is a static export. */
export const dynamic = "force-static";

/** Web app manifest: name, colours and icons for "Add to Home Screen". */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.short,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#04060a",
    theme_color: "#04060a",
    lang: "en-IN",
    categories: ["business"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
