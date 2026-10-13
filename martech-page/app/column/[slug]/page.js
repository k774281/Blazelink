import { notFound } from "next/navigation";
import { LiveItem } from "../../_components/LiveReader";
import { BASE_PATH } from "../../_lib/base";
import { LOCALE, LOCALES } from "../../_lib/locale";
import { ui } from "../../_data/ui";
import { getColumnPost, getColumnPosts, pageSlug, toWpSlug } from "../../_lib/wp";

/*
 * Every column post known at build time gets its page here. One published
 * since opens in /column/read/ until the next build.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getColumnPosts();
  return posts.map((p) => ({ slug: pageSlug(p.slug) }));
}

/*
 * Both new sites show every post, and the WordPress address now redirects to
 * one of them (docs/web-build/wp-snippets/old-urls.php): 網站架設專欄 posts to
 * the web-design site, the rest here. That one is the canonical.
 */
function postCanonical(post) {
  return post.categorySlug === "web-design"
    ? `https://blazelink.co/web-design/column/${post.slug}/`
    : `${BASE_PATH}/column/${post.slug}/`;
}

export async function generateMetadata({ params }) {
  const slug = toWpSlug((await params).slug);
  const post = await getColumnPost(slug);
  if (!post) return {};
  return {
    title: `${post.title}｜${ui.siteName}`,
    description: post.excerpt,
    alternates: { canonical: postCanonical(post) },
    openGraph: { type: "article", url: postCanonical(post), locale: LOCALES[LOCALE].og, siteName: "BlazeLink鏈客行銷", title: post.title, description: post.excerpt, images: post.image ? [post.image] : [] },
  };
}

export default async function ColumnPost({ params }) {
  const slug = toWpSlug((await params).slug);
  const post = await getColumnPost(slug);
  if (!post) notFound();
  return <LiveItem kind="post" item={post} />;
}
