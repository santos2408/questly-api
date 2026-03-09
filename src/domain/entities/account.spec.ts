import { describe, it, expect } from "vitest";
import { Account } from "./account.js";
import { faker } from "@faker-js/faker";

describe("Account Entity Unit Tests", () => {
  it("should create an instance of account", () => {
    // arrange
    const createdAt = new Date();
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.username(),
      createdAt,
    };

    // act
    const account = new Account(props);
    const expected = { ...props, bio: null };

    // assert
    expect(account.props).toStrictEqual(expected);
  });
});
