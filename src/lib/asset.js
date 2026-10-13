import { LOCALE } from './locale.js'

/*
 * On blazelink.co the landing page is uploaded to /landing/ and answered at /
 * (and its English and Japanese builds at /en/ and /ja/, from /landing/en/ and
 * /landing/ja/) — docs/web-build/landing-cutover.md. /public is uploaded once,
 * with the Chinese build, so its files are always under /landing.
 * `next dev` serves public/ from the root.
 */
const PROD = process.env.NODE_ENV === 'production'

export const ASSET_PREFIX = PROD ? '/landing' : ''

/** Where this build's own scripts live (next.config.mjs assetPrefix). */
export const BUILD_PREFIX = PROD ? `/landing${LOCALE === 'zh' ? '' : `/${LOCALE}`}` : ''

export const asset = (path) => `${ASSET_PREFIX}${path}`
