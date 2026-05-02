import { SignUpController } from "../../presentation/controllers/signup/signup-controller.js";
import { EmailValidatorAdapter } from "../../presentation/utils/email-validator-adapter.js";
import { DbAddAccountUseCase } from "../../application/usecases/add-account/index.js";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter.js";
import { AddAccountPostgresRepository } from "../../infra/database/postgres/repositories/postgres-account-repository.js";

export const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const emailValidator = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const addAccountPostgresRepository = new AddAccountPostgresRepository();
  const dbAddAccountUseCase = new DbAddAccountUseCase(bcryptAdapter, addAccountPostgresRepository);
  return new SignUpController(emailValidator, dbAddAccountUseCase);
};
