import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { router } from "~/mocks/router";
import { useSelectFilter, useTextFilter } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("useTextFilter", () => {
  router.mockReturnValue({
    query: { foo: "foo1" },
    push: jest.fn(),
  });

  const { result } = renderHook(() => useTextFilter("foo"));
  expect(result.current.value).toBe("foo1");

  render(<input type="text" {...result.current} />);

  const textbox = screen.getByRole("textbox");

  fireEvent.keyDown(textbox, { key: "Enter" });
  expect(router().push).toHaveBeenCalledWith({ query: { foo: "foo1" } });

  fireEvent.change(textbox, { target: { value: "foo2" } });
  expect(result.current.value).toBe("foo2");
});

test("useSelectFilter", () => {
  router.mockReturnValue({
    query: {},
    push: jest.fn(),
  });

  const { result } = renderHook(() => useSelectFilter("foo"));
  expect(result.current.value).toBe("");

  render(
    <select {...result.current}>
      <option value=""></option>
      <option value="foo1">foo1</option>
      <option value="foo2">foo2</option>
    </select>
  );

  const combobox = screen.getByRole("combobox");

  fireEvent.change(combobox, { target: { value: "foo1" } });
  expect(router().push).toHaveBeenCalledWith({ query: { foo: "foo1" } });
  expect(result.current.value).toBe("foo1");

  fireEvent.change(combobox, { target: { value: "foo2" } });
  expect(router().push).toHaveBeenCalledWith({ query: { foo: "foo2" } });
  expect(result.current.value).toBe("foo2");
});
