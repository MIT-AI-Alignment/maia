#!/usr/bin/env bash
# Run only after the preview is approved and its PR is merged.
set -euo pipefail

if [[ "${1:-}" == "--help" || -z "${1:-}" ]]; then
  echo "Usage: bash scripts/deploy-reviewed-main.sh APPROVED_MERGE_COMMIT"
  echo "Builds a fresh main checkout, then uploads build/ to the MAIA Athena locker."
  exit 0
fi

approved_commit="$1"
if [[ ! "$approved_commit" =~ ^[0-9a-fA-F]{7,40}$ ]]; then
  echo "Pass the reviewed merge commit SHA, not a branch name." >&2
  exit 1
fi

runtime_dir="/Users/nikhil/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
if ! command -v node >/dev/null && [[ -x "$runtime_dir/node" ]]; then
  export PATH="$runtime_dir:$PATH"
fi
command -v node >/dev/null || { echo "Install Node before deploying." >&2; exit 1; }

deploy_dir="$(mktemp -d /private/tmp/maia-reviewed-deploy-XXXXXX)"
git clone --branch main --single-branch https://github.com/MIT-AI-Alignment/maia-website.git "$deploy_dir"
cd "$deploy_dir"
git merge-base --is-ancestor "$approved_commit" HEAD || {
  echo "The approved commit is not on main. Nothing uploaded." >&2
  exit 1
}
if command -v npm >/dev/null; then
  npm ci
else
  npm_launcher="/Users/nikhil/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm"
  [[ -x "$npm_launcher" ]] || { echo "npm is unavailable. Nothing uploaded." >&2; exit 1; }
  "$npm_launcher" --package=npm dlx npm ci
fi
node node_modules/vite/bin/vite.js build
test -s build/index.html
test -s build/events/index.html
test -s build/initiatives/index.html
echo "Built commit $(git rev-parse HEAD). Enter Kerberos credentials yourself."
kinit nvemuri@ATHENA.MIT.EDU
rsync -avz build/ nvemuri@athena.dialup.mit.edu:/mit/aialignment/www/
echo "Upload finished. Verify Home, Research, and Events at https://aialignment.mit.edu/."
echo "Build checkout retained at $deploy_dir"
