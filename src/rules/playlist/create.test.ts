/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./create";

test("fields", () => {
  expect(Object.keys(schema.object)).toEqual(["url", "title"]);
});

test("url", () => {
  const { url } = schema.object;
  expect(() => parse(url, "")).toThrowError();
  expect(() => parse(url, "foo")).toThrowError();
  expect(parse(url, "https://example.com")).toBe("https://example.com");
  expect(label.url).toBe("URL");
});

test("title", () => {
  const { title } = schema.object;
  expect(() => parse(title, 0)).toThrowError();
  expect(parse(title, undefined)).toBeUndefined();
  expect(parse(title, "foo")).toBe("foo");
  expect(label.title).toBe("Title");
});
