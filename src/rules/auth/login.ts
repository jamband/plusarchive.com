import * as v from "valibot";

const field = {
  email: "Email",
  password: "Password",
};

export const schema = v.object({
  email: v.pipe(
    v.string(),
    v.email(`The ${field.email} must be a valid email address.`),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8, `The ${field.password} must be at least 8 characters.`),
  ),
});

export type Schema = v.InferOutput<typeof schema>;

export const label: Record<keyof Schema, string> = field;
