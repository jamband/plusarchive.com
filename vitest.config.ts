import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
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
