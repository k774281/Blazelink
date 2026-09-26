import "./globals.css";

export const metadata = {
  title: "Blazelink 鏈客行銷",
  description: "為 B2B 企業、知識服務、跨國品牌打造，自動化獲客的成長引擎。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
