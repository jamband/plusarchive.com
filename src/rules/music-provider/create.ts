import type { MusicProviderAdmin } from "@/types/music-providers";
import * as v from "valibot";
import type { PickField } from "../types";

const field = {
  name: "Name",
} satisfies PickField<MusicProviderAdmin, "name">;

export const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty(`The ${field.name} field is required.`)),
});

export type Schema = v.InferOutput<typeof schema>;

export const label: Record<keyof Schema, string> = field;
