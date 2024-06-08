import * as v from "valibot";

const field = {
  name: "Name",
  country: "Country",
  url: "URL",
  links: "Links",
  tags: "Tags",
};

export const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty(`The ${field.name} field is required.`)),
  country: v.optional(v.string(), "Unknown"),
  url: v.pipe(v.string(), v.url(`${field.url} is invalid.`)),
  links: v.optional(v.string()),
  tags: v.optional(v.array(v.string()), []),
});

export type Schema = v.InferOutput<typeof schema>;

export const label: Record<keyof Schema, string> = field;
