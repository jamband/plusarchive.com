import { router } from "@/mocks/router";
import { render, screen } from "@testing-library/react";
import { Pagination } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("1/10", () => {
  router.mockReturnValue({
    pathname: "/",
    query: { page: 1 },
  });

  render(
    <Pagination
      pagination={{
        currentPage: 1,
        lastPage: 10,
        perPage: 2,
        total: 20,
      }}
    />
  );

  const [first, previous, next, last] = screen.getAllByRole("link");
  expect(first).not.toHaveAttribute("href");
  expect(first).toHaveAttribute("tabindex", "-1");
  expect(previous).not.toHaveAttribute("href");
  expect(previous).toHaveAttribute("tabindex", "-1");
  expect(next).toHaveAttribute("href", "/?page=2");
  expect(next).not.toHaveAttribute("tabindex");
  expect(last).toHaveAttribute("href", "/?page=10");
  expect(last).not.toHaveAttribute("tabindex");
  expect(screen.getByText("1/10")).toBeInTheDocument();
});

test("5/10", () => {
  router.mockReturnValue({
    pathname: "/",
    query: { page: 5 },
  });

  render(
    <Pagination
      pagination={{
        currentPage: 5,
        lastPage: 10,
        perPage: 2,
        total: 20,
      }}
    />
  );

  const [first, previous, next, last] = screen.getAllByRole("link");
  expect(first).toHaveAttribute("href", "/?page=1");
  expect(first).not.toHaveAttribute("tabindex");
  expect(previous).toHaveAttribute("href", "/?page=4");
  expect(previous).not.toHaveAttribute("tabindex");
  expect(next).toHaveAttribute("href", "/?page=6");
  expect(next).not.toHaveAttribute("tabindex");
  expect(last).toHaveAttribute("href", "/?page=10");
  expect(last).not.toHaveAttribute("tabindex");
  expect(screen.getByText("5/10")).toBeInTheDocument();
});

test("10/10", () => {
  router.mockReturnValue({
    pathname: "/",
    query: { page: 10 },
  });

  render(
    <Pagination
      pagination={{
        currentPage: 10,
        lastPage: 10,
        perPage: 2,
        total: 20,
      }}
    />
  );

  const [first, previous, next, last] = screen.getAllByRole("link");
  expect(first).toHaveAttribute("href", "/?page=1");
  expect(first).not.toHaveAttribute("tabindex");
  expect(previous).toHaveAttribute("href", "/?page=9");
  expect(previous).not.toHaveAttribute("tabindex");
  expect(next).not.toHaveAttribute("href");
  expect(next).toHaveAttribute("tabindex", "-1");
  expect(last).not.toHaveAttribute("href");
  expect(last).toHaveAttribute("tabindex", "-1");
  expect(screen.getByText("10/10")).toBeInTheDocument();
});

test("includes some query string", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: { bar: "baz", page: 1 },
  });

  render(
    <Pagination
      pagination={{
        currentPage: 1,
        lastPage: 10,
        perPage: 2,
        total: 20,
      }}
    />
  );

  const [first, previous, next, last] = screen.getAllByRole("link");
  expect(first).not.toHaveAttribute("href");
  expect(first).toHaveAttribute("tabindex", "-1");
  expect(previous).not.toHaveAttribute("href");
  expect(previous).toHaveAttribute("tabindex", "-1");
  expect(next).toHaveAttribute("href", "/foo?bar=baz&page=2");
  expect(next).not.toHaveAttribute("tabindex");
  expect(last).toHaveAttribute("href", "/foo?bar=baz&page=10");
  expect(last).not.toHaveAttribute("tabindex");
  expect(screen.getByText("1/10")).toBeInTheDocument();
});
