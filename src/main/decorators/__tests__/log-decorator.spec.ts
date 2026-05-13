import type { Controller } from "../../../presentation/protocols/controller.js";
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

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: Controller;
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);
  return { sut, controllerStub };
};

describe("Log Controller Decorator", () => {
  it("should call controller.handle", async () => {
    // arrange

    const { sut, controllerStub } = makeSut();
    const httpRequest = {
      body: {
        honeypot: "any_value",
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const handleSpy = vi.spyOn(controllerStub, "handle");

    // act
    await sut.handle(httpRequest);

    // assert
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
