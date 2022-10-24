/** @jest-environment node */
import { label, schema } from "./login";

const { fields } = schema;

test("fields", () => {
  expect(Object.keys(fields)).toStrictEqual(["email", "password"]);
});

test("email", () => {
  expect(fields.email.spec.label).toBe("email");
  expect(fields.email.isValidSync("")).toBe(false);
  expect(fields.email.isValidSync("foo")).toBe(false);
  expect(fields.email.isValidSync("foo@example.com")).toBe(true);
  expect(label.email).toBe("Email");
});

test("password", () => {
  expect(fields.password.spec.label).toBe("password");
  expect(fields.password.isValidSync("")).toBe(false);
  expect(fields.password.isValidSync("a".repeat(7))).toBe(false);
  expect(fields.password.isValidSync(Number("1".repeat(8)))).toBe(false);
  expect(fields.password.isValidSync("a".repeat(8))).toBe(true);
  expect(label.password).toBe("Password");
});
