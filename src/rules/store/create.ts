import type { StoreAdmin } from "@/types/stores";
import * as v from "valibot";
import type { PickField } from "../types";

const field = {
  name: "Name",
  country: "Country",
  url: "URL",
  links: "Links",
  tags: "Tags",
} satisfies PickField<
  StoreAdmin,
  "name" | "country" | "url" | "links" | "tags"
>;

export const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty(`The ${field.name} field is required.`)),
  country: v.optional(v.string(), "Unknown"),
  url: v.pipe(v.string(), v.url(`The ${field.url} is invalid.`)),
  links: v.optional(v.string()),
  tags: v.optional(v.array(v.string()), []),
});

export type Schema = v.InferOutput<typeof schema>;

export const label: Record<keyof Schema, string> = field;
