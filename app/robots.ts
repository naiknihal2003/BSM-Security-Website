import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Written once at build time — this is a static export. */
export const dynamic = "force-static";

/** Everything public is crawlable; the sitemap lists every page and image. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
