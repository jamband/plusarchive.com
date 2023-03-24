/** @jest-environment node */
import { label, schema } from "./create";

test("fields", () => {
  expect(Object.keys(schema.fields)).toEqual([
    "url",
    "title",
    "image",
    "genres",
  ]);
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

test("image", () => {
  const _ = schema.pick(["image"]);
  expect(_.isValidSync({ image: "foo" })).toBe(false);
  expect(_.isValidSync({ image: "" })).toBe(true);
  expect(_.isValidSync({ image: "https://example.com" })).toBe(true);
  expect(label.image).toBe("Image");
});

test("genres", () => {
  const _ = schema.pick(["genres"]);
  expect(_.getDefault()).toEqual({ genres: [] });
  expect(_.isValidSync({ genres: "foo" })).toBe(false);
  expect(_.isValidSync({ genres: [0] })).toBe(false);
  expect(_.isValidSync({ genres: [] })).toBe(true);
  expect(_.isValidSync({ genres: ["foo", "bar"] })).toBe(true);
  expect(label.genres).toBe("Genres");
});
