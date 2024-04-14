// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");
const createConfig = nextJest({ dir: "./" });

/** @type {import("jest").Config} */
const config = {
  roots: ["<rootDir>/src/"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  setupFiles: ["./jest.polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

module.exports = createConfig(config);
