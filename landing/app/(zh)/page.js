import Landing from "../_components/Landing";
import t from "../_data/zh";
import { getLatestPosts } from "../_lib/wp";

export default async function Page() {
  const posts = await getLatestPosts(t.locale);
  return <Landing t={t} posts={posts} />;
}
