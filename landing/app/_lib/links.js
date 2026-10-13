/*
 * Where the landing page sends people, per language. Everything points at the
 * new sites — the marketing site and the web-design site each have a build per
 * language — never at a WordPress page.
 */

const LANG_PATH = { zh: "", en: "/en", ja: "/ja" };

export function linksFor(locale) {
  const p = LANG_PATH[locale];
  return {
    martech: `/martech${p}/`,
    webDesign: `/web-design${p}/`,
    privacy: `/web-design${p}/privacy-policy/`,
    terms: `/web-design${p}/terms/`,
    // A post with a page in the marketing site's build, and one newer than that build.
    post: (slug) => `/martech${p}/column/${slug}/`,
    postReader: (slug) => `/martech${p}/column/read/?slug=${encodeURIComponent(slug)}`,
  };
}
