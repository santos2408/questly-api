import type { Encrypter } from "../../../protocols/encrypter";
import type { CreateAccountDTO } from "../create-account-dto";
import type { AddAccount } from "../add-account";
import { DbAddAccountUseCase } from "../db-add-account-usecase";

type SutTypes = {
  sut: AddAccount;
  encrypterStub: Encrypter;
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
  const sut = new DbAddAccountUseCase(encrypterStub);
  return { sut, encrypterStub };
};

describe("DbAddAccount UseCase", () => {
  it("should call encrypter with correct password", async () => {
    // arrange
    const { sut, encrypterStub } = makeSut();
    const createAccountDTO: CreateAccountDTO = {
      name: "string;",
      email: "string;",
      password: "string",
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
});
