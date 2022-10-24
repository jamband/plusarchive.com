/** @jest-environment node */
import { label, schema } from "./create";

const { fields } = schema;

test("fields", () => {
  expect(Object.keys(fields)).toStrictEqual([
    "name",
    "country",
    "url",
    "links",
    "tags",
  ]);
});

test("name", () => {
  expect(fields.name.spec.label).toBe("name");
  expect(fields.name.isValidSync(0)).toBe(false);
  expect(fields.name.isValidSync("")).toBe(false);
  expect(fields.name.isValidSync("foo")).toBe(true);
  expect(label.name).toBe("Name");
});

test("country", () => {
  expect(fields.country.spec.label).toBe("country");
  expect(fields.country.getDefault()).toBe("Unknown");
  expect(fields.country.isValidSync(0)).toBe(false);
  expect(fields.country.isValidSync("")).toBe(false);
  expect(fields.country.isValidSync("foo")).toBe(true);
  expect(label.country).toBe("Country");
});

test("url", () => {
  expect(fields.url.spec.label).toBe("URL");
  expect(fields.url.isValidSync("")).toBe(false);
  expect(fields.url.isValidSync("foo")).toBe(false);
  expect(fields.url.isValidSync("https://example.com")).toBe(true);
  expect(label.url).toBe("URL");
});

test("links", () => {
  expect(fields.links.spec.label).toBe("links");
  expect(fields.links.isValidSync(0)).toBe(false);
  expect(fields.links.isValidSync("")).toBe(true);
  expect(fields.links.isValidSync("foo")).toBe(true);
  expect(label.links).toBe("Links");
});

test("tags", () => {
  expect(fields.tags.spec.label).toBe("tags");
  expect(fields.tags.getDefault()).toStrictEqual([]);
  expect(fields.tags.isValidSync("foo")).toBe(false);
  expect(fields.tags.isValidSync([0])).toBe(false);
  expect(fields.tags.isValidSync([])).toBe(true);
  expect(fields.tags.isValidSync(["foo", "bar"])).toBe(true);
  expect(label.tags).toBe("Tags");
});
