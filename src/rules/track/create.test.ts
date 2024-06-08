/** @jest-environment node */
import * as v from "valibot";
import { label, schema } from "./create";

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

test("image", () => {
  const { image } = schema.entries;
  expect(() => v.parse(image, 0)).toThrow();
  expect(v.parse(image, undefined)).toBeUndefined();
  expect(v.parse(image, "foo")).toBe("foo");
  expect(label.image).toBe("Image");
});

test("genres", () => {
  const { genres } = schema.entries;
  expect(() => v.parse(genres, "foo")).toThrow();
  expect(() => v.parse(genres, [0])).toThrow();
  expect(v.parse(genres, undefined)).toEqual([]);
  expect(v.parse(genres, [])).toEqual([]);
  expect(v.parse(genres, ["foo", "bar"])).toEqual(["foo", "bar"]);
  expect(label.genres).toBe("Genres");
});
