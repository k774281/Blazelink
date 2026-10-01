// `npm run build:wp` exports a static copy to out/ for uploading into a
// directory of the WordPress host; BASE_PATH must match that directory.
// Only the files load from it (assetPrefix), not the page URL, so the same
// upload works at /landing/ and, via a rewrite, at the site root.
const isStaticExport = process.env.STATIC_EXPORT === '1'
const assetBase = isStaticExport ? (process.env.BASE_PATH ?? '/landing') : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: assetBase },
  ...(isStaticExport && { output: 'export', assetPrefix: assetBase, trailingSlash: true }),
}

export default nextConfig
