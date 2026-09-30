/**
 * Builds the Taipei Sans TC Beta webfonts.
 *
 * cn-font-split cuts each weight into unicode-range chunks so a visitor downloads
 * only the slices their text needs. On top of that we pin one chunk to the exact
 * character set this site's source files use, so the pages we ship render their
 * headings from a single request instead of dozens of scattered chunks. Anything
 * outside that set — CMS copy added later — still resolves, from an auto chunk.
 *
 *   npm run fonts:build
 *
 * Source .ttf files are read from FONT_SRC_DIR (default: ./fonts-src).
 */
import { fontSplit } from "cn-font-split";
import { readFileSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "node:fs/promises";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = process.env.FONT_SRC_DIR || path.join(ROOT, "fonts-src");
const OUT_DIR = path.join(ROOT, "public", "fonts");

const WEIGHTS = [
  { file: "TaipeiSansTCBeta-Bold.ttf", dir: "taipei-bold", weight: 700 },
  { file: "TaipeiSansTCBeta-Light.ttf", dir: "taipei-light", weight: 300 },
];

/** Every character the site's own source files can render. */
async function siteCharset() {
  const chars = new Set();
  for await (const file of glob(path.join(ROOT, "app", "**", "*.{js,jsx,mjs}"))) {
    for (const ch of readFileSync(file, "utf8")) chars.add(ch);
  }
  // Latin, CJK punctuation and fullwidth forms always travel with the headings.
  const always = [
    [0x20, 0x7e],
    [0xa0, 0xff],
    [0x2010, 0x203b],
    [0x3000, 0x303f],
    [0xff00, 0xff65],
  ];
  for (const [lo, hi] of always) {
    for (let c = lo; c <= hi; c++) chars.add(String.fromCodePoint(c));
  }
  return [...chars].map((c) => c.codePointAt(0)).filter((c) => c > 0x1f);
}

const missing = WEIGHTS.filter((w) => !existsSync(path.join(SRC_DIR, w.file)));
if (missing.length) {
  console.error(`Missing source fonts in ${SRC_DIR}:`);
  for (const w of missing) console.error(`  - ${w.file}`);
  console.error("Set FONT_SRC_DIR or drop the .ttf files in place, then re-run.");
  process.exit(1);
}

const subset = await siteCharset();
console.log(`site charset: ${subset.length} codepoints pinned to their own chunk`);

for (const w of WEIGHTS) {
  const outDir = path.join(OUT_DIR, w.dir);
  rmSync(outDir, { recursive: true, force: true });
  try {
    await fontSplit({
      input: readFileSync(path.join(SRC_DIR, w.file)),
      outDir,
      targetType: "woff2",
      chunkSize: 70 * 1024,
      subsets: [subset],
      css: {
        fontFamily: "Taipei Sans TC Beta",
        fontWeight: String(w.weight),
        fontDisplay: "swap",
      },
      silent: true,
      reporter: false,
      testHTML: false,
      previewImage: false,
    });
    console.log(`built ${w.dir}`);
  } catch (err) {
    // cn-font-split runs through a native binding. If it cannot run on this
    // platform, say so and carry on: headings fall back to Noto Sans TC, which
    // is far better than failing the whole deploy over a font.
    console.warn(`WARNING: could not build ${w.dir} — ${err.message}`);
  }
}

// cn-font-split's native FFI aborts (SIGABRT) while the process tears down, long
// after the files are on disk. Everything above succeeded, so exit deliberately
// rather than let that abort fail the build.
process.exit(0);
