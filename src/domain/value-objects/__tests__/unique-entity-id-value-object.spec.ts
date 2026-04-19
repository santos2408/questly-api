import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../unique-entity-id-value-object";
import { InvalidUuidError } from "../../errors/invalid-uuid-error";

describe("UniqueEntityIdValueObject Unit Tests", () => {
  it("should throw error when 'uuid' is invalid", () => {
    // arrange
    const id = "invalid_id";
    const expected = new InvalidUuidError();

    // act
    const actual = () => new UniqueEntityId(id);

    // assert
    expect(actual).toThrowError(expected);
  });

  it("should accept an 'uuid' passed in constructor", () => {
    // arrange
    const id = faker.string.uuid();

    // act
    const actual = () => new UniqueEntityId(id);

    // assert
    expect(actual).not.toThrow();
  });

  it("should generate a valid 'uuid' when no 'id' is provided", () => {
    const actual = new UniqueEntityId();
    expect(actual.value).toBeTypeOf("string");
    expect(actual).toBeInstanceOf(UniqueEntityId);
  });
});
