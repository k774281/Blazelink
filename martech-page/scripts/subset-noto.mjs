/**
 * Cuts Noto Sans TC down to the characters the design actually sets in it.
 *
 * The design uses three families: Taipei Sans TC Beta for headings and body
 * copy, Space Grotesk for latin, and Noto Sans TC for interface chrome — nav,
 * button labels, chips, breadcrumbs, the column lists. Measured across all four
 * pages at three widths, that last group comes to ~360 characters, but a full
 * weight carries every CJK glyph there is, so the split was pinning ~1,400 of
 * them into each Noto face for the sake of a few hundred.
 *
 * Subsetting the source rather than just narrowing the pin is what makes this
 * safe: a character the subset does not carry is not in the font at all, so the
 * browser falls through to the next family in the stack — Taipei — and renders
 * it. The cost of drifting copy is a character in the wrong weight, not a 70KB
 * request for one glyph.
 *
 *   npm run fonts:subset      # after the interface copy changes
 *
 * Google ships Noto Sans TC as one variable font, which is no use to the split
 * directly — every glyph carries all nine masters, which came out at 215 chunks
 * and 8.9MB. This pulls that file, instances the two weights the design uses,
 * and subsets them, so only the ~245KB results are kept in the repo.
 *
 * The character set is fonts-src/noto-charset.txt. To regenerate it, load the
 * built site and collect the text of every node whose computed font-family
 * resolves to Noto Sans TC — the `<script>` tags have to be skipped, or React's
 * flight payload drags the whole page's copy in with it.
 *
 * Needs fontTools:  pip3 install fonttools brotli
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = process.env.FONT_SRC_DIR || path.join(ROOT, "fonts-src");
const CACHE = path.join(ROOT, "node_modules", ".cache", "noto");
const CHARSET = path.join(SRC_DIR, "noto-charset.txt");
const VARIABLE_URL =
  "https://github.com/google/fonts/raw/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf";

const WEIGHTS = [400, 500];

if (!existsSync(CHARSET)) {
  console.error(`Missing ${CHARSET} — see the note at the top of this file.`);
  process.exit(1);
}

mkdirSync(CACHE, { recursive: true });
const variable = path.join(CACHE, "NotoSansTC-variable.ttf");

if (!existsSync(variable)) {
  console.log("fetching the variable Noto Sans TC ...");
  const res = await fetch(VARIABLE_URL);
  if (!res.ok) {
    console.error(`Could not fetch the source font: HTTP ${res.status}`);
    process.exit(1);
  }
  writeFileSync(variable, Buffer.from(await res.arrayBuffer()));
}

for (const weight of WEIGHTS) {
  const instanced = path.join(CACHE, `NotoSansTC-${weight}.ttf`);
  const out = path.join(SRC_DIR, `NotoSansTC-${weight}.ttf`);

  execFileSync(
    "python3",
    [
      "-c",
      [
        "import sys",
        "from fontTools.ttLib import TTFont",
        "from fontTools.varLib import instancer",
        "f = TTFont(sys.argv[1])",
        "instancer.instantiateVariableFont(f, {'wght': float(sys.argv[3])}, inplace=True, updateFontNames=True)",
        "f.save(sys.argv[2])",
      ].join("\n"),
      variable,
      instanced,
      String(weight),
    ],
    { stdio: "inherit" },
  );

  execFileSync(
    "python3",
    [
      "-m", "fontTools.subset", instanced,
      `--text-file=${CHARSET}`,
      `--output-file=${out}`,
      "--layout-features=*",
      "--name-IDs=*",
      "--notdef-outline",
    ],
    { stdio: "inherit" },
  );

  console.log(
    `NotoSansTC-${weight}: ${Math.round(statSync(instanced).size / 1024)}KB -> ` +
      `${Math.round(statSync(out).size / 1024)}KB`,
  );
}
