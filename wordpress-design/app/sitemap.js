import { getColumn } from "./_lib/column";
import { products } from "./_data/shop";

/*
 * /web-design/sitemap.xml. Yoast SEO's sitemap index only knows WordPress's
 * own pages, so this one is added to it (see docs/web-build/tracking-and-seo.md).
 * Column posts that also live on WordPress are left out: their canonical is
 * the WordPress address, which Yoast already lists.
 */
export const dynamic = "force-static";

const SITE = "https://blazelink.co/web-design";

export default async function sitemap() {
  const pages = ["/", "/cases/", "/about/", "/column/", "/shop/", "/contact/", "/privacy-policy/", "/terms/"];
  const { posts } = await getColumn();
  return [
    ...pages.map((path) => ({ url: `${SITE}${path}`, changeFrequency: "monthly" })),
    ...products.map((p) => ({ url: `${SITE}/shop/${p.slug}/`, changeFrequency: "monthly" })),
    ...posts.filter((p) => !p.link).map((p) => ({ url: `${SITE}/column/${p.slug}/`, lastModified: p.date.replace(/\./g, "-") })),
  ];
}
