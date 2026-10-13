/**
 * Reads the marketing site's WordPress over its public REST API.
 *
 * WPGraphQL is not installed on blazelink.co, so this goes through wp/v2 and
 * asks for `_fields` to keep the payload to what the page renders — a bare
 * posts call returns the full rendered body of every post.
 *
 * Nothing here throws. If WordPress is unreachable or slow at build time the
 * call resolves to an empty list and the section falls back to its empty
 * state, because a marketing page should still deploy when the CMS is down.
 *
 * The same calls run in the browser with `{ fresh: true }`: the site is on
 * WordPress's own domain, so a page can refresh its build-time lists from the
 * REST API as it opens and show what was published since. A fresh read that
 * fails resolves to null instead of [], so the page keeps what it was built
 * with rather than emptying the list.
 */

import { BASE_PATH } from "./base";
import { LOCALE, pick } from "./locale";

const WP = process.env.WP_BASE_URL ?? "https://blazelink.co";

/** WordPress renders titles with HTML entities — `&#8211;` and friends. */
function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    // Last, so an entity that was itself encoded survives the earlier passes.
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

/*
 * Where a post or lecture opens on this site. Each one known at build time has
 * its own page; one read live in the browser may be newer than the build, so
 * it opens in the reader page, which loads it from WordPress there and then.
 * Paths are for next/link, which adds /martech.
 */
export const postPath = (slug, live = false) =>
  live ? `/column/read/?slug=${encodeURIComponent(slug)}` : `/column/${slug}/`;
export const lecturePath = (slug, live = false) =>
  live ? `/academy/read/?slug=${encodeURIComponent(slug)}` : `/academy/${slug}/`;

/**
 * A live list with each item that was already in the build-time list pointed
 * back at its own page; only what is newer than the build opens in the reader.
 */
export function keepBuiltPages(live, built, pathOf) {
  const known = new Set(built.map((item) => item.slug));
  return live.map((item) => (known.has(item.slug) ? { ...item, href: pathOf(item.slug) } : item));
}

/*
 * Signing up: an external product (most lectures) registers on Accupass; one
 * sold here goes straight to WooCommerce checkout, which the site's snippets
 * give the new look. Absolute, so next/link leaves it alone.
 */
function registerHref(product) {
  if (product.type === "external") return product.add_to_cart.url;
  return `${WP}/checkout/?add-to-cart=${product.id}&buy-now=1`;
}

async function restJson(path, fresh) {
  // At build time each list is read once; in the browser it is read live.
  const res = await fetch(`${WP}/wp-json/${path}`, { cache: fresh ? "no-store" : "force-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${path}`);
  return res.json();
}

const wpJson = (path, fresh = false) => restJson(`wp/v2/${path}`, fresh);


/** Featured images, looked up in one call for a whole batch of ids. */
async function featuredImages(ids) {
  const wanted = [...new Set(ids.filter(Boolean))];
  if (!wanted.length) return new Map();
  const media = await wpJson(
    `media?include=${wanted.join(",")}&per_page=${wanted.length}&_fields=id,source_url`,
  );
  return new Map((media ?? []).map((m) => [m.id, m.source_url]));
}

/**
 * Best effort at the event date a lecture states in its short description.
 * The two lectures label it differently — 日期 on one, 活動時間 on the other —
 * and neither is a real field, so a card simply goes without when nothing
 * matches rather than showing something invented.
 */
function eventDate(excerpt) {
  const m = excerpt.match(
    /(?:日期|活動時間|時間)[：:]\s*([^\n。]{4,48}?)(?=\s*(?:活動)?(?:地點|費用|名額|席位|主辦|現場)|$)/,
  );
  if (!m) return null;

  // Some listings separate the fields with pictographs rather than labels, and
  // the first of those is where this value really ends.
  return m[1]
    .split(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}]/u)[0]
    .replace(/[\s,、，]+$/, "")
    .trim();
}

function plainText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\u200b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Lectures, as WooCommerce products. Pass `slugs` to pick named ones in that
 * order, or `category` to take the newest in a product category.
 * Returns [] rather than throwing — see the note at the top of the file.
 */
