// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");
const createConfig = nextJest({ dir: "./" });

/** @type {import("jest").Config} */
const config = {
  roots: ["<rootDir>/src/"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-fixed-jsdom",
};

module.exports = createConfig(config);
