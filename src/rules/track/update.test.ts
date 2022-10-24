/** @jest-environment node */
import { label, schema } from "./update";

const { fields } = schema;

test("fields", () => {
  expect(Object.keys(fields)).toStrictEqual([
    "url",
    "title",
    "image",
    "genres",
  ]);
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

test("image", () => {
  expect(fields.image.spec.label).toBe("image");
  expect(fields.image.isValidSync("foo")).toBe(false);
  expect(fields.image.isValidSync("")).toBe(true);
  expect(fields.image.isValidSync("https://example.com")).toBe(true);
  expect(label.image).toBe("Image");
});

test("genres", () => {
  expect(fields.genres.spec.label).toBe("genres");
  expect(fields.genres.isValidSync("foo")).toBe(false);
  expect(fields.genres.isValidSync([0])).toBe(false);
  expect(fields.genres.isValidSync([])).toBe(true);
  expect(fields.genres.isValidSync(["foo", "bar"])).toBe(true);
  expect(label.genres).toBe("Genres");
});
