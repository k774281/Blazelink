import { SITE_PATH } from "./app/_lib/asset.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /*
   * Built as plain files, like the landing page it replaces: uploaded to /landing/
   * on the WordPress host, which answers /, /en/ and /ja/ from /landing/index.html,
   * /landing/en/index.html and /landing/ja/index.html. All three languages come out
   * of one build, so scripts and public files live once, under /landing.
   */
  output: "export",
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === "production" ? SITE_PATH : undefined,
  images: { unoptimized: true },
  turbopack: {
    // Nested inside the Blazelink repo, which has its own lockfile; pin the root so Turbopack doesn't pick the parent.
    root: import.meta.dirname,
  },
};

export default nextConfig;
