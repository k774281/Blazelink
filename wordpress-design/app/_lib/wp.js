/**
 * The column's posts, read from blazelink.co over the WordPress REST API.
 *
 * The posts are shared with the marketing site — the same WordPress posts,
 * styled by each site in its own way — so this reads every category in
 * COLUMN_CATEGORIES, including 網站架設專欄 once it exists.
 *
 * The site is static, so all of this runs at build time; a new WordPress post
 * reaches the column with the next build and upload.
 *
 * Nothing here throws. If WordPress is unreachable at build time the column
 * falls back to the posts kept in this repo (app/_data/column.js), so the site
 * still deploys when the CMS is down.
 */

import { ui } from "../_data/ui";
import { BASE_PATH } from "./base";
import { LOCALE, pick } from "./locale";
const WP = process.env.WP_BASE_URL ?? "https://blazelink.co";

/** Category slugs the column reads, in the order the filter lists them. */
export const COLUMN_CATEGORIES = pick({
  zh: ["web-design", "martech", "start-up"],
  // The English and Japanese posts live in their own WordPress categories.
  en: ["content-mkt"],
  ja: ["martech-jp", "leadership-jp"],
});

/** WordPress renders titles and excerpts with HTML entities. */
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

/*
 * WordPress keeps a Chinese slug percent-encoded in lower case
 * (%e3%80%90…). A page's folder has to be the decoded text, since Apache
 * decodes the address before looking for it; this brings either form back to
 * WordPress's for the API.
 */
export function toWpSlug(slug) {
  let text = slug;
  try {
    text = decodeURIComponent(slug);
  } catch {}
  return encodeURIComponent(text).replace(/%[0-9A-F]{2}/g, (hex) => hex.toLowerCase());
}

