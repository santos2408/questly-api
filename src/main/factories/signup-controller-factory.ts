import { SignUpController } from "../../presentation/controllers/signup/signup-controller";
import { EmailValidatorAdapter } from "../../presentation/utils/email-validator-adapter";
import { DbAddAccountUseCase } from "../../application/usecases/add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AddAccountPostgresRepository } from "../../infra/database/postgres/account-repository/postgres-account-repository";

export const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const emailValidator = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const addAccountPostgresRepository = new AddAccountPostgresRepository();
  const dbAddAccountUseCase = new DbAddAccountUseCase(bcryptAdapter, addAccountPostgresRepository);
  return new SignUpController(emailValidator, dbAddAccountUseCase);
};
