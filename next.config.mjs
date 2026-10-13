/*
 * The landing page is exported as static files and uploaded to /landing/ on
 * the WordPress host, where a Code Snippet answers / with /landing/index.html
 * (docs/web-build/landing-cutover.md); its English and Japanese builds are in
 * /landing/en/ and /landing/ja/ and answer /en/ and /ja/. So each page is
 * served at /, /en/ or /ja/ but its scripts live under /landing[/en|/ja], and
 * the public files once, under /landing.
 *
 * The marketing site (/martech) and the web-design site (/web-design) are
 * their own static exports beside it; links to them are plain paths.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Each language build keeps its scripts apart: /landing, /landing/en, /landing/ja.
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? `/landing${['en', 'ja'].includes(process.env.NEXT_PUBLIC_LOCALE) ? `/${process.env.NEXT_PUBLIC_LOCALE}` : ''}`
      : undefined,
  images: { unoptimized: true },
}

export default nextConfig
