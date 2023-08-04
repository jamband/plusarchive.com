import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Dropdown } from ".";

test("without label", () => {
  render(<Dropdown>foo</Dropdown>);

  const group = screen.getByRole("group");
  expect(group).not.toBeVisible();

  const button = screen.getByRole("button", { name: "More", expanded: false });
  expect(button).toBeInTheDocument();
});

test("with label", () => {
  render(<Dropdown label="foo">bar</Dropdown>);

  const group = screen.getByRole("group");
  expect(group).not.toBeVisible();

  const button = screen.getByRole("button", { name: "foo", expanded: false });
  expect(button).toBeInTheDocument();
});

test("click event", async () => {
  render(
    <Dropdown>
      <a href=".">foo</a>
    </Dropdown>,
  );

  const group = screen.getByRole("group");
  expect(group).not.toBeVisible();

  fireEvent.click(screen.getByRole("button", { expanded: false }));
  await screen.findByRole("button", { expanded: true });
  expect(group).toBeVisible();

  fireEvent.click(screen.getByRole("button", { expanded: true }));
  await screen.findByRole("button", { expanded: false });
  expect(group).not.toBeVisible();

  fireEvent.click(screen.getByRole("button", { expanded: false }));
  await screen.findByRole("button", { expanded: true });
  expect(group).toBeVisible();

  fireEvent.click(screen.getByRole("link", { name: "foo" }));
  await screen.findByRole("button", { expanded: false });
  expect(group).not.toBeVisible();
});

test("focus event", async () => {
  render(
    <>
      <Dropdown>foo</Dropdown>
      <Dropdown>bar</Dropdown>
    </>,
  );

  const [foo, bar] = screen.getAllByRole("group");
  expect(foo).not.toBeVisible();
  expect(bar).not.toBeVisible();

  const [fooButton, barButton] = screen.getAllByRole("button", {
    expanded: false,
  });

  fireEvent.click(fooButton);
  await screen.findByRole("button", { expanded: true });
  expect(foo).toBeVisible();
  expect(bar).not.toBeVisible();

  fireEvent.blur(foo);
  await waitFor(() => expect(foo).not.toBeVisible());
  await waitFor(() => expect(bar).not.toBeVisible());

  fireEvent.click(barButton);
  await screen.findByRole("button", { expanded: true });
  expect(foo).not.toBeVisible();
  expect(bar).toBeVisible();

  fireEvent.blur(bar);
  await waitFor(() => expect(foo).not.toBeVisible());
  await waitFor(() => expect(bar).not.toBeVisible());
});

test("keyboard event", async () => {
  render(<Dropdown>foo</Dropdown>);

  const group = screen.getByRole("group");
  expect(group).not.toBeVisible();

  fireEvent.click(screen.getByRole("button", { expanded: false }));
  await screen.findByRole("button", { expanded: true });
  expect(group).toBeVisible();

  fireEvent.keyDown(group, { key: "Escape" });
  await screen.findByRole("button", { expanded: false });
  expect(group).not.toBeVisible();
});