export async function getLectures({ slugs, category, limit = 3 } = {}) {
  try {
    const fields = "id,slug,date,link,title,excerpt,featured_media";
    let products;

    if (slugs?.length) {
      products = await wpJson(
        `product?slug=${slugs.join(",")}&per_page=${slugs.length}&_fields=${fields}`,
      );
      // `slug=` does not preserve the order asked for, so restore it.
      const bySlug = new Map((products ?? []).map((p) => [p.slug, p]));
      products = slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
    } else {
      const cats = await wpJson(
        `product_cat?slug=${encodeURIComponent(category)}&_fields=id`,
      );
      const id = cats?.[0]?.id;
      if (!id) {
        console.warn(`WordPress: no product category with slug "${category}"`);
        return [];
      }
      products = await wpJson(
        `product?product_cat=${id}&per_page=${limit}&orderby=date&order=desc&_fields=${fields}`,
      );
    }

    const images = await featuredImages((products ?? []).map((p) => p.featured_media));

    return (products ?? []).map((product) => {
      const excerpt = plainText(decodeEntities(product.excerpt?.rendered ?? ""));
      return {
        id: product.id,
        slug: product.slug,
        title: decodeEntities(product.title.rendered),
        // This site's own page for the lecture, not WordPress's product page.
        href: lecturePath(product.slug),
        image: images.get(product.featured_media) ?? null,
        excerpt,
        date: eventDate(excerpt),
      };
    });
  } catch (err) {
    console.warn(`WordPress: could not read lectures — ${err.message}`);
    return [];
  }
}

/**
 * The newest posts in one category, or across several, by slug. A slug with no
 * category behind it (yet) is skipped rather than failing the list.
 * Returns [] rather than throwing — see the note at the top of the file.
 */
export async function getPostsByCategory(slug, limit = 6, { withImages = false, fresh = false } = {}) {
  const slugs = [slug].flat();
  try {
    const categories = await wpJson(
      `categories?slug=${slugs.map(encodeURIComponent).join(",")}&_fields=id`,
      fresh,
    );
    const ids = (categories ?? []).map((c) => c.id);
    if (!ids.length) {
      console.warn(`WordPress: no category with slug "${slugs.join(", ")}"`);
      return [];
    }

    const posts = await wpJson(
      `posts?categories=${ids.join(",")}&per_page=${limit}&_fields=id,slug,date,title,featured_media`,
      fresh,
    );

    // The column lists are text only, so the extra media call is skipped there.
    const images = withImages
      ? await featuredImages((posts ?? []).map((post) => post.featured_media))
      : new Map();

    return (posts ?? []).map((post) => ({
      id: post.id,
      slug: post.slug,
      title: decodeEntities(post.title.rendered),
      date: post.date.slice(0, 10),
      // This site's own page for the post, not WordPress's.
      href: postPath(post.slug, fresh),
      image: images.get(post.featured_media) ?? null,
    }));
  } catch (err) {
    console.warn(`WordPress: could not read "${slugs.join(", ")}" — ${err.message}`);
    return fresh ? null : [];
  }
}

/*
 * Info rows a lecture card shows, read from the product's short description.
 * There is no field for them: each listing writes them as list items such as
 * 「日期：…」「🕑 時間：…」「活動地點：…」, so labels are matched by meaning and
 * anything unrecognised is left out.
 */
const INFO_LABELS = [
  ["日期", /^(日期|時間|活動時間|活動日期)$/],
  ["地點", /^(地點|活動地點|地址)$/],
  ["名額", /^(名額|席位|席位限制|人數)$/],
  ["費用", /^(費用|票價|價格)$/],
  ["主辦", /^(主辦|主辦單位)$/],
];

function lectureDetails(html) {
  const items = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) =>
    plainText(decodeEntities(m[1]))
      // Leading pictographs (🕑 📍 👥) and the space after them.
      .replace(/^[\p{Extended_Pictographic}\uFE0F\u200d\s]+/u, ""),
  );

  const info = [];
  for (const item of items) {
    const labelled = item.match(/^([^：:]{1,6})[：:]\s*(.+)$/);
    let label = labelled && INFO_LABELS.find(([, re]) => re.test(labelled[1].trim()))?.[0];
    let value = labelled?.[2];
    // An unlabelled line about places, like 「小班制教學，限額 40 名」.
    if (!label && /限額|名額|席/.test(item)) [label, value] = ["名額", item];
    if (label && !info.some((row) => row.label === label)) info.push({ label, value: value.trim() });
  }
  info.sort(
    (a, b) =>
      INFO_LABELS.findIndex(([l]) => l === a.label) - INFO_LABELS.findIndex(([l]) => l === b.label),
  );

  // The summary: the first paragraph that is more than a bold hook.
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => m[1]);
  const body =
    paragraphs
      .map((p) => plainText(decodeEntities(p.replace(/<(strong|b|em)\b[^>]*>[\s\S]*?<\/\1>/g, ""))))
      .find((text) => text.length >= 20) ?? "";

  return { body, info: info.slice(0, 4) };
}

