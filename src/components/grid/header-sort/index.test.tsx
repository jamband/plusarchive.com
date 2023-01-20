import { router } from "@/mocks/router";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { GridHeaderSort } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/icons/arrow-down-1-9", () => ({
  IconArrowDown19: () => <span>19</span>,
}));

jest.mock("@/icons/arrow-down-9-1", () => ({
  IconArrowDown91: () => <span>91</span>,
}));

jest.mock("@/icons/arrow-down-a-z", () => ({
  IconArrowDownAZ: () => <span>az</span>,
}));

jest.mock("@/icons/arrow-down-z-a", () => ({
  IconArrowDownZA: () => <span>za</span>,
}));

test("type: number", () => {
  router.mockReturnValue({
    push: jest.fn(),
    query: {},
  });

  render(
    <GridHeaderSort type="number" column="id">
      id
    </GridHeaderSort>
  );

  fireEvent.click(screen.getByRole("button", { name: "id 19" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "id" } });
});

test("type: number and desc to asc", () => {
  router.mockReturnValue({
    push: jest.fn(),
    query: { sort: "-id" },
  });

  render(
    <GridHeaderSort type="number" column="id">
      id
    </GridHeaderSort>
  );

  fireEvent.click(screen.getByRole("button", { name: "id 91" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "id" } });
});

test("type: number and asc to desc", () => {
  router.mockReturnValue({
    push: jest.fn(),
    query: { sort: "id" },
  });

  render(
    <GridHeaderSort type="number" column="id">
      id
    </GridHeaderSort>
  );

  fireEvent.click(screen.getByRole("button", { name: "id 19" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "-id" } });
});

test("type: string", () => {
  router.mockReturnValue({
    push: jest.fn(),
    query: {},
  });

  render(
    <GridHeaderSort type="string" column="foo">
      foo
    </GridHeaderSort>
  );

  fireEvent.click(screen.getByRole("button", { name: "foo az" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "foo" } });
});

test("type: string and desc to asc", () => {
  router.mockReturnValue({
    push: jest.fn(),
    query: { sort: "-foo" },
  });

  render(
    <GridHeaderSort type="string" column="foo">
      foo
    </GridHeaderSort>
  );

  fireEvent.click(screen.getByRole("button", { name: "foo za" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "foo" } });
});

test("type: string and asc to desc", () => {
  router.mockReturnValue({
    push: jest.fn(),
    query: { sort: "foo" },
  });

  render(
    <GridHeaderSort type="string" column="foo">
      foo
    </GridHeaderSort>
  );

  fireEvent.click(screen.getByRole("button", { name: "foo az" }));
  expect(useRouter().push).toHaveBeenCalledWith({ query: { sort: "-foo" } });
});
