import type { InferType } from "yup";
import { object, string } from "yup";
import "../locale";

export const schema = object({
  name: string().strict().label("name").required(),
});

export type Schema = InferType<typeof schema>;

export const label: Record<keyof Schema, string> = {
  name: "Name",
};