/**
 * The lectures to feature: the newest products in WooCommerce's 最新課程
 * category (slug `lastest`), so choosing them is a tick in the product editor.
 * Read through the Store API, which brings images, categories and an external
 * product's registration link in one call.
 * Returns [] rather than throwing — see the note at the top of the file.
 */
export async function getLatestLectures({ category = "lastest", limit = 2, fresh = false } = {}) {
  try {
    const products = await restJson(
      `wc/store/v1/products?category=${encodeURIComponent(category)}&per_page=${limit}&orderby=date&order=desc`,
      fresh,
    );

    return (products ?? []).map((product) => {
      // A category of its own (LMI) labels the card; the shared ones do not.
      const tag = product.categories.find((c) => !["lastest", "courses"].includes(c.slug));
      return {
        id: product.id,
        slug: product.slug,
        title: decodeEntities(product.name),
        tag: tag ? decodeEntities(tag.name) : null,
        image: product.images?.[0]?.src ?? null,
        href: lecturePath(product.slug, fresh),
        register: registerHref(product),
        ...lectureDetails(product.short_description ?? ""),
      };
    });
  } catch (err) {
    console.warn(`WordPress: could not read the latest lectures — ${err.message}`);
    return fresh ? null : [];
  }
}

/* The column: shared with the web-design site, each styling the posts its own way. */
export const COLUMN_CATEGORIES = pick({
  zh: [
    { slug: "martech", label: "行銷專欄" },
    { slug: "start-up", label: "財稅專欄" },
    { slug: "web-design", label: "網站架設專欄" },
  ],
  // The English and Japanese posts live in their own WordPress categories.
  en: [{ slug: "content-mkt", label: "Content Marketing" }],
  ja: [
    { slug: "martech-jp", label: "マーケティング・ラボ" },
    { slug: "leadership-jp", label: "マインドフル・ワーク" },
  ],
});

async function columnCategoryIds(fresh) {
  const found = await wpJson(
    `categories?slug=${COLUMN_CATEGORIES.map((c) => c.slug).join(",")}&_fields=id,slug`,
    fresh,
  );
  return COLUMN_CATEGORIES.map((c) => ({ ...c, id: found.find((f) => f.slug === c.slug)?.id })).filter(
    (c) => c.id,
  );
}

/* Post and product bodies carry the old theme's inline colours and spacing. */
const cleanBody = (html) => html.replace(/\sstyle="[^"]*"/g, "");

/*
 * WordPress pages that now live on the new sites. Links inside a body to one
 * of these, to another column post or to a product are pointed at the new
 * page, so reading never drops back into the old site. Anything else is left
 * as it is.
 */
const MOVED = pick({
  zh: {
    contact: "/martech/contact/",
    about: "/martech/about/",
    "global-seo": "/martech/seo/",
    academy: "/martech/academy/",
    cases: "/web-design/cases/",
    mall: "/web-design/shop/",
    "privacy-policy": "/martech/privacy-policy/",
    "term-of-use": "/martech/terms/",
  },
  en: {
    "en/about-3": "/martech/en/about/",
    "en/contact-3": "/martech/en/contact/",
    "en/seo-marketing": "/martech/en/seo/",
    "en/service-2": "/martech/en/",
    "en/insights": "/martech/en/column/",
    "en/cases-3": "/web-design/en/cases/",
  },
  ja: {
    "ja/about-2": "/martech/ja/about/",
    "ja/contact-2": "/martech/ja/contact/",
    "ja/service": "/martech/ja/",
    "ja/blog-2": "/martech/ja/column/",
    "ja/cases-2": "/web-design/ja/cases/",
    "ja/private-policy": "/martech/ja/privacy-policy/",
  },
});
const SHOP_PRODUCTS = ["astra-pro", "flatsome"];

