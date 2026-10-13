import { fontClasses } from "./fonts";
import { LOCALE_PATHS } from "./asset";
import { TrackingNoScript, TrackingScripts } from "../_components/Tracking";

/*
 * Each language has its own root layout (route groups (zh), (en), (ja)) so the
 * exported HTML carries the right <html lang>. Switching language is a full
 * page load, as it is between the live site's /, /en/ and /ja/.
 *
 * This page replaces the WordPress home page, so it says what Yoast SEO and
 * Polylang said there: canonical /, the en and ja homes as alternates, the
 * same description, share image and favicons, and the same Organization and
 * WebSite data. The files still live in WordPress's uploads folder, which is
 * on the same host and keeps their URLs.
 */

const SITE = "https://blazelink.co";
const SHARE_IMAGE = `${SITE}/wp-content/uploads/2026/02/鏈客Logo-meta-1.png`;

/** Facebook's locale names, as Polylang declared them on the WordPress home. */
const OG_LOCALES = { zh: "zh_TW", en: "en_US", ja: "ja_JP" };

export function metadataFor(t) {
  const home = LOCALE_PATHS[t.locale];
  return {
    metadataBase: new URL(SITE),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: home,
      languages: { "zh-TW": LOCALE_PATHS.zh, en: LOCALE_PATHS.en, ja: LOCALE_PATHS.ja, "x-default": LOCALE_PATHS.zh },
    },
    openGraph: {
      type: "website",
      url: home,
      title: t.meta.title,
      description: t.meta.description,
      siteName: "BlazeLink鏈客行銷",
      locale: OG_LOCALES[t.locale],
      alternateLocale: Object.entries(OG_LOCALES)
        .filter(([lang]) => lang !== t.locale)
        .map(([, og]) => og),
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [SHARE_IMAGE] },
    icons: {
      icon: [
        { url: `${SITE}/wp-content/uploads/2025/11/cropped-鏈客Logo-icon-32x32.png`, sizes: "32x32" },
        { url: `${SITE}/wp-content/uploads/2025/11/cropped-鏈客Logo-icon-192x192.png`, sizes: "192x192" },
      ],
    },
  };
}

/** The Organization and WebSite graph Yoast printed on the WordPress home. */
function structuredData(t) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Blazelink鏈客策略行銷",
        url: `${SITE}/`,
        logo: SHARE_IMAGE,
        email: "service@blazelink.co",
        telephone: "+886-2-6603-9088",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        name: "BlazeLink鏈客行銷",
        url: `${SITE}/`,
        inLanguage: t.htmlLang,
        publisher: { "@id": `${SITE}/#organization` },
      },
    ],
  };
}

export function RootHtml({ t, children }) {
  return (
    <html lang={t.htmlLang} className={fontClasses(t.locale)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(t)) }}
        />
      </head>
      <body>
        <TrackingNoScript />
        {children}
        <TrackingScripts page={{ siteSection: "landing", language: t.locale }} />
      </body>
    </html>
  );
}
