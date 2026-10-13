import { LOCALE, LOCALES } from "./locale.js";

/*
 * The site lives under /web-design on blazelink.co (the marketing site and
 * WordPress own the rest of the domain); its English and Japanese builds under
 * /web-design/en and /web-design/ja (see ./locale.js). next.config.mjs reads
 * BASE_PATH from here, so the prefix is set in one place.
 *
 * next/link adds it to hrefs by itself; nothing else does. Every file served
 * from /public — next/image and <img> sources, the hero video, images inside
 * WordPress HTML — goes through asset(), which always points at the Chinese
 * build's copy: /public is uploaded once, with that build.
 */

export const SITE_PATH = "/web-design";

export const BASE_PATH = `${SITE_PATH}${LOCALES[LOCALE].path}`;

export const asset = (path) => `${SITE_PATH}${path}`;

/** This page's path in another language, for the language switcher. */
export const localePath = (lang, path = "/") => `${SITE_PATH}${LOCALES[lang].path}${path}`;
