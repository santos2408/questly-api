import type { EmailValidator } from "../../protocols/email-validator.js";
import type { AddAccount, CreateAccountDTO, AddAccountOutput } from "../../../application/usecases/add-account/index.js";
import type { HttpRequest } from "../../protocols/http.js";
import { ROLES, STATUS } from "../../../domain/constants/index.js";
import { MissingParamError, InvalidParamError, ServerError } from "../../errors/index.js";
import { SignUpController } from "./signup-controller.js";
import { badRequest, created, serverError } from "../../helpers/http-helper.js";

// types
type SutTypes = {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
};

// variables
const currentDate = new Date();

// factories
const makeHttpRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any_email@mail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

const makeFakeAccount = () => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email@mail.com",
  status: STATUS.ACTIVE,
  role: ROLES.USER,
  createdAt: currentDate,
});

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeAddAccountStub = () => {
  class AddAccountStub implements AddAccount {
    async add(accountDTO: CreateAccountDTO): Promise<AddAccountOutput> {
      return Promise.resolve(makeFakeAccount());
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
    const httpRequest = { body: { ...makeHttpRequest().body, honeypot: "any_value" } };

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);
    const expected = badRequest(new InvalidParamError("honeypot"));

    // ============ assert ============
    expect(httpResponse).toEqual(expected);
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
    const expected = badRequest(new MissingParamError("name"));

    // ============ assert ============
    expect(httpResponse).toEqual(expected);
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
    const expected = badRequest(new MissingParamError("email"));

    // ============ assert ============
    expect(httpResponse).toEqual(expected);
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
    const expected = badRequest(new MissingParamError("password"));

    // ============ assert ============
    expect(httpResponse).toEqual(expected);
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
    const expected = badRequest(new MissingParamError("passwordConfirmation"));

    // ============ assert ============
    expect(httpResponse).toEqual(expected);
  });

  it("should return 400 if 'passwordConfirmation' failed", async () => {
    // ============ arrange ============
    const { sut } = makeSut();
    const httpRequest = { body: { ...makeHttpRequest().body, passwordConfirmation: "other_password" } };

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);
    const expected = badRequest(new InvalidParamError("passwordConfirmation"));

    // ============ assert ============
    expect(httpResponse).toEqual(expected);
  });

  it("should return 400 if an invalid 'email' is provided", async () => {
    // ============ arrange ============
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = makeHttpRequest();
    vi.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);
    const expected = badRequest(new InvalidParamError("email"));

    // ============ assert ============
    expect(httpResponse).toEqual(expected);
  });

  it("should call EmailValidator with correct email", async () => {
    // ============ arrange ============
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = makeHttpRequest();
    const isValidSpy = vi.spyOn(emailValidatorStub, "isValid");

    // ============ act ============
    await sut.handle(httpRequest);

    // ============ assert ============
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  it("should return 500 if EmailValidator throws", async () => {
    // ============ arrange ============
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = makeHttpRequest();
    const error = new Error();
    error.stack = "any_stack";

    vi.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);
    const expected = serverError(new ServerError(error.stack));

    // ============ assert ============
    expect(httpResponse).toEqual(expected);
  });

  it("should call AddAccount with correct values", async () => {
    // ============ arrange ============
    const { sut, addAccountStub } = makeSut();
    const httpRequest = makeHttpRequest();
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
    const httpRequest = makeHttpRequest();
    const error = new Error();
    error.stack = "any_stack";

    vi.spyOn(addAccountStub, "add").mockRejectedValueOnce(error);

    // ============ act ============
    const httpResponse = await sut.handle(httpRequest);
    const expected = serverError(new ServerError(error.stack));

    // ============ assert ============
    expect(httpResponse).toEqual(expected);
  });

  it("should return 201 if valid data is provided", async () => {
    // arrange
    const { sut } = makeSut();
    const httpRequest = makeHttpRequest();

    // act
    const httpResponse = await sut.handle(httpRequest);
    const fakeAccount = makeFakeAccount();
    const expected = created(fakeAccount);

    // assert
    expect(httpResponse).toEqual(expected);
  });
});
