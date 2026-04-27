import type { Encrypter } from "../../../protocols/encrypter";
import type { CreateAccountDTO } from "../create-account-dto";
import { DbAddAccountUseCase } from "../db-add-account-usecase";

class EncrypterStub implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return Promise.resolve("hashed_password");
  }
}

describe("DbAddAccount UseCase", () => {
  it("should call encrypter with correct password", async () => {
    // arrange
    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccountUseCase(encrypterStub);
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
});
