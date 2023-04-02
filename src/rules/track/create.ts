import type { InferType } from "yup";
import { array, object, string } from "yup";
import "../locale";

export const schema = object({
  url: string().url().strict().label("URL").required(),
  title: string().strict().label("title"),
  image: string().url().strict().label("image"),
  genres: array(string().required()).default([]).strict().label("genres"),
});

export type Schema = InferType<typeof schema>;

export const label: Record<keyof Schema, string> = {
  url: "URL",
  title: "Title",
  image: "Image",
  genres: "Genres",
};
