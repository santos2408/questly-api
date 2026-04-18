import { describe, it, expect, vi } from "vitest";
import { UniqueEntityId } from "../unique-entity-id-value-object";
import { InvalidUuidError } from "../../errors/invalid-uuid-error";

describe("UniqueEntityIdValueObject Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    // arrange
    const id = "invalid_id";
    const expected = new InvalidUuidError();
    const validateSpy = vi.spyOn(UniqueEntityId.prototype as any, "validate");

    // act
    const actual = () => new UniqueEntityId(id);

    // assert
    expect(actual).toThrowError(expected);
    expect(validateSpy).toHaveBeenCalled();
  });

  // it("should accept an uuid passed in constructor", () => {
  //   //
  // });
});
