import type { Output } from "valibot";
import { email, minLength, object, string } from "valibot";

const field = {
  email: "Email",
  password: "Password",
};

export const schema = object({
  email: string([email(`The ${field.email} must be a valid email address.`)]),
  password: string([
    minLength(8, `The ${field.password} must be at least 8 characters.`),
  ]),
});

export type Schema = Output<typeof schema>;

export const label: Record<keyof Schema, string> = field;
