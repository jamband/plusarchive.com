/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./create";

test("fields", () => {
  expect(Object.keys(schema.object)).toEqual([
    "url",
    "title",
    "image",
    "genres",
  ]);
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

test("image", () => {
  const { image } = schema.object;
  expect(() => parse(image, 0)).toThrowError();
  expect(parse(image, undefined)).toBeUndefined();
  expect(parse(image, "foo")).toBe("foo");
  expect(label.image).toBe("Image");
});

test("genres", () => {
  const { genres } = schema.object;
  expect(() => parse(genres, "foo")).toThrowError();
  expect(() => parse(genres, [0])).toThrowError();
  expect(parse(genres, undefined)).toEqual([]);
  expect(parse(genres, [])).toEqual([]);
  expect(parse(genres, ["foo", "bar"])).toEqual(["foo", "bar"]);
  expect(label.genres).toBe("Genres");
});
