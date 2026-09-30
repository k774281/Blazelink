/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Past-event artwork is served from the WordPress media library, so it stays
    // in step with the CMS instead of being copied into this repo.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blazelink.co",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  turbopack: {
    // Nested inside the Blazelink repo, which has its own lockfile; pin the root so Turbopack doesn't pick the parent.
    root: import.meta.dirname,
  },
};

export default nextConfig;
