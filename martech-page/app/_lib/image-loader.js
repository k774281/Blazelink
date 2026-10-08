/*
 * next/image loader for Cloudflare Image Transformations, used when the site is
 * built with IMAGE_CDN=cloudflare (see next.config.mjs). Cloudflare resizes
 * and re-encodes on the fly at /cdn-cgi/image/<options>/<source>, so each
 * screen gets an image sized for it — the optimisation a static host lacks.
 * The source is this site's own file or the WordPress media library, both on
 * blazelink.co, so they are fetched from the same zone.
 */
export default function cloudflareLoader({ src, width, quality }) {
  const options = [`width=${width}`, `quality=${quality || 80}`, "format=auto"].join(",");
  return `/cdn-cgi/image/${options}/${src.replace(/^\//, "")}`;
}
