import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "eslint:recommended",
      "plugin:jest-dom/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:testing-library/react",
      "next/core-web-vitals",
      "next/typescript",
    ],
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  }),
];

export default eslintConfig;
