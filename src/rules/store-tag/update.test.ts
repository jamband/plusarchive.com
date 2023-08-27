/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./update";

test("fields", () => {
  expect(Object.keys(schema.object)).toEqual(["name"]);
});

test("name", () => {
  const { name } = schema.object;
  expect(() => parse(name, 0)).toThrowError();
  expect(() => parse(name, "")).toThrowError();
  expect(parse(name, "foo")).toBe("foo");
  expect(label.name).toBe("Name");
});
