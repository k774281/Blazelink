#!/bin/sh
# Builds the landing page, the marketing site and the web-design site as static
# files and packs each into deploy/<name>.zip, with its folder at the top, ready
# to upload and extract into the WordPress root with WP File Manager. All
# three read WordPress at build time, so run this again after publishing posts
# or lectures. The landing page answers /, /en/ and /ja/ through the snippet in
# docs/web-build/wp-snippets/landing-home.php.
#
# The landing page (landing/) carries all three languages in one build, already
# laid out as /landing, /landing/en and /landing/ja (landing/app/_lib/asset.js),
# so it is packed as it comes out of next build.
#
# The two sites are built once per language (NEXT_PUBLIC_LOCALE, see each app's
# locale.js). The Chinese build is the folder itself; the English and Japanese
# builds go inside it as en/ and ja/, without a second copy of /public (their
# pages point at the Chinese build's copy) and without the pages that are
# Chinese only: 鏈客商學院 and the shop.
#
# Once blazelink.co is behind Cloudflare, run it as
#   IMAGE_CDN=cloudflare scripts/package-static.sh
# so images are resized by Cloudflare instead of served full size.
set -e
cd "$(dirname "$0")/.."
mkdir -p deploy
stage=$(mktemp -d)

(cd landing && rm -rf out .next/cache/fetch-cache && npx next build)
cp -R landing/out "$stage/landing"
rm -rf landing/out
rm -f deploy/landing.zip
python3 -I scripts/zipdir.py "$stage" landing "deploy/landing.zip"
echo "deploy/landing.zip"

# app:name:Chinese-only folder
for spec in "martech-page:martech:academy" "wordpress-design:web-design:shop"; do
  app=$(echo "$spec" | cut -d: -f1)
  name=$(echo "$spec" | cut -d: -f2)
  zh_only=$(echo "$spec" | cut -d: -f3)

  for lang in zh en ja; do
    # .next/cache keeps WordPress responses between builds (fetch force-cache);
    # cleared so every package carries what WordPress says now.
    (cd "$app" && rm -rf out .next/cache/fetch-cache && NEXT_PUBLIC_LOCALE=$lang npx next build)
    if [ "$lang" = zh ]; then
      cp -R "$app/out" "$stage/$name"
    else
      cp -R "$app/out" "$stage/$name/$lang"
      # File by file: public/ has folders named like pages (about/, cases/).
      (cd "$app/public" && find . -type f) | while read -r file; do
        rm -f "$stage/$name/$lang/$file"
      done
      find "$stage/$name/$lang" -type d -empty -delete
      if [ -n "$zh_only" ]; then rm -rf "$stage/$name/$lang/$zh_only"; fi
    fi
  done
  rm -rf "$app/out"

  rm -f "deploy/$name.zip"
  python3 -I scripts/zipdir.py "$stage" "$name" "deploy/$name.zip"
  echo "deploy/$name.zip"
done

rm -rf "$stage"
