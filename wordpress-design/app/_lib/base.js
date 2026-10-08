/*
 * The site lives under /web-design on blazelink.co (the marketing site and
 * WordPress own the rest of the domain). next.config.mjs reads BASE_PATH from
 * here, so the prefix is set in one place.
 *
 * next/link adds it to hrefs by itself; nothing else does. Every file served
 * from /public — next/image and <img> sources, the hero video, images inside
 * WordPress HTML — and every fetch to this site's own API goes through asset().
 */

export const BASE_PATH = "/web-design";

export const asset = (path) => `${BASE_PATH}${path}`;
