import type { Encrypter } from "../../../application/protocols/index.js";
import bcrypt from "bcrypt";
import { BcryptAdapter } from "../bcrypt-adapter.js";

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

  it("should return hashed value on success", async () => {
    vi.spyOn(bcrypt, "hash").mockImplementationOnce(async () => "hashed_value");
    const { sut } = makeSut();
    const value = "any_value";
    const hashedValue = await sut.encrypt(value);
    expect(hashedValue).toBe("hashed_value");
  });

  it("should throw if bcrypt throws", async () => {
    vi.spyOn(bcrypt, "hash").mockRejectedValueOnce(new Error());
    const { sut } = makeSut();
    const value = "any_value";
    const promise = sut.encrypt(value);
    await expect(promise).rejects.toThrowError();
  });
});
