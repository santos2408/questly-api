import type { Controller } from "../../../presentation/protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../../presentation/protocols/http.js";
import { LogControllerDecorator } from "../log-decorator.js";

class ControllerStub implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve({ statusCode: 200, body: {} });
  }
}

describe("Log Controller Decorator", () => {
  it("should call controller.handle", async () => {
    // arrange
    const controllerStub = new ControllerStub();
    const sut = new LogControllerDecorator(controllerStub);
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
