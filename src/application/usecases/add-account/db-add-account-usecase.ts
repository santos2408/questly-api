import type { AddAccount, AddAccountOutput, CreateAccountDTO, Encrypter } from "./add-account-protocols";
import { ROLES, STATUS } from "../../../domain/constants";

export class DbAddAccountUseCase implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: CreateAccountDTO): Promise<AddAccountOutput> {
    await this.encrypter.encrypt(account.password);

    return {
      id: "string",
      name: "string",
      email: "string",
      status: STATUS.ACTIVE,
      role: ROLES.USER,
      createdAt: new Date(),
    };
  }
}
