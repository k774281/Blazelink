import { getColumn } from "./_lib/column";
import { products } from "./_data/shop";
import { BASE_PATH } from "./_lib/base";
import { IS_ZH } from "./_lib/locale";

/*
 * /web-design/sitemap.xml. Yoast SEO's sitemap index only knows WordPress's
 * own pages, so this one is added to it (see docs/web-build/tracking-and-seo.md).
 * One per language build (/web-design/, /web-design/en/, /web-design/ja/).
 * Column posts are listed here when this site is their canonical home
 * (網站架設專欄, Chinese only); the rest are in the marketing site's sitemaps.
 * The shop is Chinese only.
 */
export const dynamic = "force-static";

const SITE = `https://blazelink.co${BASE_PATH}`;

export default async function sitemap() {
  const pages = ["/", "/cases/", "/about/", "/column/", ...(IS_ZH ? ["/shop/"] : []), "/contact/", "/privacy-policy/", "/terms/"];
  const { posts } = await getColumn();
  return [
    ...pages.map((path) => ({ url: `${SITE}${path}`, changeFrequency: "monthly" })),
    ...(IS_ZH ? products : []).map((p) => ({ url: `${SITE}/shop/${p.slug}/`, changeFrequency: "monthly" })),
    ...posts
      .filter((p) => IS_ZH && (!p.categorySlug || p.categorySlug === "web-design"))
      .map((p) => ({ url: `${SITE}/column/${p.slug}/`, lastModified: p.date.replace(/\./g, "-") })),
  ];
}
