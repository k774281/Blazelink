import localFont from "next/font/local";
import { IBM_Plex_Sans, Noto_Sans_JP, Noto_Sans_TC } from "next/font/google";

/*
 * MiSans TC (headings) is subset to the characters the three copy files use —
 * re-run `npm run fonts:subset` after changing copy. Characters it lacks (some
 * Japanese kanji forms, new copy) fall back to the language's Noto face.
 * Heavy is the family's heaviest cut, so it answers both 800 and 900.
 */
const misans = localFont({
  src: [
    { path: "../fonts/MisansTC-Semibold.subset.woff2", weight: "600" },
    { path: "../fonts/MisansTC-Bold.subset.woff2", weight: "700" },
    { path: "../fonts/MisansTC-Heavy.subset.woff2", weight: "800" },
    { path: "../fonts/MisansTC-Heavy.subset.woff2", weight: "900" },
  ],
  variable: "--font-misans",
  display: "swap",
});

const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex", display: "swap" });

// CJK faces are large; Google serves them in unicode-range slices, so don't preload.
const notoTC = Noto_Sans_TC({ weight: ["400", "500", "700", "900"], variable: "--font-cjk", display: "swap", preload: false });
const notoJP = Noto_Sans_JP({ weight: ["400", "500", "700", "900"], variable: "--font-cjk", display: "swap", preload: false });

/** Class names that define the font CSS variables for a language's <html>. */
export const fontClasses = (locale) =>
  [misans.variable, plex.variable, (locale === "ja" ? notoJP : notoTC).variable].join(" ");
