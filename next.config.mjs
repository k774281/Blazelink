/*
 * The landing page answers / and fronts two other Next.js apps in this repo as
 * Multi-Zones: the marketing site (martech-page, basePath /martech) and the
 * web-design site (wordpress-design, basePath /web-design). Each zone carries
 * its own basePath, so its pages, /_next assets and /public files all live under
 * that prefix and never collide with the landing page's own.
 *
 * Set on this deployment, without a trailing slash:
 *   MARTECH_URL     e.g. https://martech-gamma.vercel.app
 *   WEB_DESIGN_URL  the web-design project's production URL
 * A zone whose URL is unset is simply not routed, rather than failing the build.
 */

const zones = [
  { prefix: '/martech', origin: process.env.MARTECH_URL },
  { prefix: '/web-design', origin: process.env.WEB_DESIGN_URL },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return zones
      .filter((zone) => zone.origin)
      .flatMap(({ prefix, origin }) => [
        { source: prefix, destination: `${origin}${prefix}` },
        { source: `${prefix}/:path+`, destination: `${origin}${prefix}/:path+` },
      ])
  },
}

export default nextConfig
