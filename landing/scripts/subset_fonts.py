"""Subset MiSans TC to the characters the landing page uses, in all three languages.

Re-run after changing copy in app/_data/, or new characters fall back to Noto:

    npm run fonts:subset                      # source: ~/Downloads/MiSans TC/woff2
    python3 scripts/subset_fonts.py "/path/to/MiSans TC/woff2"

Needs fontTools + brotli (pip install fonttools brotli).
"""
import pathlib
import sys

from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "app" / "fonts"
SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else pathlib.Path.home() / "Downloads/MiSans TC/woff2")
WEIGHTS = ["Semibold", "Bold", "Heavy"]
SOURCES = [*(ROOT / "app" / "_data").glob("*.js"), *(ROOT / "app" / "_components").glob("*.jsx")]

# Every character in the copy and components (a safe superset), plus printable
# ASCII and common CJK punctuation so small copy edits don't break.
chars = set()
for f in SOURCES:
    chars |= set(f.read_text(encoding="utf-8"))
chars |= {chr(c) for c in range(0x20, 0x7F)}
chars |= set("，。、；：？！「」『』（）《》〈〉【】…—～・·％＋－＝／")
chars = {c for c in chars if c.isprintable()}

for w in WEIGHTS:
    src = SRC / f"MisansTC-{w}.woff2"
    out = OUT / f"MisansTC-{w}.subset.woff2"
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    font = subset.load_font(str(src), opts)
    sub = subset.Subsetter(opts)
    sub.populate(text="".join(chars))
    sub.subset(font)
    subset.save_font(font, str(out), opts)
    print(f"{out.name}: {src.stat().st_size / 1e6:.2f} MB -> {out.stat().st_size / 1e3:.0f} KB")

print(f"{len(chars)} characters kept")
