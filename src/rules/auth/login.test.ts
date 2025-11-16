// @vitest-environment node
import * as v from "valibot";
import { expect, test } from "vitest";
import { label, schema } from "./login";

test("fields", () => {
  expect(Object.keys(schema.entries)).toEqual(["email", "password"]);
});

test("email", () => {
  const { email } = schema.entries;
  expect(() => v.parse(email, "")).toThrow();
  expect(() => v.parse(email, "foo")).toThrow();
  expect(v.parse(email, "foo@example.com")).toBe("foo@example.com");
  expect(label.email).toBe("Email");
});

test("password", () => {
  const { password } = schema.entries;
  expect(() => v.parse(password, "")).toThrow();
  expect(() => v.parse(password, "a".repeat(7))).toThrow();
  expect(() => v.parse(password, Number("1".repeat(8)))).toThrow();
  expect(v.parse(password, "a".repeat(8))).toBe("a".repeat(8));
  expect(label.password).toBe("Password");
});
