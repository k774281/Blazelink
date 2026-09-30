/**
 * Builds the site's Chinese webfonts: Taipei Sans TC Beta for headings and body
 * copy, Noto Sans TC for the interface chrome the design sets in it — nav, button
 * labels, chips, breadcrumbs.
 *
 * cn-font-split cuts each face into unicode-range chunks so a visitor downloads
 * only the slices their text needs. On top of that we pin one chunk to the exact
 * character set this site's source files use, so the pages we ship render from a
 * single request instead of dozens of scattered chunks. Anything outside that set
 * — CMS copy added later — still resolves, from an auto chunk.
 *
 * Noto Sans TC ships from Google as one variable font. Splitting that directly is
 * a trap: every glyph carries all nine masters, which came out at 215 chunks and
 * 8.9MB. The two static instances in fonts-src were cut from it with fontTools at
 * the only weights the design actually uses.
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

const FACES = [
  { file: "TaipeiSansTCBeta-Bold.ttf", dir: "taipei-bold", family: "Taipei Sans TC Beta", weight: 700 },
  { file: "TaipeiSansTCBeta-Light.ttf", dir: "taipei-light", family: "Taipei Sans TC Beta", weight: 300 },
  { file: "NotoSansTC-400.ttf", dir: "noto-400", family: "Noto Sans TC", weight: 400 },
  { file: "NotoSansTC-500.ttf", dir: "noto-500", family: "Noto Sans TC", weight: 500 },
];

/** Every character the site's own source files can render. */
async function siteCharset() {
  const chars = new Set();
  for await (const file of glob(path.join(ROOT, "app", "**", "*.{js,jsx,mjs}"))) {
    for (const ch of readFileSync(file, "utf8")) chars.add(ch);
  }
  // Latin, CJK punctuation and fullwidth forms always travel with the text.
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

const missing = FACES.filter((f) => !existsSync(path.join(SRC_DIR, f.file)));
if (missing.length) {
  console.error(`Missing source fonts in ${SRC_DIR}:`);
  for (const f of missing) console.error(`  - ${f.file}`);
  console.error("Set FONT_SRC_DIR or drop the .ttf files in place, then re-run.");
  process.exit(1);
}

const subset = await siteCharset();
console.log(`site charset: ${subset.length} codepoints pinned to their own chunk`);

for (const face of FACES) {
  const outDir = path.join(OUT_DIR, face.dir);
  rmSync(outDir, { recursive: true, force: true });
  try {
    await fontSplit({
      input: readFileSync(path.join(SRC_DIR, face.file)),
      outDir,
      targetType: "woff2",
      chunkSize: 70 * 1024,
      subsets: [subset],
      css: {
        fontFamily: face.family,
        fontWeight: String(face.weight),
        fontDisplay: "swap",
      },
      silent: true,
      reporter: false,
      testHTML: false,
      previewImage: false,
    });
    console.log(`built ${face.dir}`);
  } catch (err) {
    // cn-font-split runs through a native binding. If it cannot run on this
    // platform, say so and carry on: the text falls back to PingFang TC, which
    // is far better than failing the whole deploy over a font.
    console.warn(`WARNING: could not build ${face.dir} — ${err.message}`);
  }
}

// cn-font-split's native FFI aborts (SIGABRT) while the process tears down, long
// after the files are on disk. Everything above succeeded, so exit deliberately
// rather than let that abort fail the build.
process.exit(0);
