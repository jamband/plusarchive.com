import { render, screen } from "@testing-library/react";
import { APP_NAME } from "~/constants/app";
import { AdminHeader } from ".";

test("", () => {
  render(<AdminHeader />);

  expect(screen.getAllByRole("link")).toHaveLength(5);

  const adminLink = screen.getByRole("link", { name: "Admin" });
  expect(adminLink).toHaveAttribute("href", "/admin");

  const homeLinks = screen.getAllByRole("link", { name: APP_NAME });
  expect(homeLinks[0]).toHaveAttribute("href", "/");
  expect(homeLinks[1]).toHaveAttribute("href", "/");

  const logoutLinks = screen.getAllByRole("link", { name: "Logout" });
  expect(logoutLinks[0]).toHaveAttribute("href", "/admin/logout");
  expect(logoutLinks[1]).toHaveAttribute("href", "/admin/logout");
});
