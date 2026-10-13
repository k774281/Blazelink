import { pageMeta } from "./_lib/seo";
import { getLectures, getPostsByCategory } from "@/app/_lib/wp";
import { IS_ZH, pick } from "./_lib/locale";
import HomePage from "./HomePage";

/*
 * The homepage stays on the server so the lecture and article lists can be read
 * from WordPress at build time and refreshed on a schedule, rather than
 * shipping a fetch to every visitor. Everything the reader interacts with
 * lives in HomePage.
 */
export const metadata = pageMeta("home", "/");

export default async function Home() {
  const [lectures, posts] = await Promise.all([
    // 課程, so the software licences WooCommerce also sells stay out of it.
    // Lectures are Taiwan events, shown on the Chinese site only.
    IS_ZH ? getLectures({ category: "courses", limit: 3 }) : [],
    // Posts are shared with the web-design site, so its 網站架設專欄 shows here
    // too; each site styles them its own way.
    getPostsByCategory(pick({ zh: ["martech", "web-design"], en: ["content-mkt"], ja: ["martech-jp", "leadership-jp"] }), 3, {
      withImages: true,
    }),
  ]);

  return <HomePage lectures={lectures} posts={posts} />;
}
