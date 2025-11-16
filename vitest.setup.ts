import "@testing-library/jest-dom/vitest";

import { server } from "@/mocks/server";
import { queryClient } from "@/mocks/server-state";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";

beforeAll(() => {
  vi.resetModules();
  server.listen();
});

beforeEach(() => {
  queryClient.clear();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
