import nextJest from "next/jest.js";

const createConfig = nextJest({ dir: "./" });

export default createConfig({
  roots: ["<rootDir>/src/"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-fixed-jsdom",
});
