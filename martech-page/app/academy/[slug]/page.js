import { notFound } from "next/navigation";
import { LiveItem } from "../../_components/LiveReader";
import { getLecture, getLectureSlugs, pageSlug, toWpSlug } from "../../_lib/wp";

/*
 * Every lecture (WooCommerce's 課程 category) known at build time gets its
 * page here. One added since opens in /academy/read/ until the next build.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getLectureSlugs();
  return slugs.map((slug) => ({ slug: pageSlug(slug) }));
}

export async function generateMetadata({ params }) {
  const slug = toWpSlug((await params).slug);
  const lecture = await getLecture(slug);
  if (!lecture) return {};
  return {
    title: `${lecture.title}｜鏈客商學院`,
    description: lecture.body,
    // WordPress's product page now redirects here (wp-snippets/old-urls.php).
    alternates: { canonical: `/martech/academy/${lecture.slug}/` },
    openGraph: { url: `/martech/academy/${lecture.slug}/`, locale: "zh_TW", siteName: "BlazeLink鏈客行銷", title: lecture.title, description: lecture.body, images: lecture.image ? [lecture.image] : [] },
  };
}

export default async function Lecture({ params }) {
  const slug = toWpSlug((await params).slug);
  const lecture = await getLecture(slug);
  if (!lecture) notFound();
  return <LiveItem kind="lecture" item={lecture} />;
}
