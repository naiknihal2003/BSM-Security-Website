import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Written once at build time — this is a static export. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; freq: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.8, freq: "yearly" },
    { path: "/clients", priority: 0.7, freq: "monthly" },
    { path: "/gallery", priority: 0.7, freq: "monthly" },
    { path: "/branch", priority: 0.7, freq: "yearly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
