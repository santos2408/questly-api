import { describe, it, expect } from "vitest";
import { ValueObject } from "../value-object";

class ValueObjectStub extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("should set a value", () => {
    let value: any = "any_value";
    let valueObject: ValueObject = new ValueObjectStub(value);
    expect(valueObject.value).toBe(value);

    value = { prop1: "any_value" };
    valueObject = new ValueObjectStub(value);
    expect(valueObject.value).toStrictEqual(value);
  });
});
