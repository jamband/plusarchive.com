import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { GridActions } from ".";

vi.mock("@/icons/eye", () => ({
  IconEye: () => "view",
}));

vi.mock("@/icons/pencil", () => ({
  IconPencil: () => "update",
}));

vi.mock("@/icons/trash", () => ({
  IconTrash: () => "delete",
}));

test("", () => {
  const mutation = vi.fn();

  render(<GridActions resource="/foo" id={1} mutation={mutation} />);

  const [viewLink, updateLink] = screen.getAllByRole("link");
  expect(viewLink).toHaveAttribute("href", "/foo/1");
  expect(updateLink).toHaveAttribute("href", "/foo/1/update");

  const deleteButton = screen.getByRole("button", { name: "delete" });
  fireEvent.click(deleteButton);
  expect(mutation).toHaveBeenCalledTimes(1);
});
