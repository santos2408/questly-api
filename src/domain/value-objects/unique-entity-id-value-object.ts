import { randomUUID } from "node:crypto";
import { InvalidUuidError } from "../errors/invalid-uuid-error.js";
import { ValueObject } from "./value-object.js";
import { validate as uuidValidate } from "uuid";

export class UniqueEntityId extends ValueObject<string> {
  constructor(id?: string) {
    super(id ?? randomUUID());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
