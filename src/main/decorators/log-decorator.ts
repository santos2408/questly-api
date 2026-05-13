import type { Controller } from "../../presentation/protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../presentation/protocols/http.js";

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    const serverErrorStatusCode = 500;

    if (httpResponse.statusCode === serverErrorStatusCode) {
      // log error
    }

    return httpResponse;
  }
}
