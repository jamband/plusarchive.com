import * as v from "valibot";

const field = {
  url: "URL",
  title: "Title",
  image: "Image",
  genres: "Genres",
};

export const schema = v.object({
  url: v.pipe(v.string(), v.url(`The ${field.url} is invalid.`)),
  title: v.optional(v.string()),
  image: v.optional(v.string()),
  genres: v.array(v.string()),
});

export type Schema = v.InferOutput<typeof schema>;

export const label: Record<keyof Schema, string> = field;
