/** @jest-environment node */
import { label, schema } from "./create";

test("fields", () => {
  expect(Object.keys(schema.fields)).toEqual(["name"]);
});

test("name", () => {
  const _ = schema.pick(["name"]);
  expect(_.isValidSync({ name: 0 })).toBe(false);
  expect(_.isValidSync({ name: "" })).toBe(false);
  expect(_.isValidSync({ name: "foo" })).toBe(true);
  expect(label.name).toBe("Name");
});
