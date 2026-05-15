import type { Controller } from "../../../presentation/protocols/controller.js";
import type { LogErrorRepository } from "../../../domain/protocols/decorators/log-error-repository.js";
import type { HttpRequest, HttpResponse } from "../../../presentation/protocols/http.js";
import { LogControllerDecorator } from "../log-decorator.js";

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve({ statusCode: 200, body: {} });
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

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepositoryStub();
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
  return { sut, controllerStub, logErrorRepositoryStub };
};

const httpRequest: HttpRequest = {
  body: {
    honeypot: "any_value",
    name: "any_name",
    email: "any_email@mail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
};

describe("Log Controller Decorator", () => {
  it("should call controller.handle", async () => {
    // arrange
    const { sut, controllerStub } = makeSut();
    const handleSpy = vi.spyOn(controllerStub, "handle");

    // act
    await sut.handle(httpRequest);

    // assert
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  it("should return the same httpResponse of the controller", async () => {
    // arrange
    const { sut } = makeSut();

    // act
    const httpResponse = await sut.handle(httpRequest);

    // assert
    expect(httpResponse).toEqual({ statusCode: 200, body: {} });
  });

  it("should call LogErrorRepository with correct stack error", async () => {
    // arrange
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const error = new Error();
    error.stack = "any_value";

    vi.spyOn(controllerStub, "handle").mockResolvedValueOnce({ statusCode: 500, body: error });
    const logSpy = vi.spyOn(logErrorRepositoryStub, "log");

    // act
    await sut.handle(httpRequest);

    // assert
    expect(logSpy).toHaveBeenCalledWith(error.stack);
  });
});