function localiseLinks(html, postSlugs, live) {
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
        to = SHOP_PRODUCTS.includes(slug) ? `/web-design/shop/${slug}/` : `/martech${lecturePath(slug, live)}`;
      } else if (!to && thisLanguage && postSlugs.has(own)) {
        to = `${BASE_PATH}${postPath(own, live)}`;
      }
      return to ? `href="${to}${rest}"` : whole;
    },
  );
}

/** Every column post, newest first, without bodies. */
export async function getColumnPosts({ fresh = false } = {}) {
  try {
    const categories = await columnCategoryIds(fresh);
    const posts = await wpJson(
      `posts?categories=${categories.map((c) => c.id).join(",")}&per_page=100&orderby=date&order=desc&_fields=id,slug,date,title,categories`,
      fresh,
    );
    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: decodeEntities(post.title.rendered),
      date: post.date.slice(0, 10),
      category: categories.find((c) => post.categories.includes(c.id))?.slug ?? null,
      href: postPath(post.slug, fresh),
    }));
  } catch (err) {
    console.warn(`WordPress: could not read the column — ${err.message}`);
    return fresh ? null : [];
  }
}

/** One column post with its body, or null. */
export async function getColumnPost(slug, { fresh = false } = {}) {
  try {
    const categories = await columnCategoryIds(fresh);
    const [post] = await wpJson(
      `posts?slug=${toWpSlug(slug)}&_fields=id,slug,date,link,title,excerpt,content,categories,featured_media`,
      fresh,
    );
    const category = post && categories.find((c) => post.categories.includes(c.id));
    if (!category) return null;
    const [images, posts] = await Promise.all([featuredImages([post.featured_media]), getColumnPosts({ fresh })]);
    const slugs = new Set((posts ?? []).map((p) => p.slug));
    const text = plainText(post.content.rendered);
    return {
      slug: post.slug,
      // WordPress's address for the post, where Yoast SEO already ranks it.
      link: post.link,
      title: decodeEntities(post.title.rendered),
      excerpt: plainText(decodeEntities(post.excerpt?.rendered ?? "")),
      date: post.date.slice(0, 10),
      category: category.label,
      categorySlug: category.slug,
      image: images.get(post.featured_media) ?? null,
      html: localiseLinks(cleanBody(post.content.rendered), slugs, fresh),
      // At roughly 400 characters a minute.
      minutes: Math.max(1, Math.round(text.length / 400)),
    };
  } catch (err) {
    console.warn(`WordPress: could not read post "${slug}" — ${err.message}`);
    return null;
  }
}

/** Every lecture's slug (WooCommerce's 課程 category), for their pages. */
export async function getLectureSlugs() {
  try {
    const products = await restJson("wc/store/v1/products?category=courses&per_page=100");
    return products.map((p) => p.slug);
  } catch (err) {
    console.warn(`WordPress: could not list lectures — ${err.message}`);
    return [];
  }
}

/** One lecture with its full description, or null. */
export async function getLecture(slug, { fresh = false } = {}) {
  try {
    const [product] = await restJson(
      `wc/store/v1/products?slug=${toWpSlug(slug)}`,
      fresh,
    );
    if (!product) return null;
    const posts = await getColumnPosts({ fresh });
    const slugs = new Set((posts ?? []).map((p) => p.slug));
    const tag = product.categories.find((c) => !["lastest", "courses"].includes(c.slug));
    const price = Number(product.prices?.price ?? 0) / 10 ** (product.prices?.currency_minor_unit ?? 0);
    return {
      id: product.id,
      slug: product.slug,
      title: decodeEntities(product.name),
      tag: tag ? decodeEntities(tag.name) : null,
      image: product.images?.[0]?.src ?? null,
      // WordPress's product page, where Yoast SEO already ranks it.
      link: product.permalink,
      register: registerHref(product),
      price: price > 0 ? price : null,
      html: localiseLinks(cleanBody(product.description ?? ""), slugs, fresh),
      ...lectureDetails(product.short_description ?? ""),
    };
  } catch (err) {
    console.warn(`WordPress: could not read lecture "${slug}" — ${err.message}`);
    return null;
  }
}
