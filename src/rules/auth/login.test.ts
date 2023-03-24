/** @jest-environment node */
import { label, schema } from "./login";

test("fields", () => {
  expect(Object.keys(schema.fields)).toEqual(["email", "password"]);
});

test("email", () => {
  const _ = schema.pick(["email"]);
  expect(_.isValidSync({ email: "" })).toBe(false);
  expect(_.isValidSync({ email: "foo" })).toBe(false);
  expect(_.isValidSync({ email: "foo@example.com" })).toBe(true);
  expect(label.email).toBe("Email");
});

test("password", () => {
  const _ = schema.pick(["password"]);
  expect(_.isValidSync({ password: "" })).toBe(false);
  expect(_.isValidSync({ password: "a".repeat(7) })).toBe(false);
  expect(_.isValidSync({ password: Number("1".repeat(8)) })).toBe(false);
  expect(_.isValidSync({ password: "a".repeat(8) })).toBe(true);
  expect(label.password).toBe("Password");
});
