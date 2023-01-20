import { router } from "@/mocks/router";
import { render, screen } from "@testing-library/react";
import { AdminHeader } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("current: /admin", () => {
  router.mockReturnValue({ pathname: "/admin" });

  render(<AdminHeader />);

  const link = screen.getByRole("link", { current: "page" });
  expect(link).toHaveTextContent("Admin");
  expect(link).toHaveAttribute("href", "/admin");
});

test("current: /logout", () => {
  router.mockReturnValue({ pathname: "/admin/logout" });

  render(<AdminHeader />);

  const links = screen.getAllByRole("link", { current: "page" });
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveTextContent("Logout");
  expect(links[0]).toHaveAttribute("href", "/admin/logout");
  expect(links[1]).toHaveTextContent("Logout");
  expect(links[1]).toHaveAttribute("href", "/admin/logout");
});
