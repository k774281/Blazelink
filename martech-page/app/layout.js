import { Noto_Sans_TC, Space_Grotesk } from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-tc",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Blazelink 鏈客行銷 — 自動化獲客的成長引擎",
  description: "從表單、名單分級到 CRM 全線打通。不只把人帶進來，而是讓每一次進站都留下可追蹤、可交付給業務的名單。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" className={`${notoSansTC.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
