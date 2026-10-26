import { fixupConfigRules } from "@eslint/compat";
import * as espree from "espree";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

//? Next.js 16 removed `next lint`, so ESLint runs directly via `pnpm lint`.
//? This flat config replaces the previous `.eslintrc.json` (`extends: next/core-web-vitals`).
//?
//? ESLint 10 shims (eslint-config-next 16.x does not support ESLint 10 yet):
//? 1. `fixupConfigRules` (official v9→v10 transition helper) restores the `context`/`SourceCode` methods
//?    removed in ESLint 10 for bundled plugins that still call them — eslint-plugin-react 7.37.5 crashes
//?    with `contextOrFilename.getFilename is not a function` (`settings.react.version: "detect"`).
//? 2. eslint-config-next parses JS files with Next's compiled `@babel/eslint-parser`, whose ScopeManager
//?    lacks `addGlobals()` (required by ESLint 10) → `scopeManager.addGlobals is not a function`.
//?    Use ESLint's default parser (espree) for plain JS files instead.
const eslintConfig = defineConfig([
	...fixupConfigRules(nextVitals),
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		languageOptions: {
			parser: espree,
			parserOptions: { ecmaFeatures: { jsx: true } },
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
