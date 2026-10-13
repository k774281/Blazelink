/*
 * One build per language: scripts/package-static.sh builds the landing page
 * with NEXT_PUBLIC_LOCALE set to zh, en and ja. On blazelink.co the Chinese
 * one answers /, the English /en/ and the Japanese /ja/ (see
 * docs/web-build/wp-snippets/landing-home.php). Chinese is the default.
 */
import zh from '../i18n/zh.js'
import en from '../i18n/en.js'
import ja from '../i18n/ja.js'

export const LOCALES = {
  zh: { html: 'zh-TW', og: 'zh_TW', hreflang: 'zh-TW', label: '中文', home: '/', site: '' },
  en: { html: 'en', og: 'en_US', hreflang: 'en', label: 'English', home: '/en/', site: '/en' },
  ja: { html: 'ja', og: 'ja_JP', hreflang: 'ja', label: '日本語', home: '/ja/', site: '/ja' },
}

export const LOCALE = LOCALES[process.env.NEXT_PUBLIC_LOCALE] ? process.env.NEXT_PUBLIC_LOCALE : 'zh'

/** This build's copy. */
export const t = { zh, en, ja }[LOCALE]

/** A page of the marketing or web-design site in this build's language. */
export const sitePath = (section, path = '/') => `/${section}${LOCALES[LOCALE].site}${path}`
