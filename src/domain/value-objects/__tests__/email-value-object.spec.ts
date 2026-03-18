import { describe, it, expect } from "vitest";
import { Email } from "../email-value-object";
import { InvalidEmailError } from "./../../errors/invalid-email-error";

describe("Email Unit Tests", () => {
  it("should throw an error if email is invalid", () => {
    const email = "invalid_email";
    const actual = () => new Email(email);
    expect(actual).toThrowError(InvalidEmailError);
  });
});
