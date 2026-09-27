import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../public/images/", import.meta.url).pathname;
const SOURCE = new Set([".png", ".jpg", ".jpeg"]);
const MAX_WIDTH = 1600;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (SOURCE.has(extname(entry.name).toLowerCase())) yield path;
  }
}

const exists = (p) => stat(p).then(() => true, () => false);
const kb = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;

let converted = 0;
for await (const src of walk(ROOT)) {
  const out = src.slice(0, -extname(src).length) + ".webp";
  if (await exists(out)) continue;
  const before = (await stat(src)).size;
  const info = await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80, alphaQuality: 100, effort: 6 })
    .toFile(out);
  console.log(`${src.replace(ROOT, "")} ${kb(before)} -> ${out.replace(ROOT, "")} ${kb(info.size)}`);
  converted++;
}
console.log(converted ? `Converted ${converted} image(s). The originals can be deleted.` : "Nothing to convert.");
