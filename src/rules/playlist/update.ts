import type { PlaylistAdmin } from "@/types/playlists";
import * as v from "valibot";
import type { PickField } from "../types";

const field = {
  url: "URL",
  title: "Title",
} satisfies PickField<PlaylistAdmin, "url" | "title">;

export const schema = v.object({
  url: v.pipe(v.string(), v.url(`The ${field.url} is invalid.`)),
  title: v.optional(v.string()),
});

export type Schema = v.InferOutput<typeof schema>;

export const label: Record<keyof Schema, string> = field;
