import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

//? Next.js 16 removed `next lint`, so ESLint runs directly via `pnpm lint`.
//? This flat config replaces the previous `.eslintrc.json` (`extends: next/core-web-vitals`).
const eslintConfig = defineConfig([
	...nextVitals,
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
