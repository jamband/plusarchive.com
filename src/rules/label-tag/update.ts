import * as v from "valibot";
import type { LabelTagAdmin } from "@/types/label-tags";
import type { PickField } from "../types";

const field = {
  name: "Name",
} satisfies PickField<LabelTagAdmin, "name">;

export const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty(`The ${field.name} field is required.`)),
});

export type Schema = v.InferOutput<typeof schema>;

export const label: Record<keyof Schema, string> = field;
