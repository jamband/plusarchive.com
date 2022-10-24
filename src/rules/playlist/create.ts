import type { InferType } from "yup";
import { object, string } from "yup";
import "../locale";

export const schema = object({
  url: string().url().strict().label("URL").required(),
  title: string().strict().label("title"),
});

export type Schema = InferType<typeof schema>;

export const label: Record<keyof Schema, string> = {
  url: "URL",
  title: "Title",
};
