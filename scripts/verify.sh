#!/usr/bin/env bash
# Runs install → typecheck → lint → test → build and prints a PASS/FAIL/SKIPPED
# summary per stage. Exits non-zero if any stage fails.
#
# Build runs `next build` directly instead of `pnpm build`, because the
# `postbuild` hook (next-sitemap) rewrites the tracked public/sitemap.xml and
# public/robots.txt files.
#
# Usage: scripts/verify.sh            (from any directory inside the repo/worktree)
#        LOG_DIR=/some/dir scripts/verify.sh   (keep full per-stage logs there)

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" || exit 1

LOG_DIR="${LOG_DIR:-$(mktemp -d)}"
mkdir -p "$LOG_DIR"

declare -a STAGES=()
declare -A RESULT=()
FAILED=0

has_script() {
    node -e "process.exit(require('./package.json').scripts?.['$1'] ? 0 : 1)"
}

run_stage() {
    local name="$1"; shift
    STAGES+=("$name")
    echo "──▶ $name: $*"
    if "$@" >"$LOG_DIR/$name.log" 2>&1; then
        RESULT[$name]="PASS"
    else
        RESULT[$name]="FAIL"
        FAILED=1
        echo "    last lines of $LOG_DIR/$name.log:"
        tail -n 25 "$LOG_DIR/$name.log" | sed 's/^/    | /'
    fi
}

skip_stage() {
    STAGES+=("$1")
    RESULT[$1]="SKIPPED ($2)"
}

run_stage install pnpm install

if [[ -f tsconfig.json ]]; then
    run_stage typecheck pnpm exec tsc --noEmit
else
    skip_stage typecheck "no tsconfig.json"
fi

if has_script lint; then
    run_stage lint pnpm run lint
else
    skip_stage lint "no lint script"
fi

if has_script test; then
    run_stage test pnpm run test
else
    skip_stage test "no test script"
fi

if has_script build; then
    run_stage build pnpm exec next build
else
    skip_stage build "no build script"
fi

echo
echo "════ verify summary ($ROOT) ════"
for s in "${STAGES[@]}"; do
    printf '  %-10s %s\n' "$s" "${RESULT[$s]}"
done
echo "  logs: $LOG_DIR"
if [[ $FAILED -eq 0 ]]; then
    echo "  OVERALL: PASS"
else
    echo "  OVERALL: FAIL"
fi
exit $FAILED
