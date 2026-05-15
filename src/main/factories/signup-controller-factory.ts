import type { Controller } from "../../presentation/protocols/controller.js";
import { SignUpController } from "../../presentation/controllers/signup/signup-controller.js";
import { EmailValidatorAdapter } from "../../presentation/utils/email-validator-adapter.js";
import { DbAddAccountUseCase } from "../../application/usecases/add-account/index.js";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter.js";
import { AddAccountPostgresRepository } from "../../infra/database/postgres/repositories/postgres-account-repository.js";
import { LogErrorControllerDecorator } from "../decorators/log-error-controller-decorator.js";
import { LogErrorPostgresRepository } from "../../infra/database/postgres/repositories/postgres-log-error-repository.js";

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const emailValidator = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const addAccountPostgresRepository = new AddAccountPostgresRepository();
  const dbAddAccountUseCase = new DbAddAccountUseCase(bcryptAdapter, addAccountPostgresRepository);
  const signupController = new SignUpController(emailValidator, dbAddAccountUseCase);
  const logErrorRepository = new LogErrorPostgresRepository();
  return new LogErrorControllerDecorator(signupController, logErrorRepository);
};
