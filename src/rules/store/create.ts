import type { InferType } from "yup";
import { array, object, string } from "yup";
import "../locale";

export const schema = object({
  name: string().strict().label("name").required(),
  country: string().default("Unknown").strict().label("country").required(),
  url: string().url().strict().label("URL").required(),
  links: string().strict().label("links"),
  tags: array(string().required()).default([]).strict().label("tags"),
});

export type Schema = InferType<typeof schema>;

export const label: Record<keyof Schema, string> = {
  name: "Name",
  country: "Country",
  url: "URL",
  links: "Links",
  tags: "Tags",
};
