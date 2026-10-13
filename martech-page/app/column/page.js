import { pageMeta } from "../_lib/seo";
import { getColumnPosts } from "../_lib/wp";
import ColumnList from "./ColumnList";

export const metadata = pageMeta("column", "/column/");

export default async function Column() {
  return <ColumnList posts={await getColumnPosts()} />;
}
