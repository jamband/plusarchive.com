import type { Output } from "valibot";
import { minLength, object, string } from "valibot";

const field = {
  name: "Name",
};

export const schema = object({
  name: string([minLength(1, `The ${field.name} field is required.`)]),
});

export type Schema = Output<typeof schema>;

export const label: Record<keyof Schema, string> = field;
