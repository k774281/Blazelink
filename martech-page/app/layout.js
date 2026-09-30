import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "Blazelink 鏈客行銷",
  description: "為 B2B 企業、知識服務、跨國品牌打造，自動化獲客的成長引擎。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" className={spaceGrotesk.variable}>
      <head>
        {/*
          Browsers default to restoring the previous scroll position on reload,
          which drops you mid-page and skips the hero's entrance. Switched off
          before hydration so a refresh always starts at the top; links with a
          hash still scroll to their target.
        */}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`if ('scrollRestoration' in history) history.scrollRestoration = 'manual';`}
        </Script>
        {/*
          Both Chinese families come from scripts/build-fonts.mjs. cn-font-split cuts
          each face into unicode-range chunks, so a visitor downloads only the slices
          their text needs while coverage stays complete — including copy that arrives
          later from the CMS. Noto Sans TC used to come from next/font/google, which
          serves generic CJK chunks rather than a subset of this site, and cost 681KB
          per page on its own. Served from /public so the relative url() in each sheet
          resolves next to it.
        */}
        <link rel="stylesheet" href="/fonts/taipei-bold/result.css" />
        <link rel="stylesheet" href="/fonts/taipei-light/result.css" />
        <link rel="stylesheet" href="/fonts/noto-400/result.css" />
        <link rel="stylesheet" href="/fonts/noto-500/result.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
