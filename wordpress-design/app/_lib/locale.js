/*
 * One build per language. scripts/package-static.sh builds this site three
 * times with NEXT_PUBLIC_LOCALE set to zh, en and ja; each build is a complete
 * static site under its own path (/web-design/, /web-design/en/, /web-design/ja/), and
 * every page reads its copy for that language from _data/<lang>/.
 *
 * Chinese is the default, so a plain `next dev` or `next build` is the
 * Chinese site.
 */

export const LOCALES = {
  zh: { html: "zh-TW", og: "zh_TW", hreflang: "zh-TW", label: "中文", path: "" },
  en: { html: "en", og: "en_US", hreflang: "en", label: "English", path: "/en" },
  ja: { html: "ja", og: "ja_JP", hreflang: "ja", label: "日本語", path: "/ja" },
};

export const LOCALE = LOCALES[process.env.NEXT_PUBLIC_LOCALE] ? process.env.NEXT_PUBLIC_LOCALE : "zh";

export const IS_ZH = LOCALE === "zh";

/** Picks this build's value from { zh, en, ja }. */
export const pick = (byLocale) => byLocale[LOCALE];
