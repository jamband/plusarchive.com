/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./login";

test("fields", () => {
  expect(Object.keys(schema.entries)).toEqual(["email", "password"]);
});

test("email", () => {
  const { email } = schema.entries;
  expect(() => parse(email, "")).toThrow();
  expect(() => parse(email, "foo")).toThrow();
  expect(parse(email, "foo@example.com")).toBe("foo@example.com");
  expect(label.email).toBe("Email");
});

test("password", () => {
  const { password } = schema.entries;
  expect(() => parse(password, "")).toThrow();
  expect(() => parse(password, "a".repeat(7))).toThrow();
  expect(() => parse(password, Number("1".repeat(8)))).toThrow();
  expect(parse(password, "a".repeat(8))).toBe("a".repeat(8));
  expect(label.password).toBe("Password");
});
