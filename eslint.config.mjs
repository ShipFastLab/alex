import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 共通設定
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  // JavaScript設定
  pluginJs.configs.recommended,
  // TypeScript設定
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: {
      // TypeScriptの特定のルールを緩和
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
];
