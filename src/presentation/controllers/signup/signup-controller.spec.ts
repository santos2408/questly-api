import type { EmailValidator } from "../../protocols/email-validator";
import type { AddAccount, CreateAccountDTO, AddAccountOutput } from "../../../application/usecases/add-account";
import { ROLES, STATUS } from "../../../domain/constants";
import { MissingParamError, InvalidParamError, ServerError } from "../../errors";
import { SignUpController } from "./signup-controller";

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const currentDate = new Date();

const makeAddAccountStub = () => {
  class AddAccountStub implements AddAccount {
    async add(accountDTO: CreateAccountDTO): Promise<AddAccountOutput> {
      return Promise.resolve({
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@mail.com",
        status: STATUS.ACTIVE,
        role: ROLES.USER,
        createdAt: currentDate,
      });
    }
  }
  return new AddAccountStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccountStub();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return { sut, emailValidatorStub, addAccountStub };
};

describe("SignUp Controller", () => {
  it("should return 400 if 'honeypot' is valid", async () => {
    // ============ arrange ============
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        honeypot: "any_value",
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);

    // ============ assert ============
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("honeypot"));
  });

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

  it("should return 400 if 'passwordConfirmation' failed", async () => {
    // ============ arrange ============
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "invalid_password",
      },
    };

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);

    // ============ assert ============
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("passwordConfirmation"));
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

  it("should call AddAccount with correct values", async () => {
    // ============ arrange ============
    const { sut, addAccountStub } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const addSpy = vi.spyOn(addAccountStub, "add");

    // ============ act ============
    await sut.handle(httpRequest);

    // ============ assert ============
    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });
  });

  it("should return 500 if addAccount throws", async () => {
    // ============ arrange ============
    const { sut, addAccountStub } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    vi.spyOn(addAccountStub, "add").mockRejectedValueOnce(new Error());

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);

    // ============ assert ============
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("should return 204 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email@mail.com",
        password: "valid_password",
        passwordConfirmation: "valid_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      name: "valid_name",
      email: "valid_email@mail.com",
      status: STATUS.ACTIVE,
      role: ROLES.USER,
      createdAt: currentDate,
    });
  });
});
