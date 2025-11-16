// @vitest-environment node
import * as v from "valibot";
import { expect, test } from "vitest";
import { label, schema } from "./update";

test("fields", () => {
  expect(Object.keys(schema.entries)).toEqual(["name"]);
});

test("name", () => {
  const { name } = schema.entries;
  expect(() => v.parse(name, 0)).toThrow();
  expect(() => v.parse(name, "")).toThrow();
  expect(v.parse(name, "foo")).toBe("foo");
  expect(label.name).toBe("Name");
});
