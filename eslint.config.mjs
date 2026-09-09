import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import astro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import-x";

import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Global ignores
  {
    ignores: ["node_modules", "dist", ".astro"],
  },

  // Astro recommended (parser + rules for .astro)
  ...astro.configs["flat/recommended"],

  // TypeScript/TSX with type-aware rules
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
    },
    rules: {
      ...(tseslint.configs["recommended-type-checked"].rules ?? {}),
      ...(tseslint.configs["stylistic-type-checked"].rules ?? {}),
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
    },
  },

  // Disable conflicting stylistic rules when using Prettier
  eslintConfigPrettier,
];
