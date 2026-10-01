// `npm run build:wp` exports a static copy to out/ for uploading into a
// sub-directory of the WordPress host; BASE_PATH must match that directory.
const isStaticExport = process.env.STATIC_EXPORT === '1'
const basePath = isStaticExport ? (process.env.BASE_PATH ?? '/landing') : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isStaticExport && { output: 'export', basePath, trailingSlash: true }),
}

export default nextConfig
