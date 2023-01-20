import { APP_REPOSITORY_URL } from "@/constants/app";
import { router } from "@/mocks/router";
import { render, screen } from "@testing-library/react";
import { AdminLinks } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("pathname: /foo", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  render(<AdminLinks />);

  const links = screen.getAllByRole("link");
  expect(links.length).toBe(1);

  const link = screen.getByRole("link", { name: "GitHub" });
  expect(link).toHaveAttribute("href", APP_REPOSITORY_URL);
});

test("pathname: /foo/admin", () => {
  router.mockReturnValue({
    pathname: "/foo/admin",
    query: {},
  });

  render(<AdminLinks />);

  expect(screen.getAllByRole("link")).toHaveLength(2);

  const adminLink = screen.getByRole("link", { name: "Admin" });
  expect(adminLink).toHaveAttribute("href", "/foo/admin");

  const createLink = screen.getByRole("link", { name: "Create" });
  expect(createLink).toHaveAttribute("href", "/foo/create");
});

test("pathname: /foo/create", () => {
  router.mockReturnValue({
    pathname: "/foo/create",
    query: {},
  });

  render(<AdminLinks />);

  const links = screen.getAllByRole("link");
  expect(links.length).toBe(1);

  const adminLink = screen.getByRole("link", { name: "Admin" });
  expect(adminLink).toHaveAttribute("href", "/foo/admin");
});

test("pathname: /foo/[id]", () => {
  router.mockReturnValue({
    pathname: "/foo/[id]",
    query: { id: 1 },
  });

  render(<AdminLinks />);

  const links = screen.getAllByRole("link");
  expect(links.length).toBe(3);

  const adminLink = screen.getByRole("link", { name: "Admin" });
  expect(adminLink).toHaveAttribute("href", "/foo/admin");

  const createLink = screen.getByRole("link", { name: "Create" });
  expect(createLink).toHaveAttribute("href", "/foo/create");

  const updateLink = screen.getByRole("link", { name: "Update" });
  expect(updateLink).toHaveAttribute("href", "/foo/1/update");
});

test("pathname: /foo/[id]/update", () => {
  router.mockReturnValue({
    pathname: "/foo/[id]/update",
    query: { id: 1 },
  });

  render(<AdminLinks />);

  const links = screen.getAllByRole("link");
  expect(links.length).toBe(3);

  const adminLink = screen.getByRole("link", { name: "Admin" });
  expect(adminLink).toHaveAttribute("href", "/foo/admin");

  const createLink = screen.getByRole("link", { name: "Create" });
  expect(createLink).toHaveAttribute("href", "/foo/create");

  const viewLink = screen.getByRole("link", { name: "View" });
  expect(viewLink).toHaveAttribute("href", "/foo/1");
});
