import { describe, it, expect } from "vitest";
import { ValueObject } from "../value-object";

class ValueObjectStub extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("should set a primitive value", () => {
    const value = "any_value";
    const valueObjectStub = new ValueObjectStub(value);
    expect(valueObjectStub.value).toBe(value);

    // value = { prop1: "any_value" };
    // valueObjectStub = new ValueObjectStub(value);
    // expect(valueObjectStub.value).toStrictEqual(value);
  });

  it("should set an object value", () => {
    const value = { prop1: "any_value" };
    const valueObjectStub = new ValueObjectStub(value);
    expect(valueObjectStub.value).toStrictEqual(value);
  });
});
