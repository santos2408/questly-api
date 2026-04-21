import { describe, it, expect } from "vitest";
import { ValueObject } from "../value-object";

class ValueObjectStub extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("should set a primitive value", () => {
    const value = "any_value";
    const valueObjectStub = new ValueObjectStub(value);
    expect(valueObjectStub.value).toBe(value);
  });

  it("should set an object value", () => {
    const value = { prop1: "any_value" };
    const valueObjectStub = new ValueObjectStub(value);
    expect(valueObjectStub.value).toStrictEqual(value);
  });

  it("should convert to a string", () => {
    const values = [{ prop1: "any_value" }, "", "valid_string", 0, 1, 10, true, false, new Date(), undefined, null, () => {}];
    values.forEach((value) => {
      const valueObjectStub = new ValueObjectStub(value);
      expect(valueObjectStub.value).toBe(value);
      expect(valueObjectStub.toString()).toBeTypeOf("string");
    });
  });

  it("ensure ValueObject value is immutable", () => {
    const valueObjectStub = new ValueObjectStub({ prop1: "value1", nested: { prop2: "value2" } });
    const actual = () => (valueObjectStub["_value"].nested.prop2 = "change!");
    expect(actual).toThrow();
  });
});
