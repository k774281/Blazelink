import Script from "next/script";
import { GTM_ID } from "../_lib/tracking";

/*
 * Google Tag Manager, the snippet GTM4WP prints on the WordPress pages. `page`
 * seeds the dataLayer with the same keys GTM4WP sets (pagePostType and so on)
 * before the container loads, so its variables read the same on every page.
 *
 * Page views after the first are client-side navigations; GA4's enhanced
 * measurement counts them from browser history changes, which is on by default.
 */
export function TagManagerHead({ page }) {
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];window.dataLayer.push(${JSON.stringify(page)});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** The no-JavaScript fallback, first thing in <body>. */
export function TagManagerBody() {
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
    </noscript>
  );
}
