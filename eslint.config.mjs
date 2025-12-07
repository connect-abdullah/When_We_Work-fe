import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },
  {
    rules: {
      // React & Next.js Rules
      "react/no-unescaped-entities": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",

      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // General Code Quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "warn",
      "prefer-const": "warn",
      "no-var": "error",

      // Best Practices
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "default-case": "warn",
      "no-else-return": "warn",
      "no-empty-function": "warn",
      "no-implicit-coercion": "warn",
      "no-lone-blocks": "error",
      "no-return-await": "error",
      "require-await": "warn",

      // Style & Formatting (handled by Prettier, but good to have)
      "no-trailing-spaces": "warn",
      "eol-last": ["warn", "always"],
      "comma-dangle": ["warn", "always-multiline"],
      semi: ["error", "always"],
      quotes: ["warn", "double", { avoidEscape: true }],

      // Import Rules
      "sort-imports": [
        "warn",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
    },
  },
];

export default eslintConfig;
