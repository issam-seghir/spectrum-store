# Dependency Upgrade Status

Campaign started 2026-10-26 on `main` @ d533762.

## Baseline

- `pnpm audit`: 39 advisories (5 critical, 20 high, 13 moderate, 1 low) across
  next (13), axios (12), brace-expansion (6), sharp (2), follow-redirects (2),
  zod, js-yaml, source-map-js, postcss-selector-parser.
- `scripts/verify.sh`: install PASS · typecheck PASS (0 errors) · lint PASS
  (0 problems) · test SKIPPED (no test script) · build PASS.

## Clusters

| Cluster   | Packages |
|-----------|----------|
| framework | next, eslint-config-next, react, react-dom, @types/react, @types/react-dom (+ transitive sharp) |
| data      | zod, @hookform/resolvers, react-hook-form, axios, zustand, immer, @tanstack/react-table, uuid (+ transitive follow-redirects) |
| ui        | @radix-ui/*, lucide-react, react-hot-toast, react-spinners |
| styling   | tailwindcss, postcss, tailwind-merge, tailwindcss-animate, prettier-plugin-tailwindcss (+ transitive postcss-selector-parser, source-map-js) |
| tooling   | eslint, typescript, prettier, @types/node (+ transitive js-yaml, brace-expansion) |

## Gate log

- [tooling] 09:49 baseline verify (wt-tooling): PASS — install/typecheck/lint/build PASS, test SKIPPED; no peer warnings (note: scripts/verify.sh lacks +x, run via `bash scripts/verify.sh`)
- [styling] 09:50 verify (minor bumps postcss 8.5.31, tailwind-merge 3.7.0): PASS — install/typecheck/lint/build PASS, test SKIPPED; committed e488cad
- [data] 09:52 audit (after minor/security bumps): PASS for data cluster — zod 4.6.7 + axios 1.20.0 clear their advisories; follow-redirects re-resolved 1.16.0→1.16.2 via `pnpm update follow-redirects` (no override needed). Remaining 25 (1 low/8 mod/10 high/5 crit... see final) are next/sharp/brace-expansion/js-yaml/source-map-js/postcss-selector-parser — other clusters.
- [framework] 09:52 research: done — Next 16.4 blog/GH releases + React 19.3.0/19.3.1 notes: no breaking changes for this app; installed docs list no 16.4 codemods (16.3 codemods target Cache Components/partial prefetch, unused here)
- [framework] 09:52 verify (next 16.4.3, eslint-config-next 16.4.3, react/react-dom 19.3.1, @types/react(-dom) 19.3.0): PASS — install PASS · typecheck PASS · lint PASS (0 problems) · test SKIPPED · build PASS (no new deprecation warnings)
- [framework] 09:52 audit: PASS — 0 next/sharp/react advisories remain (sharp resolved to 0.35.5 via next 16.4.3, no override needed); worktree total 39 → 24 (0 critical, 16 high, 8 moderate — all other clusters)
- [framework] 09:52 final: DONE — all 6 packages upgraded, nothing held back; committed 25b3753 on upgrade/framework (not pushed/merged)
- [ui] 09:54 verify (radix x9): PASS — install/typecheck/lint/build PASS, test SKIPPED; no code changes needed; commit d105116
- [data] 09:54 verify (minor/security bumps: zod 4.6.7, rhf 7.91.0, axios 1.20.0, zustand 5.0.16, immer 11.2.9, @tanstack/react-table 9.3.1, uuid 14.0.3): PASS — install PASS, typecheck PASS (0 errors), lint PASS, test SKIPPED, build PASS
- [styling] 09:54 verify (Tailwind v4 codemod, 15f9217): PASS — install/typecheck/lint/build PASS, test SKIPPED; codemod dropped tailwindcss-animate + misordered container screens, fixing next
- [merge] 09:54 framework merged into main (1c9d153): verify PASS — install/typecheck/lint/build PASS, test SKIPPED
- [tooling] 09:55 verify prettier 3.9.6→3.9.10 + @types/node 26.2.0→26.6.5: PASS — all stages PASS (test SKIPPED); prettier --check output identical (65 pre-existing files) on old/new; committed 7471f4e
- [ui] 09:59 verify (lucide-react 1.61.0): PASS — all 27 icons resolve, none deprecated; 4 legacy aliases renamed to canonical (Loader2/MoreHorizontal/Edit/Trash2); trash-2 merged into trash (minor visual change); commit 3b94207
- [ui] 10:00 verify (react-hot-toast 2.6.1, react-spinners 0.17.1): PASS — no API changes affecting bare <Toaster/> or ClipLoader; commit 2cb359f
- [ui] 10:00 final: PASS — all 12 ui packages upgraded, nothing held back; install/typecheck/lint/build PASS, test SKIPPED (= baseline); branch upgrade/ui, 3 commits
- [data] 10:01 verify (@hookform/resolvers 5.9.1→6.0.0 MAJOR): PASS — install/typecheck(0 errors)/lint/build PASS, test SKIPPED; v6 breaking changes are effect-ts only (effect v4); zod/ subpath byte-identical to 5.9.1; type probe confirmed zodResolver input/output inference for product-form; no code changes needed
- [data] 10:01 final: DONE — all 8 data packages upgraded, none held back; commits ace4527, c5c013e on upgrade/data; worktree audit 24 (1 low/8 mod/10 high/5 crit), 0 in data-cluster packages (correction to earlier entry: 24 remaining, not 25) — rest are next/sharp, eslint (brace-expansion/js-yaml), tailwind/postcss (postcss-selector-parser, source-map-js)
- [merge] 10:01 ui merged into main (35a9891): verify PASS — lockfile conflict resolved by regenerating from merged package.json
- [styling] 10:01 verify (Tailwind v4 manual fixes, b4144d3): PASS — install/typecheck/lint/build PASS, test SKIPPED; tailwindcss-animate -> tw-animate-css 1.4.0, shadcn @theme inline, container/opacity fixes
- [styling] 10:01 css sanity check: PASS — theme tokens (:root/.dark vars, radius, font-sans), tw-animate-css + custom keyframes (fadeIn, text), renamed utilities present in emitted CSS; unused keyframes (marquee/blink/accordion) tree-shaken as expected
- [styling] 10:01 pnpm audit: postcss-selector-parser moderate GONE (tailwindcss 3 removed); totals crit 5/high 20/mod 12/low 1; remaining source-map-js high is via next>postcss@8.5.23 (framework cluster), no styling-owned advisories left
- [styling] 10:02 final decision: KEEP Tailwind v4.3.3 — branch upgrade/styling (e488cad, 15f9217, b4144d3) verify PASS; needs human visual check (container widths, gray palette oklch, space-x/y selectors, hover-on-touch, toast/dialog animations)
- [merge] 10:03 data merged into main (30c75c2): verify PASS — audit now 9 (6 high, 3 moderate)
- [merge] 10:04 styling merged into main (a2f6b43): verify PASS — audit now 8 (6 high, 2 moderate); lucide icon renames from ui survived the codemod class changes
- [tooling] 10:05 verify eslint 9.39.5→10.13.0 (bare): FAIL — lint crashes: "react/display-name: contextOrFilename.getFilename is not a function" (eslint-plugin-react 7.37.5), then "scopeManager.addGlobals is not a function" on every .js/.mjs (eslint-config-next's parser = next/dist/compiled/babel/eslint-parser; addGlobals also absent in next 16.4.3 and 16.5.0-canary.27)
- [tooling] 10:05 verify eslint 10.13.0 + shims (@eslint/compat fixupConfigRules + espree for JS files): PASS — 67 rules identical to eslint 9, canary identical; but unmet peer eslint for eslint-plugin-react 7.37.5 (^9.7 max), eslint-plugin-import 2.32.0 (^9), eslint-plugin-jsx-a11y 6.10.2 (^9); committed 92f7193 as attempt
- [tooling] 10:05 decision eslint: HELD BACK at 9.39.5 (reverted in c66bc57) — why we are staying: eslint-config-next (16.3.1/16.4.3/16.5 canary) not ESLint-10-ready: Next's compiled babel eslint-parser lacks ScopeManager.addGlobals (crash on all JS files), eslint-plugin-react calls removed context.getFilename, and react/import/jsx-a11y plugins' peer ranges stop at eslint ^9. Working shim recipe kept in 92f7193 for later
- [tooling] 10:06 audit + verify transitive refresh (pnpm update brace-expansion js-yaml): PASS — brace-expansion 1.1.18→1.1.21 & 5.0.9→5.0.12, js-yaml 4.3.1→4.3.2, no overrides; audit 39→32 (0 tooling advisories left); verify all PASS; committed a931d8c
- [tooling] 10:07 verify typescript 5.9.3→6.0.3: PASS — tsc 0 errors, lint 0 problems (canary identical), next build PASS; no tsconfig changes, no peer warnings; committed 40a03c5
- [tooling] 10:07 verify typescript 7.0.2 (direct): FAIL — tsc 7 0 errors and Next 16.3 builds via tsc CLI, but lint crashes "Error: typescript-eslint does not support TS 7.0." (eslint-config-next imports typescript-eslint 8.x; peer typescript ">=4.8.4 <6.1.0", 8 unmet peer warnings; TS 7.0 ships no JS API)
- [tooling] 10:07 verify typescript 7 side-by-side (typescript=npm:@typescript/typescript6, @typescript/native=npm:typescript@7.0.2, per TS 7 announcement): FAIL — lint OK but next build: "do not have the required package(s) installed - typescript" (Next resolves typescript/package.json bin.tsc; typescript6 only ships tsc6)
- [tooling] 10:07 decision typescript: UPGRADED to 6.0.3, HELD BACK from 7.x — why we are staying: no TS 7 JS API → typescript-eslint (via eslint-config-next) refuses TS 7; official side-by-side alias breaks next build's tsc lookup. Revisit when typescript-eslint supports TS 7.1 API
- [tooling] 10:08 final verify upgrade/tooling @ 40a03c5: PASS — install/typecheck/lint/build PASS, test SKIPPED, 0 peer warnings; audit 32 (1 low/11 mod/15 high/5 crit, none from tooling); upgraded prettier 3.9.10, @types/node 26.6.5, typescript 6.0.3; held: eslint 9.39.5 (no ESLint 10 support in eslint-config-next), typescript 7 (no JS API for typescript-eslint)
- [merge] 10:09 tooling merged into main (d90abe6): verify PASS — lockfile refreshed (brace-expansion, js-yaml, source-map-js); audit 0 advisories

## Outcome

- `pnpm audit`: **39 → 0** advisories.
- `scripts/verify.sh` on main after all merges: install PASS · typecheck PASS · lint PASS (67 rules active, same as baseline) · test SKIPPED · build PASS.

### Held back — why we are staying

| Package | Staying on | Latest | Blocking evidence |
|---|---|---|---|
| eslint | 9.39.5 (latest 9.x) | 10.13.0 | eslint-plugin-react 7.37.5 calls removed `context.getFilename()` → `TypeError: Error while loading rule 'react/display-name': contextOrFilename.getFilename is not a function`; Next's bundled babel eslint-parser lacks `scopeManager.addGlobals` → `TypeError: scopeManager.addGlobals is not a function` on every .js/.mjs (still true in next 16.4.3 and 16.5.0-canary.27). Peer ranges: eslint-plugin-react `^9.7`, eslint-plugin-import `^9`, eslint-plugin-jsx-a11y `^9`. A shimmed version (`@eslint/compat` + espree) passes and is preserved in history at 92f7193 on upgrade/tooling (reverted in c66bc57). Revisit when eslint-config-next ships ESLint 10 support. |
| typescript | 6.0.3 | 7.0.2 | typescript-eslint (via eslint-config-next) peer `typescript >=4.8.4 <6.1.0` and `Error: typescript-eslint does not support TS 7.0.` (TS 7 ships no JS API). The side-by-side alias recipe (`@typescript/typescript6` + `@typescript/native`) fixes lint but `next build` fails: it resolves `typescript/package.json` → `bin.tsc`, and typescript6 ships only `tsc6`. |
