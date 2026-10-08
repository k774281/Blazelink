import { BASE_PATH } from "./app/_lib/base.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: BASE_PATH,
  turbopack: {
    // Nested inside the Blazelink repo, which has its own lockfile; pin the root so Turbopack doesn't pick the parent.
    root: import.meta.dirname,
  },
};

export default nextConfig;
