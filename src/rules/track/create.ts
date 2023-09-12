import type { Output } from "valibot";
import { array, minLength, object, optional, string, url } from "valibot";

const field = {
  url: "URL",
  title: "Title",
  image: "Image",
  genres: "Genres",
};

export const schema = object({
  url: string([url(`The ${field.url} is invalid.`)]),
  title: optional(string()),
  image: optional(string()),
  genres: optional(
    array(string([minLength(1, `The ${field.genres} field is required.`)])),
    [],
  ),
});

export type Schema = Output<typeof schema>;

export const label: Record<keyof Schema, string> = field;
