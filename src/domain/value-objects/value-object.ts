export abstract class ValueObject<Value = any> {
  private readonly _value: Value;

  constructor(value: Value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
