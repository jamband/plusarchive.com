/** @jest-environment node */
import { label, schema } from "./create";

const { fields } = schema;

test("fields", () => {
  expect(Object.keys(fields)).toStrictEqual(["url", "title"]);
});

test("url", () => {
  expect(fields.url.spec.label).toBe("URL");
  expect(fields.url.isValidSync("")).toBe(false);
  expect(fields.url.isValidSync("foo")).toBe(false);
  expect(fields.url.isValidSync("https://example.com")).toBe(true);
  expect(label.url).toBe("URL");
});

test("title", () => {
  expect(fields.title.spec.label).toBe("title");
  expect(fields.title.isValidSync(0)).toBe(false);
  expect(fields.title.isValidSync("")).toBe(true);
  expect(fields.title.isValidSync("foo")).toBe(true);
  expect(label.title).toBe("Title");
});
