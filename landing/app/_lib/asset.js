/*
 * In production the export is uploaded to /landing/ while pages are answered at
 * /, /en/ and /ja/, so files from /public must be addressed under /landing.
 * `next dev` serves public/ from the root.
 */
export const SITE_PATH = "/landing";

const PROD = process.env.NODE_ENV === "production";

export const asset = (path) => `${PROD ? SITE_PATH : ""}${path}`;

/** Where each language's page is answered (the language switcher links here). */
export const LOCALE_PATHS = { zh: "/", en: "/en/", ja: "/ja/" };
