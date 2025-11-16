// @vitest-environment node
import * as v from "valibot";
import { expect, test } from "vitest";
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
  expect(() => v.parse(name, 0)).toThrow();
  expect(() => v.parse(name, "")).toThrow();
  expect(v.parse(name, "foo")).toBe("foo");
  expect(label.name).toBe("Name");
});

test("country", () => {
  const { country } = schema.entries;
  expect(() => v.parse(country, 0)).toThrow();
  expect(() => v.parse(country, undefined)).toThrow();
  expect(v.parse(country, "foo")).toBe("foo");
  expect(label.country).toBe("Country");
});

test("url", () => {
  const { url } = schema.entries;
  expect(() => v.parse(url, "")).toThrow();
  expect(() => v.parse(url, "foo")).toThrow();
  expect(v.parse(url, "https://example.com")).toBe("https://example.com");
  expect(label.url).toBe("URL");
});

test("links", () => {
  const { links } = schema.entries;
  expect(() => v.parse(links, undefined)).toThrow();
  expect(() => v.parse(links, 0)).toThrow();
  expect(v.parse(links, "")).toBe("");
  expect(v.parse(links, "foo")).toBe("foo");
  expect(label.links).toBe("Links");
});

test("tags", () => {
  const { tags } = schema.entries;
  expect(() => v.parse(tags, undefined)).toThrow();
  expect(() => v.parse(tags, "foo")).toThrow();
  expect(() => v.parse(tags, [0])).toThrow();
  expect(v.parse(tags, [])).toEqual([]);
  expect(v.parse(tags, ["foo", "bar"])).toEqual(["foo", "bar"]);
  expect(label.tags).toBe("Tags");
});
