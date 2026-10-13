import Script from "next/script";
import { GTM_ID, PIXEL_ID } from "../_lib/tracking";

/*
 * Google Tag Manager and Meta Pixel, the snippets the WordPress home page
 * printed through GTM4WP and Meta for WooCommerce. `page` seeds the dataLayer
 * before the container loads, so GTM can tell this page apart from the
 * WordPress ones and from the two sites.
 *
 * Each language is its own document and a language switch is a full page load,
 * so the base code's PageView is the only one there is to count.
 */
export function TrackingScripts({ page }) {
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.dataLayer.push(${JSON.stringify(page)});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>
    </>
  );
}

/** The no-JavaScript fallbacks, first thing in <body>. */
export function TrackingNoScript() {
  return (
    <>
      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
      </noscript>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
