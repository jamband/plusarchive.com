import type { TrackAdmin } from "@/types/tracks";
import * as v from "valibot";
import type { PickField } from "../types";

const field = {
  url: "URL",
  title: "Title",
  image: "Image",
  genres: "Genres",
} satisfies PickField<TrackAdmin, "url" | "title" | "image" | "genres">;

export const schema = v.object({
  url: v.pipe(v.string(), v.url(`The ${field.url} is invalid.`)),
  title: v.optional(v.string()),
  image: v.optional(v.string()),
  genres: v.array(v.string()),
});

export type Schema = v.InferOutput<typeof schema>;

export const label: Record<keyof Schema, string> = field;
