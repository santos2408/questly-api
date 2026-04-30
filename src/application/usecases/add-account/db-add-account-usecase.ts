import type { AddAccount, AddAccountOutput, AddAccountRepository, CreateAccountDTO, Encrypter } from "./add-account-protocols";
import { Account } from "../../../domain/entities/account";

export class DbAddAccountUseCase implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;

  constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountDTO: CreateAccountDTO): Promise<AddAccountOutput> {
    const hashedPassword = await this.encrypter.encrypt(accountDTO.password);
    const account = Account.create({ ...accountDTO, password: hashedPassword });
    await this.addAccountRepository.add(account);
    const accountOutput = account.toJSON();
    return accountOutput;
  }
}
