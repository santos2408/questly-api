import type { EmailValidator } from "../../protocols/email-validator";
import { describe, expect, it, vi } from "vitest";
import { SignUpController } from "./signup-controller";
import { MissingParamError, InvalidParamError, ServerError } from "../../errors";

interface SutTypes {
  emailValidatorStub: EmailValidator;
  sut: SignUpController;
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);
  return { emailValidatorStub, sut };
};

describe("SignUp Controller", () => {
  it("should return 400 if no 'name' is provided", async () => {
    // ============ arrange ============
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);

    // ============ assert ============
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("should return 400 if no 'email' is provided", async () => {
    // ============ arrange ============
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);

    // ============ assert ============
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  it("should return 400 if no 'password' is provided", async () => {
    // ============ arrange ============
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        passwordConfirmation: "any_password",
      },
    };

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);

    // ============ assert ============
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  it("should return 400 if no 'passwordConfirmation' is provided", async () => {
    // ============ arrange ============
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      },
    };

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);

    // ============ assert ============
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"));
  });

  it("should return 400 if an invalid 'email' is provided", async () => {
    // ============ arrange ============
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    vi.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);

    // ============ assert ============
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  it("should call EmailValidator with correct email", async () => {
    // ============ arrange ============
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const isValidSpy = vi.spyOn(emailValidatorStub, "isValid");

    // ============ act ============
    await sut.handle(httpRequest);

    // ============ assert ============
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  it("should return 500 if EmailValidator throws", async () => {
    // ============ arrange ============
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    vi.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);

    // ============ assert ============
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
