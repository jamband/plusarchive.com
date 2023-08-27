/** @jest-environment node */
import { parse } from "valibot";
import { label, schema } from "./login";

test("fields", () => {
  expect(Object.keys(schema.object)).toEqual(["email", "password"]);
});

test("email", () => {
  const { email } = schema.object;
  expect(() => parse(email, "")).toThrowError();
  expect(() => parse(email, "foo")).toThrowError();
  expect(parse(email, "foo@example.com")).toBe("foo@example.com");
  expect(label.email).toBe("Email");
});

test("password", () => {
  const { password } = schema.object;
  expect(() => parse(password, "")).toThrowError();
  expect(() => parse(password, "a".repeat(7))).toThrowError();
  expect(() => parse(password, Number("1".repeat(8)))).toThrowError();
  expect(parse(password, "a".repeat(8))).toBe("a".repeat(8));
  expect(label.password).toBe("Password");
});
