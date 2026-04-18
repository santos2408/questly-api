import { describe, it, expect } from "vitest";
import { Email } from "../email-value-object";
import { InvalidEmailError } from "./../../errors/invalid-email-error";

const makeEmail = (localLength: number, domainLength: number): string => {
  const local = "a".repeat(localLength);
  const tld = ".com";
  const domainLabelLength = domainLength - tld.length;
  const domain = `${"b".repeat(domainLabelLength)}${tld}`;
  return `${local}@${domain}`;
};

describe("Email Unit Tests", () => {
  it("should throw an error if normalized email is invalid", () => {
    const email = " ";
    const actual = () => new Email(email);
    expect(actual).toThrowError(InvalidEmailError);
  });

  it("should accept local-part with 64 chars", () => {
    const email = makeEmail(64, 10);
    const actual = () => new Email(email);
    expect(actual).not.toThrow();
  });

  it("should throw if local-part is more than 64 chars", () => {
    const email = makeEmail(65, 10);
    const actual = () => new Email(email);
    expect(actual).toThrowError(InvalidEmailError);
  });

  it("should throw if domain is missing", () => {
    const email = "local@";
    const actual = () => new Email(email);
    expect(actual).toThrowError(InvalidEmailError);
  });

  it("should throw if domain format is invalid", () => {
    const email = "local@domain";
    const actual = () => new Email(email);
    expect(actual).toThrowError(InvalidEmailError);
  });

  it("should accept email with 254 chars", () => {
    const local = "a".repeat(64);
    const domain = `${"b".repeat(185)}.com`;
    const email = `${local}@${domain}`;
    const actual = () => new Email(email);

    expect(email).toHaveLength(254);
    expect(actual).not.toThrow();
  });

  it("should throw if email has more than 254 chars", () => {
    const local = "a".repeat(64);
    const domain = `${"b".repeat(186)}.com`;
    const email = `${local}@${domain}`;
    const actual = () => new Email(email);

    expect(email).toHaveLength(255);
    expect(actual).toThrowError(InvalidEmailError);
  });

  it("should throw an error if email is invalid", () => {
    const email = "invalid_email";
    const actual = () => new Email(email);
    expect(actual).toThrowError(InvalidEmailError);
  });
});
