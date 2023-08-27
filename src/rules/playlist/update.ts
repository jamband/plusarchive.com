import type { Output } from "valibot";
import { object, optional, string, url } from "valibot";

const field = {
  url: "URL",
  title: "Title",
};

export const schema = object({
  url: string([url(`The ${field.url} is invalid.`)]),
  title: optional(string()),
});

export type Schema = Output<typeof schema>;

export const label: Record<keyof Schema, string> = field;
