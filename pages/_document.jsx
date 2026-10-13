import { Html, Head, Main, NextScript } from 'next/document'
import { LOCALE, LOCALES } from '../src/lib/locale.js'

export default function Document() {
  return (
    <Html lang={LOCALES[LOCALE].html}>
      <Head>
        {/* LXGWFasmartGothic only ships weight 400 on emtech; 500/600/700 are browser-synthesized (faux bold) */}
        <link href="https://font.emtech.cc/css/LXGWFasmartGothic/400" rel="stylesheet" />
        {/* GlowSansJP has no 600; 700 substitutes for the "Specialists" label */}
        <link href="https://font.emtech.cc/css/GlowSansJP/500" rel="stylesheet" />
        <link href="https://font.emtech.cc/css/GlowSansJP/700" rel="stylesheet" />

        {/* Urbanist for the Latin hero heading (spec calls for it explicitly; falls back to LXGWFasmartGothic for CJK glyphs) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@600;700&family=Covered+By+Your+Grace&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-598HPVWD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://www.facebook.com/tr?id=1097994839542212&ev=PageView&noscript=1"
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
