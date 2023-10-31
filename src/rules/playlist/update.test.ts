/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./update";

test("fields", () => {
  expect(Object.keys(schema.entries)).toEqual(["url", "title"]);
});

test("url", () => {
  const { url } = schema.entries;
  expect(() => parse(url, "")).toThrow();
  expect(() => parse(url, "foo")).toThrow();
  expect(parse(url, "https://example.com")).toBe("https://example.com");
  expect(label.url).toBe("URL");
});

test("title", () => {
  const { title } = schema.entries;
  expect(() => parse(title, 0)).toThrow();
  expect(parse(title, undefined)).toBeUndefined();
  expect(parse(title, "foo")).toBe("foo");
  expect(label.title).toBe("Title");
});
