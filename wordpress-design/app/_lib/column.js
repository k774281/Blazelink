/*
 * The column as the pages see it: WordPress's shared posts and the ones kept
 * in this repo (app/_data/column.js), merged newest first.
 *
 * A repo post wins over a WordPress post with the same slug — its body and
 * layout are this site's own — but takes the WordPress post's date, so both
 * sites show the one the post was published on.
 */

import { localPosts } from "../_data/column";
import { getColumnPost, getColumnPosts } from "./wp";

const byDateDesc = (a, b) => b.date.localeCompare(a.date);

/** The repo's copy of a post, dated as WordPress dates it when it is there too. */
function withWpDate(local, wp) {
  return wp ? { ...local, date: wp.date } : local;
}

export async function getColumn() {
  const wp = await getColumnPosts();
  const wpBySlug = new Map(wp.posts.map((p) => [p.slug, p]));
  const local = localPosts.map((p) => withWpDate(p, wpBySlug.get(p.slug)));
  const localSlugs = new Set(local.map((p) => p.slug));
  const posts = [...local, ...wp.posts.filter((p) => !localSlugs.has(p.slug))].sort(byDateDesc);
  const categories = [...new Set([...local.map((p) => p.category), ...wp.categories])].filter((c) => posts.some((p) => p.category === c));
  return { posts, categories };
}

export async function getPost(slug) {
  const local = localPosts.find((p) => p.slug === slug);
  if (!local) return getColumnPost(slug);
  return withWpDate(local, await getColumnPost(slug));
}

/** Three posts to read next: the same category first, then the latest. */
export function relatedPosts(post, posts) {
  const others = posts.filter((p) => p.slug !== post.slug);
  return [...new Set([...others.filter((p) => p.category === post.category), ...others])].slice(0, 3);
}
