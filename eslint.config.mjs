import js from "@eslint/js";
import next from "eslint-config-next/core-web-vitals";
import ts from "eslint-config-next/typescript";
import jestDom from "eslint-plugin-jest-dom";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig(
  [globalIgnores([".next/", "next-env.d.ts"])],
  {
    files: ["**/*.{js,mjs}"],
    extends: [js.configs.recommended],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [ts],
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    files: ["src/**/*.tsx"],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [next],
    rules: {
      // https://github.com/facebook/react/issues/34775
      "react-hooks/refs": "off",
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}"],
    extends: [
      jestDom.configs["flat/recommended"],
      testingLibrary.configs["flat/react"],
    ],
  },
);

export default eslintConfig;
