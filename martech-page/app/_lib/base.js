import { LOCALE, LOCALES } from "./locale.js";

/*
 * The marketing site lives under /martech, beside the landing page at / and the
 * web-design site at /web-design; its English and Japanese builds under
 * /martech/en and /martech/ja (see ./locale.js). next.config.mjs reads
 * BASE_PATH from here, so the prefix is set in one place.
 *
 * next/link adds it to hrefs by itself; nothing else does. Every file served
 * from /public — next/image and <img> sources, the font stylesheets — goes
 * through asset(), which always points at the Chinese build's copy: /public is
 * uploaded once, with that build, rather than once per language.
 */

export const SITE_PATH = "/martech";

export const BASE_PATH = `${SITE_PATH}${LOCALES[LOCALE].path}`;

export const asset = (path) => `${SITE_PATH}${path}`;

/*
 * The web-design site's home in this language. It is another build, so links
 * to it are plain anchors: next/link would put /martech in front.
 */
export const WEB_DESIGN_HOME = `/web-design${LOCALES[LOCALE].path}/`;
export const isOtherSite = (href) => href.startsWith("/web-design/");

/** This page's path in another language, for the language switcher. */
export const localePath = (lang, path = "/") => `${SITE_PATH}${LOCALES[lang].path}${path}`;
