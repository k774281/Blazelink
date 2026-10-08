import { BASE_PATH } from "./app/_lib/base.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The whole site sits under /martech on the shared domain; see app/_lib/base.js.
  basePath: BASE_PATH,
  /*
   * Built as plain files and uploaded into /martech on the WordPress host,
   * which serves real folders before handing a path to WordPress. Each page is
   * a folder with an index.html, so Apache finds it without rewrite rules.
   */
  output: "export",
  trailingSlash: true,
  images: {
    // There is no image server on a static host; files are served as they are,
    // past-event artwork straight from the WordPress media library.
    unoptimized: true,
  },
  turbopack: {
    // Nested inside the Blazelink repo, which has its own lockfile; pin the root so Turbopack doesn't pick the parent.
    root: import.meta.dirname,
  },
};

export default nextConfig;
