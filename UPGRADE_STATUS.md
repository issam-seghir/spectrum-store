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

