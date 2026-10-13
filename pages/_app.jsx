import Head from 'next/head'
import Script from 'next/script'
import '../src/App.css'
import '../styles/next-root.css'
import { LOCALE, LOCALES, t } from '../src/lib/locale.js'

/*
 * This page replaces the WordPress home page, so it says what Yoast SEO and
 * Polylang said there: canonical /, the en and ja homes as alternates, the
 * same description and share image, and the same GTM container GTM4WP loads.
 */
const SITE = 'https://blazelink.co'
const TITLE = t.meta.title
const DESCRIPTION = t.meta.description
const HOME = `${SITE}${LOCALES[LOCALE].home}`
const SHARE_IMAGE = `${SITE}/wp-content/uploads/2026/02/鏈客Logo-meta-1.png`
const GTM_ID = 'GTM-598HPVWD'
// The Meta Pixel code Meta gave for the new sites (also in martech-page and
// wordpress-design, app/_lib/tracking.js).
const PIXEL_ID = '1097994839542212'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Blazelink鏈客策略行銷',
      url: `${SITE}/`,
      logo: SHARE_IMAGE,
      email: 'service@blazelink.co',
      telephone: '+886-2-6603-9088',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'BlazeLink鏈客行銷',
      url: `${SITE}/`,
      inLanguage: LOCALES[LOCALE].html,
      publisher: { '@id': `${SITE}/#organization` },
    },
  ],
}

export default function BlazelinkApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={HOME} />
        {Object.values(LOCALES).map((l) => (
          <link key={l.hreflang} rel="alternate" hrefLang={l.hreflang} href={`${SITE}${l.home}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />
        <meta property="og:locale" content={LOCALES[LOCALE].og} />
        {Object.entries(LOCALES)
          .filter(([lang]) => lang !== LOCALE)
          .map(([lang, l]) => (
            <meta key={lang} property="og:locale:alternate" content={l.og} />
          ))}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BlazeLink鏈客行銷" />
        <meta property="og:url" content={HOME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={SHARE_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href={`${SITE}/wp-content/uploads/2025/11/cropped-鏈客Logo-icon-32x32.png`} sizes="32x32" />
        <link rel="icon" href={`${SITE}/wp-content/uploads/2025/11/cropped-鏈客Logo-icon-192x192.png`} sizes="192x192" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      {/* GTM4WP's container, with the page tagged so GTM can tell it apart. */}
      <Script id="gtm" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({siteSection:'landing',language:'${LOCALE}'});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <Component {...pageProps} />
    </>
  )
}
