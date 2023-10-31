/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./create";

test("fields", () => {
  expect(Object.keys(schema.entries)).toEqual(["name"]);
});

test("name", () => {
  const { name } = schema.entries;
  expect(() => parse(name, 0)).toThrow();
  expect(() => parse(name, "")).toThrow();
  expect(parse(name, "foo")).toBe("foo");
  expect(label.name).toBe("Name");
});
