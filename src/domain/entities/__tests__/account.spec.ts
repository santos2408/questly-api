import { describe, it, expect } from "vitest";
import { Account } from "../account";
import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../../value-objects/unique-entity-id-value-object";
import { ROLES, STATUS } from "../../enums";

describe("Account Entity Unit Tests", () => {
  it("should create account with valid initial props", () => {
    // arrange
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
    };

    // act
    const account = Account.create(props);

    // assert
    expect(account.name).toBe(props.name);
    expect(account.email).toBe(props.email);
    expect(account.password).toBe(props.password);
  });

  it("should create account with valid 'role' prop", () => {
    // arrange
    const createdAt = new Date();
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      role: ROLES.USER,
      createdAt,
    };

    // act
    const account = Account.create(props);

    // assert
    expect(account.role).toBeTruthy();
    expect(account.role).toBe(ROLES.USER);
  });

  it("should create account with valid 'status' prop", () => {
    // arrange
    const createdAt = new Date();
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      status: STATUS.ACTIVE,
      createdAt,
    };

    // act
    const account = Account.create(props);

    // assert
    expect(account.status).toBeTruthy();
    expect(account.status).toBe(STATUS.ACTIVE);
  });

  it("should set createdAt and updatedAt if it is not provided", () => {
    // arrange
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
    };

    // act
    const account = Account.create(props);

    // assert
    expect(account.createdAt).toBeInstanceOf(Date);
    expect(account.updatedAt).toBeInstanceOf(Date);
  });

  it("should generate a valid 'id' if none is provided", () => {
    // arrange
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
    };

    // act
    const account = Account.create(props);

    // assert
    expect(account.accountId).toBeDefined();
    expect(account.accountId).toBeInstanceOf(UniqueEntityId);
  });

  it("should use the provided 'id' if one is given", () => {
    // arrange
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
    };

    // act
    const id = new UniqueEntityId();
    const account = Account.create(props, id);

    // assert
    expect(account.accountId).toBe(id);
  });
});
