/** @jest-environment node */
import { label, schema } from "./create";

test("fields", () => {
  expect(Object.keys(schema.fields)).toEqual([
    "name",
    "country",
    "url",
    "links",
    "tags",
  ]);
});

test("name", () => {
  const _ = schema.pick(["name"]);
  expect(_.isValidSync({ name: 0 })).toBe(false);
  expect(_.isValidSync({ name: "" })).toBe(false);
  expect(_.isValidSync({ name: "foo" })).toBe(true);
  expect(label.name).toBe("Name");
});

test("country", () => {
  const _ = schema.pick(["country"]);
  expect(_.getDefault()).toEqual({ country: "Unknown" });
  expect(_.isValidSync({ country: 0 })).toBe(false);
  expect(_.isValidSync({ country: "" })).toBe(false);
  expect(_.isValidSync({ country: "foo" })).toBe(true);
  expect(label.country).toBe("Country");
});

test("url", () => {
  const _ = schema.pick(["url"]);
  expect(_.isValidSync({ url: "" })).toBe(false);
  expect(_.isValidSync({ url: "foo" })).toBe(false);
  expect(_.isValidSync({ url: "https://example.com" })).toBe(true);
  expect(label.url).toBe("URL");
});

test("links", () => {
  const _ = schema.pick(["links"]);
  expect(_.isValidSync({ links: 0 })).toBe(false);
  expect(_.isValidSync({ links: "" })).toBe(true);
  expect(_.isValidSync({ links: "foo" })).toBe(true);
  expect(label.links).toBe("Links");
});

test("tags", () => {
  const _ = schema.pick(["tags"]);
  expect(_.getDefault()).toEqual({ tags: [] });
  expect(_.isValidSync({ tags: "foo" })).toBe(false);
  expect(_.isValidSync({ tags: [0] })).toBe(false);
  expect(_.isValidSync({ tags: [] })).toBe(true);
  expect(_.isValidSync({ tags: ["foo", "bar"] })).toBe(true);
  expect(label.tags).toBe("Tags");
});
