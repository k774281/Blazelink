import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-Hant">
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
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