/** The folder name a slug's page is exported under. */
export function pageSlug(slug) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function plainText(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/​/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function wpJson(path) {
  // Read once per build: the site is exported as static files.
  const res = await fetch(`${WP}/wp-json/wp/v2/${path}`, { cache: "force-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${path}`);
  return res.json();
}

/** id → name, for the categories the column reads. Missing slugs are skipped. */
async function columnCategories() {
  const found = await wpJson(`categories?slug=${COLUMN_CATEGORIES.join(",")}&_fields=id,slug,name`);
  return COLUMN_CATEGORIES.map((slug) => found.find((c) => c.slug === slug)).filter(Boolean);
}

async function featuredImages(ids) {
  const wanted = [...new Set(ids.filter(Boolean))];
  if (!wanted.length) return new Map();
  const media = await wpJson(`media?include=${wanted.join(",")}&per_page=${wanted.length}&_fields=id,source_url`);
  return new Map(media.map((m) => [m.id, m.source_url]));
}

async function tagNames(ids) {
  const wanted = [...new Set(ids)];
  if (!wanted.length) return new Map();
  const tags = await wpJson(`tags?include=${wanted.join(",")}&per_page=100&_fields=id,name`);
  return new Map(tags.map((t) => [t.id, decodeEntities(t.name)]));
}

/*
 * Post bodies come styled for the WordPress theme: inline colours, colour
 * classes and spacer heights tuned for a light page. The column restyles every
 * element itself (.article-body in globals.css), so the inline styles go.
 */
function cleanBody(html) {
  return html.replace(/\sstyle="[^"]*"/g, "");
}

/*
 * WordPress pages that now live on the new sites. Links inside a body to one
 * of these, to another column post or to a product are pointed at the new
 * page, so reading never drops back into the old site.
 */
const MOVED = pick({
  zh: {
    contact: "/web-design/contact/",
    about: "/web-design/about/",
    cases: "/web-design/cases/",
    mall: "/web-design/shop/",
    "privacy-policy": "/web-design/privacy-policy/",
    "term-of-use": "/web-design/terms/",
    "global-seo": "/martech/seo/",
    academy: "/martech/academy/",
  },
  en: {
    "en/about-3": "/web-design/en/about/",
    "en/contact-3": "/web-design/en/contact/",
    "en/cases-3": "/web-design/en/cases/",
    "en/seo-marketing": "/martech/en/seo/",
    "en/insights": "/web-design/en/column/",
  },
  ja: {
    "ja/about-2": "/web-design/ja/about/",
    "ja/contact-2": "/web-design/ja/contact/",
    "ja/cases-2": "/web-design/ja/cases/",
    "ja/blog-2": "/web-design/ja/column/",
    "ja/private-policy": "/web-design/ja/privacy-policy/",
  },
});
const SHOP_PRODUCTS = ["astra-pro", "flatsome"];

function localiseLinks(html, postSlugs) {
  return html.replace(
    /href="(?:https?:\/\/(?:www\.)?blazelink\.co)?\/((?:product\/|en\/|ja\/)?[^"/?#]+)\/?([?#][^"]*)?"/g,
    (whole, path, rest = "") => {
      let to = MOVED[path];
      // A post's WordPress address carries its language: /en/slug/, /ja/slug/.
      const prefixed = LOCALE !== "zh" && path.startsWith(`${LOCALE}/`);
      const own = prefixed ? path.slice(LOCALE.length + 1) : path;
      const thisLanguage = LOCALE === "zh" ? !/^(en|ja)\//.test(path) : prefixed;
      if (path.startsWith("product/")) {
        const slug = path.slice("product/".length);
        to = SHOP_PRODUCTS.includes(slug) ? `/web-design/shop/${slug}/` : `/martech/academy/${slug}/`;
      } else if (!to && thisLanguage && postSlugs.has(own)) {
        to = `${BASE_PATH}/column/${own}/`;
      }
      return to ? `href="${to}${rest}"` : whole;
    },
  );
}

/** Reading time from the body's length, at roughly 400 characters a minute. */
function readMinutes(html) {
  return Math.max(1, Math.round(plainText(html).length / 400));
}

function toPost(post, categories, images, tags, postSlugs = new Set()) {
  const category = categories.find((c) => post.categories.includes(c.id));
  const excerpt = plainText(post.excerpt?.rendered ?? "");
  return {
    slug: post.slug,
    // The post's own address on WordPress, where Yoast SEO already ranks it.
    link: post.link,
    date: post.date.slice(0, 10).replace(/-/g, "."),
    category: category ? decodeEntities(category.name) : ui.column.fallbackCategory,
    categorySlug: category?.slug ?? null,
    title: decodeEntities(post.title.rendered),
    excerpt,
    image: images.get(post.featured_media) ?? null,
    tags: (post.tags ?? []).map((id) => tags.get(id)).filter(Boolean),
    ...(post.content ? { html: localiseLinks(cleanBody(post.content.rendered), postSlugs), readMinutes: readMinutes(post.content.rendered) } : {}),
  };
}

/** Every post in the column's categories, newest first, without bodies. */
export async function getColumnPosts() {
  try {
    const categories = await columnCategories();
    if (!categories.length) return { posts: [], categories: [] };

    const posts = await wpJson(
      `posts?categories=${categories.map((c) => c.id).join(",")}&per_page=100&orderby=date&order=desc&_fields=id,slug,date,link,title,excerpt,categories,tags,featured_media`,
    );
    const [images, tags] = await Promise.all([featuredImages(posts.map((p) => p.featured_media)), tagNames(posts.flatMap((p) => p.tags ?? []))]);

    return {
      posts: posts.map((p) => toPost(p, categories, images, tags)),
      categories: categories.map((c) => decodeEntities(c.name)),
    };
  } catch (err) {
    console.warn(`WordPress: could not read the column — ${err.message}`);
    return { posts: [], categories: [] };
  }
}

/** One post with its body, or null. */
export async function getColumnPost(slug) {
  try {
    const categories = await columnCategories();
    const [post] = await wpJson(
      `posts?slug=${toWpSlug(slug)}&_fields=id,slug,date,link,title,excerpt,content,categories,tags,featured_media`,
    );
    if (!post || !categories.some((c) => post.categories.includes(c.id))) return null;
    const [images, tags, all] = await Promise.all([
      featuredImages([post.featured_media]),
      tagNames(post.tags ?? []),
      wpJson(`posts?categories=${categories.map((c) => c.id).join(",")}&per_page=100&_fields=slug`),
    ]);
    return toPost(post, categories, images, tags, new Set(all.map((p) => p.slug)));
  } catch (err) {
    console.warn(`WordPress: could not read post "${slug}" — ${err.message}`);
    return null;
  }
}
