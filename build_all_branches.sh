#!/bin/sh
set -eu

# Only build these branches (in this order).
BRANCHES="main 1.1"

# Which one should "/" redirect to?
DEFAULT="1.1"

# Clean working dirs
rm -rf public base process
mkdir -p base process

# Root redirect
cat > base/index.html <<EOF
<!doctype html>
<html><head>
  <meta charset="utf-8" />
  <title>Redirecting…</title>
  <script>window.location.replace("./${DEFAULT}/");</script>
  <noscript><meta http-equiv="refresh" content="0; url=./${DEFAULT}/"></noscript>
</head><body></body></html>
EOF

touch base/.nojekyll
: > base/versions.txt

echo "Building branches: ${BRANCHES}"
echo "Default: ${DEFAULT}"

# Fetch only what we need
git fetch origin main 1.1

# Install site deps once (deterministic)
npm ci --prefix site

for BRANCH in $BRANCHES; do
  echo "==> Building ${BRANCH}"

  git checkout --force "origin/${BRANCH}"

  # Clean per-branch staging dirs
  rm -rf public process
  mkdir -p public process

  # --- Update Next config FIRST (so processing picks up correct env values) ---
  # basePath -> /kasm-registry/<branch>
  sed -i -E "s|^([[:space:]]*basePath:[[:space:]]*)['\"][^'\"]*['\"]|\1'/kasm-registry/${BRANCH}'|" site/next.config.js

  # env.icon -> .../<branch>/swlogo.png
  sed -i -E "s|^([[:space:]]*icon:[[:space:]]*)['\"][^'\"]*['\"]|\1'https://vk9d.github.io/kasm-registry/${BRANCH}/swlogo.png'|" site/next.config.js

  # env.listUrl -> .../<branch>/
  sed -i -E "s|^([[:space:]]*listUrl:[[:space:]]*)['\"][^'\"]*['\"]|\1'https://vk9d.github.io/kasm-registry/'|" site/next.config.js

  # Tell processing which channel this is (if you adopt the env-based default_channel logic)
  export KASM_CHANNEL="${BRANCH}"

  # 1) Generate registry JSON/icons into ./public
  node processing

  # Snapshot processing output so Next export can't wipe it
  cp -a public/. process/

  # 2) Export the site into ./public (distDir is ../public)
  npm run deploy --prefix site

  # Merge registry outputs back in (export can overwrite/clean)
  cp -a process/. public/

  # Move to final output structure
  mkdir -p "base/${BRANCH}"
  cp -a public/. "base/${BRANCH}/"

  echo "${BRANCH}" >> base/versions.txt
done

# versions.json (top-level)
python3 - <<'PY'
import json
vers=[]
with open("base/versions.txt","r",encoding="utf-8") as f:
    vers=[ln.strip() for ln in f if ln.strip()]
with open("base/versions.json","w",encoding="utf-8") as f:
    json.dump({"versions": vers}, f)
PY

rm -rf public
mv base public

echo "Done. Output in ./public"
