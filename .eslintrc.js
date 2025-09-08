module.exports = {
  root: true,
  extends: ["plugin:astro/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  overrides: [
    // Astro files
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
      rules: {},
    },
    // TypeScript/TSX files
    {
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
      plugins: ["@typescript-eslint", "import", "jsx-a11y"],
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:jsx-a11y/recommended",
        "prettier",
      ],
      rules: {
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
  ],
};
