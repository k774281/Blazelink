/*
 * /martech/sitemap.xml. Yoast SEO's sitemap index only knows WordPress's own
 * pages, so this one is added to it (see docs/web-build/tracking-and-seo.md).
 */
export const dynamic = "force-static";

const SITE = "https://blazelink.co/martech";

export default function sitemap() {
  return ["/", "/about/", "/academy/", "/seo/", "/contact/", "/privacy-policy/", "/terms/"].map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: "monthly",
  }));
}
