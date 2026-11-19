import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * Static build. `next build` writes a plain folder of HTML, CSS, JS and
   * images to /out — no Node server, no API routes, nothing to keep running.
   * Upload that folder to any web host, or serve it locally with
   * `npx serve out`.
   */
  output: "export",

  /** Every page becomes its own folder with an index.html inside. */
  trailingSlash: true,

  images: {
    /**
     * Image optimisation is a server feature, so a static build serves the
     * files in /public as they are. Keep source images sensibly sized.
     */
    unoptimized: true,
  },
};

export default nextConfig;
