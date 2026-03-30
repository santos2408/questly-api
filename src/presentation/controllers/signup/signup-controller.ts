import type { Controller, HttpRequest, HttpResponse, EmailValidator } from "../../protocols";
import { MissingParamError, InvalidParamError } from "./../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["name", "email", "password", "passwordConfirmation"];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isAValidPasswordConfirmation = httpRequest.body.password.trim() === httpRequest.body.passwordConfirmation.trim();

      if (!isAValidPasswordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      return { statusCode: 400 };
    } catch (error) {
      return serverError();
    }
  }
}
