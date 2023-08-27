/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./create";

test("fields", () => {
  expect(Object.keys(schema.object)).toEqual([
    "name",
    "country",
    "url",
    "links",
    "tags",
  ]);
});

test("name", () => {
  const { name } = schema.object;
  expect(() => parse(name, 0)).toThrowError();
  expect(() => parse(name, "")).toThrowError();
  expect(parse(name, "foo")).toBe("foo");
  expect(label.name).toBe("Name");
});

test("country", () => {
  const { country } = schema.object;
  expect(() => parse(country, 0)).toThrowError();
  expect(() => parse(country, "")).toThrowError();
  expect(parse(country, undefined)).toBe("Unknown");
  expect(parse(country, "foo")).toBe("foo");
  expect(label.country).toBe("Country");
});

test("url", () => {
  const { url } = schema.object;
  expect(() => parse(url, "")).toThrowError();
  expect(() => parse(url, "foo")).toThrowError();
  expect(parse(url, "https://example.com")).toBe("https://example.com");
  expect(label.url).toBe("URL");
});

test("links", () => {
  const { links } = schema.object;
  expect(() => parse(links, 0)).toThrowError();
  expect(parse(links, undefined)).toBeUndefined();
  expect(parse(links, "foo")).toBe("foo");
  expect(label.links).toBe("Links");
});

test("tags", () => {
  const { tags } = schema.object;
  expect(() => parse(tags, "foo")).toThrowError();
  expect(() => parse(tags, [0])).toThrowError();
  expect(parse(tags, undefined)).toEqual([]);
  expect(parse(tags, [])).toEqual([]);
  expect(parse(tags, ["foo", "bar"])).toEqual(["foo", "bar"]);
  expect(label.tags).toBe("Tags");
});
