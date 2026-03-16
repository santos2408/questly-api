import { describe, it, expect } from "vitest";
import { Account } from "./account.js";
import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../value-objects/unique-entity-id-value-object.js";

describe("Account  Entity Unit Tests", () => {
  it("should create account with valid initial props", () => {
    // arrange
    const createdAt = new Date();
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      createdAt,
    };

    // act
    const account = new Account(props);

    // assert
    expect(account.accountId).toBeInstanceOf(UniqueEntityId);
    expect(account.email).toBe(props.email);
    expect(account.password).toBe(props.password);
    expect(account.name).toBe(props.name);
    expect(account.bio).toBeNull();
    expect(account.createdAt).toStrictEqual(createdAt);
  });

  it("should create account with valid 'bio' prop", () => {
    // arrange
    const createdAt = new Date();
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      bio: "valid_bio",
      createdAt,
    };

    // act
    const account = new Account(props);

    // assert
    expect(account.bio).toBe(props.bio);
  });

  it("should set createdAt if it is not provided", () => {
    // arrange
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      bio: "valid_bio",
    };

    // act
    const account = new Account(props);

    // assert
    expect(account.createdAt).toBeInstanceOf(Date);
  });

  it("should generate a valid 'id' if none is provided", () => {
    // arrange
    const createdAt = new Date();
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      createdAt,
    };

    // act
    const account = new Account(props);

    // assert
    expect(account.accountId).toBeDefined();
    expect(account.accountId).toBeInstanceOf(UniqueEntityId);
  });

  it("should use the provided 'id' if one is given", () => {
    // arrange
    const createdAt = new Date();
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      createdAt,
    };

    // act
    const id = new UniqueEntityId();
    const account = new Account(props, id);

    // assert
    expect(account.accountId).toBe(id);
  });
});
