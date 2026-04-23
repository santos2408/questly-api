import type { Controller, HttpRequest, HttpResponse, EmailValidator } from "../../protocols";
import type { AddAccount } from "../../../application/usecases/add-account/add-account";
import { MissingParamError, InvalidParamError } from "./../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["name", "email", "password", "passwordConfirmation"];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { honeypot, name, email, password, passwordConfirmation } = httpRequest.body;
      const isAValidPasswordConfirmation = password.trim() === passwordConfirmation.trim();
      const isHoneypotValid = Boolean(honeypot);

      if (isHoneypotValid) {
        return badRequest(new InvalidParamError("honeypot"));
      }

      if (!isAValidPasswordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      await this.addAccount.add({ name, email, password });

      return { statusCode: 400 };
    } catch (error) {
      return serverError();
    }
  }
}
