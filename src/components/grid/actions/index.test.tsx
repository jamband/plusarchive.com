import { fireEvent, render, screen } from "@testing-library/react";
import { GridActions } from ".";

jest.mock("@/icons/eye", () => ({
  IconEye: () => "view",
}));

jest.mock("@/icons/pencil", () => ({
  IconPencil: () => "update",
}));

jest.mock("@/icons/trash", () => ({
  IconTrash: () => "delete",
}));

test("", () => {
  const mutation = jest.fn();

  render(<GridActions resource="/foo" id={1} mutation={mutation} />);

  const [viewLink, updateLink] = screen.getAllByRole("link");
  expect(viewLink).toHaveAttribute("href", "/foo/1");
  expect(updateLink).toHaveAttribute("href", "/foo/1/update");

  const deleteButton = screen.getByRole("button", { name: "delete" });
  fireEvent.click(deleteButton);
  expect(mutation).toHaveBeenCalledTimes(1);
});
