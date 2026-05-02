import { deepFreeze } from "../objects.js";

describe("deepFreeze Objects Unit Tests", () => {
  it("should not freeze a scalar value", () => {
    const str = deepFreeze("any_value");
    const boolean = deepFreeze(true);
    const fn = deepFreeze(() => {});
    const number = deepFreeze(10);
    const und = deepFreeze(undefined);

    expect(str).toBeTypeOf("string");
    expect(boolean).toBeTypeOf("boolean");
    expect(fn).toBeTypeOf("function");
    expect(number).toBeTypeOf("number");
    expect(und).toBeTypeOf("undefined");
  });

  it("should be a immutable object", () => {
    const hollowObject = deepFreeze({ a: 1 });
    const deepObject = deepFreeze({ a: 1, deep: { b: new Date() } });

    const actualHollowObject = () => (hollowObject.a = 125);
    const actualDeepObject = () => (deepObject.deep.b = new Date());

    expect(actualHollowObject).toThrow();
    expect(actualDeepObject).toThrow();
    expect(deepObject.deep.b).toBeTypeOf("object");
  });
});
