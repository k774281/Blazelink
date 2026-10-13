/*
 * The newest column posts for 最新消息, read from WordPress's REST API — the
 * same categories the marketing site's column shows in each language, so
 * every card opens that post's page there.
 *
 * Read once at build time, and again in the browser as the page opens
 * (`fresh`), so a post published since the build shows up straight away. A
 * post the build already knew opens its own page in the marketing site; a
 * newer one opens there in the reader, which loads it from WordPress.
 *
 * Nothing here throws: at build time a failure gives an empty list (the
 * section keeps its copy and simply has no cards); in the browser it gives
 * null, and the page keeps what it was built with.
 */

import { linksFor } from "./links";

const WP = "https://blazelink.co";
const COUNT = 4;

const CATEGORIES = {
  zh: ["martech", "start-up", "web-design"],
  en: ["content-mkt"],
  ja: ["martech-jp", "leadership-jp"],
};

const DATE_LOCALE = { zh: "zh-TW", en: "en-US", ja: "ja-JP" };

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

async function wpJson(path, fresh) {
  const res = await fetch(`${WP}/wp-json/wp/v2/${path}`, { cache: fresh ? "no-store" : "force-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${path}`);
  return res.json();
}

/**
 * `built` is the list the page was built with; in the browser, posts in it keep
 * their own page and only newer ones go to the reader.
 */
export async function getLatestPosts(locale, { fresh = false, built = [] } = {}) {
  try {
    const cats = await wpJson(`categories?slug=${CATEGORIES[locale].join(",")}&_fields=id`, fresh);
    const posts = await wpJson(
      `posts?categories=${cats.map((c) => c.id).join(",")}&per_page=${COUNT}&orderby=date&order=desc&_fields=id,slug,date,title,featured_media`,
      fresh,
    );
    const mediaIds = [...new Set(posts.map((p) => p.featured_media).filter(Boolean))];
    const media = mediaIds.length
      ? await wpJson(`media?include=${mediaIds.join(",")}&per_page=${mediaIds.length}&_fields=id,source_url`, fresh)
      : [];
    const images = new Map(media.map((m) => [m.id, m.source_url]));

    const links = linksFor(locale);
    const known = new Set(built.map((p) => p.slug));
    const dateFormat = new Intl.DateTimeFormat(DATE_LOCALE[locale], { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

    return posts.map((post) => {
      const iso = post.date.slice(0, 10);
      return {
        slug: post.slug,
        iso,
        date: dateFormat.format(new Date(`${iso}T00:00:00Z`)),
        title: decodeEntities(post.title.rendered),
        image: images.get(post.featured_media) ?? null,
        href: !fresh || known.has(post.slug) ? links.post(post.slug) : links.postReader(post.slug),
      };
    });
  } catch (err) {
    console.warn(`WordPress: could not read the latest posts — ${err.message}`);
    return fresh ? null : [];
  }
}
