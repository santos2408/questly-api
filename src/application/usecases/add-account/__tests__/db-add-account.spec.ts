import type { AddAccount, CreateAccountDTO, Encrypter, AddAccountRepository } from "../add-account-protocols";
import { DbAddAccountUseCase } from "../db-add-account-usecase";
import { Account } from "../../../../domain/entities/account";

type SutTypes = {
  sut: AddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
};

const makeCreateAccountDTO = (): CreateAccountDTO => ({
  name: "any_name",
  email: "any_email@mail.com",
  password: "any_password",
});

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: Account): Promise<void> {}
  }
  return new AddAccountRepositoryStub();
};

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve("hashed_password");
    }
  }
  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub();
  const addAccountRepositoryStub = makeAddAccountRepositoryStub();
  const sut = new DbAddAccountUseCase(encrypterStub, addAccountRepositoryStub);
  return { sut, encrypterStub, addAccountRepositoryStub };
};

describe("DbAddAccount UseCase", () => {
  it("should call encrypter with correct password", async () => {
    // arrange
    const { sut, encrypterStub } = makeSut();
    const createAccountDTO = makeCreateAccountDTO();
    const encryptSpy = vi.spyOn(encrypterStub, "encrypt");

    // act
    await sut.add(createAccountDTO);

    // assert
    expect(encryptSpy).toHaveBeenCalledWith(createAccountDTO.password);
  });

  it("should throw if Encrypter throws", async () => {
    // arrange
    const { sut, encrypterStub } = makeSut();
    const createAccountDTO = makeCreateAccountDTO();
    vi.spyOn(encrypterStub, "encrypt").mockRejectedValueOnce(new Error());

    // act
    const promise = sut.add(createAccountDTO);

    // assert
    await expect(promise).rejects.toThrowError();
  });

  it("should call AddAccountRepository with correct values", async () => {
    // arrange
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = vi.spyOn(addAccountRepositoryStub, "add");
    const createAccountDTO = makeCreateAccountDTO();
    const account = Account.create(createAccountDTO);
    vi.spyOn(Account, "create").mockReturnValueOnce(account);

    // act
    await sut.add(createAccountDTO);

    // assert
    expect(addSpy).toHaveBeenCalledWith(account);
  });

  it("should throw if AddAccountRepository throws", async () => {
    // arrange
    const { sut, addAccountRepositoryStub } = makeSut();
    const createAccountDTO = makeCreateAccountDTO();
    vi.spyOn(addAccountRepositoryStub, "add").mockRejectedValueOnce(new Error());

    // act
    const promise = sut.add(createAccountDTO);

    // assert
    await expect(promise).rejects.toThrowError();
  });

  it("should return an output account on success", async () => {
    // arrange
    const { sut } = makeSut();
    const createAccountDTO: CreateAccountDTO = { ...makeCreateAccountDTO(), password: "hashed_password" };
    const account = Account.create(createAccountDTO);
    vi.spyOn(Account, "create").mockReturnValueOnce(account);

    // act
    const accountOutput = await sut.add(createAccountDTO);

    // assert
    const expected = account.toJSON();
    expect(accountOutput).toEqual(expected);
  });
});
