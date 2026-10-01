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

  redirects() {
    return [
      /*
       * The marketing site's own home is /martech; blazelink.co/ belongs to the
       * landing app in front of it. This only fires when the zone is reached
       * directly — on its Vercel URL, or in development — because in production
       * the landing app answers / and never forwards it here.
       *
       * Temporary on purpose: a 308 would be cached forever and would follow
       * visitors to blazelink.co/ once the landing page owns that path.
       */
      { source: "/", destination: "/martech", permanent: false },
    ];
  },
};

export default nextConfig;
