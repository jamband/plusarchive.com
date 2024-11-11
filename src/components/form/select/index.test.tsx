import type { useQuery } from "@/hooks/server-state";
import { render, screen } from "@testing-library/react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { FormSelect } from ".";

jest.mock("@/icons/angle-down", () => ({
  IconAngleDown: () => "angle-down-icon",
}));

test("", () => {
  render(
    <FormSelect
      label="foo"
      inputClass=""
      data={{ isLoading: false, data: {} } as ReturnType<typeof useQuery>}
      register={{} as UseFormRegisterReturn}
      feedback={undefined}
    >
      <option value=""></option>
    </FormSelect>,
  );

  const combobox = screen.getByRole("combobox", { name: "foo" });
  expect(combobox).not.toBeRequired();
  expect(combobox).toHaveClass("", { exact: true });
});

test("required", () => {
  render(
    <FormSelect
      label="foo"
      inputClass=""
      data={{ isLoading: false, data: {} } as ReturnType<typeof useQuery>}
      register={{} as UseFormRegisterReturn}
      feedback={undefined}
      required
    >
      <option value=""></option>
    </FormSelect>,
  );

  const combobox = screen.getByRole("combobox", { name: "foo" });
  expect(combobox).toBeRequired();
});

test("feedback", () => {
  render(
    <FormSelect
      label="foo"
      inputClass=""
      data={{ isLoading: false, data: {} } as ReturnType<typeof useQuery>}
      register={{} as UseFormRegisterReturn}
      feedback="feedback..."
    >
      <option value=""></option>
    </FormSelect>,
  );

  const combobox = screen.getByRole("combobox", {
    name: "foo",
    description: "feedback...",
  });

  expect(combobox).toHaveClass("feedback");
});
