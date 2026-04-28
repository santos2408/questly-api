import type { AddAccount, CreateAccountDTO, Encrypter, AddAccountRepository } from "../add-account-protocols";
import { DbAddAccountUseCase } from "../db-add-account-usecase";

type SutTypes = {
  sut: AddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
};

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    // TODO: tipar parâmetro corretamente após finalizar a estrutura da entidade Account. Deve receber Account entity
    async add(account: any): Promise<void> {}
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
    const createAccountDTO: CreateAccountDTO = {
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    };
    const encryptSpy = vi.spyOn(encrypterStub, "encrypt");

    // act
    await sut.add(createAccountDTO);

    // assert
    expect(encryptSpy).toHaveBeenCalledWith(createAccountDTO.password);
  });

  it("should throw if Encrypter throws", async () => {
    // arrange
    const { sut, encrypterStub } = makeSut();
    const createAccountDTO: CreateAccountDTO = {
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    };
    vi.spyOn(encrypterStub, "encrypt").mockRejectedValueOnce(new Error());

    // act
    const promise = sut.add(createAccountDTO);

    // assert
    expect(promise).rejects.toThrowError();
  });

  it("should call AddAccountRepository with correct values", async () => {
    // arrange
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = vi.spyOn(addAccountRepositoryStub, "add");
    const createAccountDTO: CreateAccountDTO = {
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    };

    // act
    await sut.add(createAccountDTO);

    // assert
    expect(addSpy).toHaveBeenCalledWith({
      ...createAccountDTO,
      password: "hashed_password",
    });
  });

  // TODO: ...
  // it("should create an entity Account", async () => {});

  // TODO: ...
  // it("should return an output account", async () => {});
});
