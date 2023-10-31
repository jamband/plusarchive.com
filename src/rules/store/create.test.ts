/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./create";

test("fields", () => {
  expect(Object.keys(schema.entries)).toEqual([
    "name",
    "country",
    "url",
    "links",
    "tags",
  ]);
});

test("name", () => {
  const { name } = schema.entries;
  expect(() => parse(name, 0)).toThrow();
  expect(() => parse(name, "")).toThrow();
  expect(parse(name, "foo")).toBe("foo");
  expect(label.name).toBe("Name");
});

test("country", () => {
  const { country } = schema.entries;
  expect(() => parse(country, 0)).toThrow();
  expect(() => parse(country, "")).toThrow();
  expect(parse(country, undefined)).toBe("Unknown");
  expect(parse(country, "foo")).toBe("foo");
  expect(label.country).toBe("Country");
});

test("url", () => {
  const { url } = schema.entries;
  expect(() => parse(url, "")).toThrow();
  expect(() => parse(url, "foo")).toThrow();
  expect(parse(url, "https://example.com")).toBe("https://example.com");
  expect(label.url).toBe("URL");
});

test("links", () => {
  const { links } = schema.entries;
  expect(() => parse(links, 0)).toThrow();
  expect(parse(links, undefined)).toBeUndefined();
  expect(parse(links, "foo")).toBe("foo");
  expect(label.links).toBe("Links");
});

test("tags", () => {
  const { tags } = schema.entries;
  expect(() => parse(tags, "foo")).toThrow();
  expect(() => parse(tags, [0])).toThrow();
  expect(parse(tags, undefined)).toEqual([]);
  expect(parse(tags, [])).toEqual([]);
  expect(parse(tags, ["foo", "bar"])).toEqual(["foo", "bar"]);
  expect(label.tags).toBe("Tags");
});
