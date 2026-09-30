import { getLectures, getPostsByCategory } from "@/app/_lib/wp";
import HomePage from "./HomePage";

/*
 * The homepage stays on the server so the lecture and article lists can be read
 * from WordPress at build time and refreshed on a schedule, rather than
 * shipping a fetch to every visitor. Everything the reader interacts with
 * lives in HomePage.
 */
export default async function Home() {
  const [lectures, posts] = await Promise.all([
    // 課程, so the software licences WooCommerce also sells stay out of it.
    getLectures({ category: "courses", limit: 3 }),
    getPostsByCategory("martech", 3, { withImages: true }),
  ]);

  return <HomePage lectures={lectures} posts={posts} />;
}
