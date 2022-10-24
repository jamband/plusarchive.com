import type { InferType } from "yup";
import { object, string } from "yup";
import "../locale";

export const schema = object({
  email: string().email().strict().label("email").required(),
  password: string().min(8).strict().label("password").required(),
});

export type Schema = InferType<typeof schema>;

export const label: Record<keyof Schema, string> = {
  email: "Email",
  password: "Password",
};
