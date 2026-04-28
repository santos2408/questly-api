import type { AddAccount, AddAccountOutput, AddAccountRepository, CreateAccountDTO, Encrypter } from "./add-account-protocols";
import { ROLES, STATUS } from "../../../domain/constants";

export class DbAddAccountUseCase implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;

  constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(account: CreateAccountDTO): Promise<AddAccountOutput> {
    const hashedPassword = await this.encrypter.encrypt(account.password);
    await this.addAccountRepository.add({ ...account, password: hashedPassword });

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
