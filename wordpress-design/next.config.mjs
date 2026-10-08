import { BASE_PATH } from "./app/_lib/base.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: BASE_PATH,
  /*
   * Built as plain files and uploaded into /web-design on the WordPress host,
   * which serves real folders before handing a path to WordPress. Each page is
   * a folder with an index.html, so Apache finds it without rewrite rules.
   */
  output: "export",
  trailingSlash: true,
  /*
   * A static host has no image server. Built with IMAGE_CDN=cloudflare, once
   * blazelink.co is behind Cloudflare, images are resized by Cloudflare
   * (app/_lib/image-loader.js); otherwise they are served as they are.
   */
  images: process.env.IMAGE_CDN === "cloudflare" ? { loader: "custom", loaderFile: "./app/_lib/image-loader.js" } : { unoptimized: true },
  turbopack: {
    // Nested inside the Blazelink repo, which has its own lockfile; pin the root so Turbopack doesn't pick the parent.
    root: import.meta.dirname,
  },
};

export default nextConfig;
