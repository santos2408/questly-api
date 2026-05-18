import type { Controller } from "../../../presentation/protocols/controller.js";
import type { LogErrorRepository } from "../../../domain/protocols/decorators/log-error-repository.js";
import type { HttpRequest, HttpResponse } from "../../../presentation/protocols/http.js";
import { STATUS } from "../../../domain/constants/status.js";
import { ROLES } from "../../../domain/constants/roles.js";
import { LogErrorControllerDecorator } from "../log-error-controller-decorator.js";
import { serverError, ok } from "../../../presentation/helpers/http-helper.js";

// types
type SutTypes = {
  sut: LogErrorControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
};

// variables
const currentDate = new Date();

// factories
const makeHttpRequest = (): HttpRequest => ({
  body: {
    honeypot: "",
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

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve({ statusCode: 200, body: { ...makeFakeAccount() } });
    }
  }
  return new ControllerStub();
};

const makeLogErrorRepositoryStub = () => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {}
  }

  return new LogErrorRepositoryStub();
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepositoryStub();
  const sut = new LogErrorControllerDecorator(controllerStub, logErrorRepositoryStub);
  return { sut, controllerStub, logErrorRepositoryStub };
};

describe("Log Error Controller Decorator", () => {
  it("should call controller.handle", async () => {
    // arrange
    const { sut, controllerStub } = makeSut();
    const httpRequest = makeHttpRequest();
    const handleSpy = vi.spyOn(controllerStub, "handle");

    // act
    await sut.handle(httpRequest);

    // assert
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  it("should return the same httpResponse of the controller", async () => {
    // arrange
    const { sut } = makeSut();
    const httpRequest = makeHttpRequest();

    // act
    const httpResponse = await sut.handle(httpRequest);
    const expected = ok(makeFakeAccount());

    // assert
    expect(httpResponse).toEqual(expected);
  });

  it("should call LogErrorRepository with correct stack error", async () => {
    // arrange
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const httpRequest = makeHttpRequest();
    const error = new Error();
    error.stack = "any_value";

    vi.spyOn(controllerStub, "handle").mockResolvedValueOnce(serverError(error));
    const logSpy = vi.spyOn(logErrorRepositoryStub, "log");

    // act
    await sut.handle(httpRequest);

    // assert
    expect(logSpy).toHaveBeenCalledWith(error.stack);
  });
});
