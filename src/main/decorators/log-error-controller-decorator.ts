import type { LogErrorRepository } from "../../domain/protocols/decorators/log-error-repository.js";
import type { Controller } from "../../presentation/protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../presentation/protocols/http.js";

export class LogErrorControllerDecorator implements Controller {
  private readonly controller: Controller;
  private readonly logErrorRepository: LogErrorRepository;

  constructor(controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller;
    this.logErrorRepository = logErrorRepository;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    const serverErrorStatusCode = 500;

    if (httpResponse.statusCode === serverErrorStatusCode) {
      await this.logErrorRepository.log(httpResponse.body.stack);
    }

    return httpResponse;
  }
}
