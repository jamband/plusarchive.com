/** @jest-environment node */
import { label, schema } from "./create";

const { fields } = schema;

test("fields", () => {
  expect(Object.keys(fields)).toStrictEqual(["name"]);
});

test("name", () => {
  expect(fields.name.spec.label).toBe("name");
  expect(fields.name.isValidSync(0)).toBe(false);
  expect(fields.name.isValidSync("")).toBe(false);
  expect(fields.name.isValidSync("foo")).toBe(true);
  expect(label.name).toBe("Name");
});
