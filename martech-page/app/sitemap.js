import { getColumnPosts, getLectureSlugs } from "./_lib/wp";
import { BASE_PATH } from "./_lib/base";
import { IS_ZH } from "./_lib/locale";

/*
 * sitemap.xml for this build's language (/martech/, /martech/en/,
 * /martech/ja/). Yoast SEO's sitemap index only knows WordPress's own pages,
 * so these are added to it (see docs/web-build/wp-snippets/old-urls.php).
 * Column posts are listed unless they are 網站架設專欄 posts, whose canonical
 * home is the web-design site; lectures are on the Chinese site only.
 */
export const dynamic = "force-static";

const SITE = `https://blazelink.co${BASE_PATH}`;

export default async function sitemap() {
  const pages = ["/", "/about/", ...(IS_ZH ? ["/academy/"] : []), "/seo/", "/contact/", "/column/", "/privacy-policy/", "/terms/"];
  const [posts, lectures] = await Promise.all([getColumnPosts(), IS_ZH ? getLectureSlugs() : []]);
  return [
    ...pages.map((path) => ({ url: `${SITE}${path}`, changeFrequency: "monthly" })),
    ...posts
      .filter((p) => p.category !== "web-design")
      .map((p) => ({ url: `${SITE}/column/${p.slug}/`, lastModified: p.date })),
    ...lectures.map((slug) => ({ url: `${SITE}/academy/${slug}/`, changeFrequency: "monthly" })),
  ];
}
