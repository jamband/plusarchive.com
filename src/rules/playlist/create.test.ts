// @vitest-environment node
import * as v from "valibot";
import { expect, test } from "vitest";
import { label, schema } from "./create";

test("fields", () => {
  expect(Object.keys(schema.entries)).toEqual(["url", "title"]);
});

test("url", () => {
  const { url } = schema.entries;
  expect(() => v.parse(url, "")).toThrow();
  expect(() => v.parse(url, "foo")).toThrow();
  expect(v.parse(url, "https://example.com")).toBe("https://example.com");
  expect(label.url).toBe("URL");
});

test("title", () => {
  const { title } = schema.entries;
  expect(() => v.parse(title, 0)).toThrow();
  expect(v.parse(title, undefined)).toBeUndefined();
  expect(v.parse(title, "foo")).toBe("foo");
  expect(label.title).toBe("Title");
});
