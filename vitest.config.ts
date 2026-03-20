import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    isolate: false,
    maxWorkers: 1,
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
});
