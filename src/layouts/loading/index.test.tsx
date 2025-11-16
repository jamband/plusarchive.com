import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { Loading } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

const router = useRouter as Mock;

beforeEach(() => {
  router.mockReset();
});

test("", () => {
  router.mockReturnValue({
    events: {
      on: vi.fn((event, callback) => {
        if (event === "routeChangeStart") {
          callback("/");
        }
      }),
      off: vi.fn(),
    },
  });

  render(<Loading />);

  const status = screen.getByRole("status");
  expect(status).toHaveClass("start");
});
