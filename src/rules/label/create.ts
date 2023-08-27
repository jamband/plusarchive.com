import type { Output } from "valibot";
import {
  array,
  minLength,
  object,
  optional,
  string,
  url,
  withDefault,
} from "valibot";

const field = {
  name: "Name",
  country: "Country",
  url: "URL",
  links: "Links",
  tags: "Tags",
};

export const schema = object({
  name: string([minLength(1, `The ${field.name} field is required.`)]),
  country: withDefault(
    string([minLength(1, `The ${field.country} field is required.`)]),
    "Unknown",
  ),
  url: string([url(`The ${field.url} is invalid.`)]),
  links: optional(string()),
  tags: withDefault(
    array(string([minLength(1, `The ${field.tags} field is required.`)])),
    [],
  ),
});

export type Schema = Output<typeof schema>;

export const label: Record<keyof Schema, string> = field;
