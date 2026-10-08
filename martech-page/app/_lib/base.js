/*
 * The marketing site lives under /martech, beside the landing page at / and the
 * web-design site at /web-design. next.config.mjs reads BASE_PATH from here, so
 * the prefix is set in one place.
 *
 * next/link adds it to hrefs by itself; nothing else does. Every file served
 * from /public — next/image and <img> sources, the font stylesheets — and every
 * fetch to this site's own API goes through asset().
 */

export const BASE_PATH = "/martech";

export const asset = (path) => `${BASE_PATH}${path}`;
