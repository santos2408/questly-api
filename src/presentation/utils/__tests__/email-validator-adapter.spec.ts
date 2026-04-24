import validator from "validator";
import { EmailValidatorAdapter } from "../email-validator-adapter";

vi.mock("validator", () => ({
  default: {
    isEmail: vi.fn(),
  },
}));

describe("EmailValidator Adapter", () => {
  it("should return 'false' if validator returns 'false'", () => {
    vi.mocked(validator.isEmail).mockReturnValueOnce(false);
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  it("should return 'true' if validator returns 'true'", () => {
    // arrange
    vi.mocked(validator.isEmail).mockReturnValueOnce(true);
    const sut = new EmailValidatorAdapter();

    // act
    const isValid = sut.isValid("valid_email@mail.com");

    // assert
    expect(isValid).toBe(true);
  });
});
