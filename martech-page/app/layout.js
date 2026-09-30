import { Space_Grotesk, Noto_Sans_TC } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// CJK families ship as many unicode-range chunks, so they are not preloaded.
const notoSansTC = Noto_Sans_TC({
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-tc",
  display: "swap",
  preload: false,
});

export const metadata = {
  title: "Blazelink 鏈客行銷",
  description: "為 B2B 企業、知識服務、跨國品牌打造，自動化獲客的成長引擎。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" className={`${spaceGrotesk.variable} ${notoSansTC.variable}`}>
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
          Taipei Sans TC Beta carries the headings. cn-font-split cuts each weight into
          unicode-range chunks, so a visitor downloads only the slices their text needs
          while coverage stays complete — including copy that arrives later from the CMS.
          Served from /public so the relative url() in each sheet resolves next to it.
        */}
        <link rel="stylesheet" href="/fonts/taipei-bold/result.css" />
        <link rel="stylesheet" href="/fonts/taipei-light/result.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
