import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { Pagination } from ".";

const router = useRouter as Mock;

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

beforeEach(() => {
  router.mockReset();
});

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
    />,
  );

  const first = screen.getByRole("button", { name: "First" });
  expect(first).toBeDisabled();

  const previous = screen.getByRole("button", { name: "Previous" });
  expect(previous).toBeDisabled();

  const next = screen.getByRole("link", { name: "Next" });
  expect(next).toHaveAttribute("href", "/?page=2");

  const last = screen.getByRole("link", { name: "Last" });
  expect(last).toHaveAttribute("href", "/?page=10");

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
    />,
  );

  const first = screen.getByRole("link", { name: "First" });
  expect(first).toHaveAttribute("href", "/?page=1");

  const previous = screen.getByRole("link", { name: "Previous" });
  expect(previous).toHaveAttribute("href", "/?page=4");

  const next = screen.getByRole("link", { name: "Next" });
  expect(next).toHaveAttribute("href", "/?page=6");

  const last = screen.getByRole("link", { name: "Last" });
  expect(last).toHaveAttribute("href", "/?page=10");

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
    />,
  );

  const first = screen.getByRole("link", { name: "First" });
  expect(first).toHaveAttribute("href", "/?page=1");

  const previous = screen.getByRole("link", { name: "Previous" });
  expect(previous).toHaveAttribute("href", "/?page=9");

  const next = screen.getByRole("button", { name: "Next" });
  expect(next).toBeDisabled();

  const last = screen.getByRole("button", { name: "Last" });
  expect(last).toBeDisabled();

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
    />,
  );

  const first = screen.getByRole("button", { name: "First" });
  expect(first).toBeDisabled();

  const previous = screen.getByRole("button", { name: "Previous" });
  expect(previous).toBeDisabled();

  const next = screen.getByRole("link", { name: "Next" });
  expect(next).toHaveAttribute("href", "/foo?bar=baz&page=2");

  const last = screen.getByRole("link", { name: "Last" });
  expect(last).toHaveAttribute("href", "/foo?bar=baz&page=10");

  expect(screen.getByText("1/10")).toBeInTheDocument();
});
