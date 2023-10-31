/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./update";

test("fields", () => {
  expect(Object.keys(schema.entries)).toEqual([
    "url",
    "title",
    "image",
    "genres",
  ]);
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

test("image", () => {
  const { image } = schema.entries;
  expect(() => parse(image, 0)).toThrow();
  expect(parse(image, undefined)).toBeUndefined();
  expect(parse(image, "foo")).toBe("foo");
  expect(label.image).toBe("Image");
});

test("genres", () => {
  const { genres } = schema.entries;
  expect(() => parse(genres, "foo")).toThrow();
  expect(() => parse(genres, [0])).toThrow();
  expect(parse(genres, [])).toEqual([]);
  expect(parse(genres, ["foo", "bar"])).toEqual(["foo", "bar"]);
  expect(label.genres).toBe("Genres");
});
