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
        href: product.link,
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
 * The newest posts in one category, by its slug.
 * Returns [] rather than throwing — see the note at the top of the file.
 */
export async function getPostsByCategory(slug, limit = 6, { withImages = false } = {}) {
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
      `posts?categories=${id}&per_page=${limit}&_fields=id,date,link,title,featured_media`,
    );

    // The column lists are text only, so the extra media call is skipped there.
    const images = withImages
      ? await featuredImages((posts ?? []).map((post) => post.featured_media))
      : new Map();

    return (posts ?? []).map((post) => ({
      id: post.id,
      title: decodeEntities(post.title.rendered),
      date: post.date.slice(0, 10),
      href: post.link,
      image: images.get(post.featured_media) ?? null,
    }));
  } catch (err) {
    console.warn(`WordPress: could not read "${slug}" — ${err.message}`);
    return [];
  }
}
