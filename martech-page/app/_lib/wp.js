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
 */

const WP = process.env.WP_BASE_URL ?? "https://blazelink.co";
const REVALIDATE = 3600; // an hour; these lists change a few times a month

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

async function wpJson(path) {
  const res = await fetch(`${WP}/wp-json/wp/v2/${path}`, {
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${path}`);
  return res.json();
}

/**
 * The newest posts in one category, by its slug.
 * Returns [] rather than throwing — see the note at the top of the file.
 */
export async function getPostsByCategory(slug, limit = 6) {
  try {
    const categories = await wpJson(
      `categories?slug=${encodeURIComponent(slug)}&_fields=id`,
    );
    const id = categories?.[0]?.id;
    if (!id) {
      console.warn(`WordPress: no category with slug "${slug}"`);
      return [];
    }

    const posts = await wpJson(
      `posts?categories=${id}&per_page=${limit}&_fields=id,date,link,title`,
    );

    return (posts ?? []).map((post) => ({
      id: post.id,
      title: decodeEntities(post.title.rendered),
      date: post.date.slice(0, 10),
      href: post.link,
    }));
  } catch (err) {
    console.warn(`WordPress: could not read "${slug}" — ${err.message}`);
    return [];
  }
}
