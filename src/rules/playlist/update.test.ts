/** @jest-environment node */
import { label, schema } from "./update";

test("fields", () => {
  expect(Object.keys(schema.fields)).toEqual(["url", "title"]);
});

test("url", () => {
  const _ = schema.pick(["url"]);
  expect(_.isValidSync({ url: "" })).toBe(false);
  expect(_.isValidSync({ url: "foo" })).toBe(false);
  expect(_.isValidSync({ url: "https://example.com" })).toBe(true);
  expect(label.url).toBe("URL");
});

test("title", () => {
  const _ = schema.pick(["title"]);
  expect(_.isValidSync({ title: 0 })).toBe(false);
  expect(_.isValidSync({ title: "" })).toBe(true);
  expect(_.isValidSync({ title: "foo" })).toBe(true);
  expect(label.title).toBe("Title");
});
