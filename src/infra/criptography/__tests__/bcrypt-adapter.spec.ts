import type { Encrypter } from "../../../application/protocols";
import bcrypt from "bcrypt";
import { BcryptAdapter } from "../bcrypt-adapter";

type SutTypes = {
  sut: Encrypter;
};

const salt = 12;

const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter(12);
  return { sut };
};

describe("Bcrypt Adapter", () => {
  it("should call bcrypt with correct values", async () => {
    const hashSpy = vi.spyOn(bcrypt, "hash");
    const { sut } = makeSut();
    const value = "any_value";
    await sut.encrypt(value);
    expect(hashSpy).toHaveBeenCalledWith(value, salt);
  });
});
