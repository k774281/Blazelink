import { DM_Mono, Montserrat, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

/*
 * Noto Sans TC comes from next/font/google for now so slicing can start. The
 * marketing site found this costs ~680KB per page and moved to cn-font-split;
 * this site should follow once its pages are done and the charset is settled.
 */
const noto = Noto_Sans_TC({
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
  preload: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata = {
  title: "形象網站設計與 WordPress 架站｜Blazelink 鏈客",
  description: "從設計藍圖到上線，為品牌打造兼具美感與功能的形象網站。先看設計、再開工，網站資產完全屬於你。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" className={`${noto.variable} ${montserrat.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
