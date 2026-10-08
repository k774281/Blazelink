#!/bin/sh
# Builds the marketing site and the web-design site as static files and packs
# each into deploy/<name>.zip, with its folder at the top, ready to upload and
# extract into the WordPress root with WP File Manager. Both read WordPress at
# build time, so run this again after publishing posts or lectures.
set -e
cd "$(dirname "$0")/.."
mkdir -p deploy
stage=$(mktemp -d)

for pair in "martech-page:martech" "wordpress-design:web-design"; do
  app=${pair%%:*}; name=${pair#*:}
  (cd "$app" && rm -rf out && npx next build)
  cp -R "$app/out" "$stage/$name"
  rm -f "deploy/$name.zip"
  (cd "$stage" && zip -qr -X "$OLDPWD/deploy/$name.zip" "$name" -x "*.DS_Store")
  echo "deploy/$name.zip"
done

rm -rf "$stage"
