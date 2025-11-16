import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { expect, test, vi } from "vitest";
import { GridHeaderSort } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/icons/arrow-down-1-9", () => ({
  IconArrowDown19: () => <div>19</div>,
}));

vi.mock("@/icons/arrow-down-9-1", () => ({
  IconArrowDown91: () => <div>91</div>,
}));

vi.mock("@/icons/arrow-down-a-z", () => ({
  IconArrowDownAZ: () => <div>az</div>,
}));

vi.mock("@/icons/arrow-down-z-a", () => ({
  IconArrowDownZA: () => <div>za</div>,
}));

const router = useRouter as Mock;

test("type: number", () => {
  router.mockReturnValue({
    push: vi.fn(),
    query: {},
  });

  render(
    <GridHeaderSort type="number" column="id">
      id
    </GridHeaderSort>,
  );

  fireEvent.click(screen.getByRole("button", { name: "id 19" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "id" } });
});

test("type: number and desc to asc", () => {
  router.mockReturnValue({
    push: vi.fn(),
    query: { sort: "-id" },
  });

  render(
    <GridHeaderSort type="number" column="id">
      id
    </GridHeaderSort>,
  );

  fireEvent.click(screen.getByRole("button", { name: "id 91" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "id" } });
});

test("type: number and asc to desc", () => {
  router.mockReturnValue({
    push: vi.fn(),
    query: { sort: "id" },
  });

  render(
    <GridHeaderSort type="number" column="id">
      id
    </GridHeaderSort>,
  );

  fireEvent.click(screen.getByRole("button", { name: "id 19" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "-id" } });
});

test("type: string", () => {
  router.mockReturnValue({
    push: vi.fn(),
    query: {},
  });

  render(
    <GridHeaderSort type="string" column="foo">
      foo
    </GridHeaderSort>,
  );

  fireEvent.click(screen.getByRole("button", { name: "foo az" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "foo" } });
});

test("type: string and desc to asc", () => {
  router.mockReturnValue({
    push: vi.fn(),
    query: { sort: "-foo" },
  });

  render(
    <GridHeaderSort type="string" column="foo">
      foo
    </GridHeaderSort>,
  );

  fireEvent.click(screen.getByRole("button", { name: "foo za" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "foo" } });
});

test("type: string and asc to desc", () => {
  router.mockReturnValue({
    push: vi.fn(),
    query: { sort: "foo" },
  });

  render(
    <GridHeaderSort type="string" column="foo">
      foo
    </GridHeaderSort>,
  );

  fireEvent.click(screen.getByRole("button", { name: "foo az" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "-foo" } });
});
