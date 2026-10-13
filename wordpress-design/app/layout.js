import { DM_Mono, Montserrat, Noto_Sans_TC } from "next/font/google";
import { TagManagerBody, TagManagerHead } from "./_components/TagManager";
import MetaPixel from "./_components/MetaPixel";
import { LOCALE, LOCALES } from "./_lib/locale";
import { ui } from "./_data/ui";
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

/*
 * Site-wide SEO defaults, matching what Yoast SEO prints on the WordPress
 * pages (zh_TW locale, site name, absolute URLs on blazelink.co). Each page
 * sets its own title, description and canonical on top — never here, where
 * every page would inherit one canonical.
 */
export const metadata = {
  metadataBase: new URL("https://blazelink.co"),
  title: ui.meta.home.title,
  description: ui.meta.home.description,
  openGraph: { type: "website", locale: LOCALES[LOCALE].og, siteName: "BlazeLink鏈客行銷" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  // zh-TW, en or ja, as Polylang declares the WordPress site's languages.
  return (
    <html lang={LOCALES[LOCALE].html} className={`${noto.variable} ${montserrat.variable} ${dmMono.variable}`}>
      <body>
        <TagManagerBody />
        {children}
        <TagManagerHead page={{ siteSection: "web-design", language: LOCALE }} />
        <MetaPixel />
      </body>
    </html>
  );
}
