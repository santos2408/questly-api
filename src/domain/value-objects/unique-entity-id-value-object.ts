import { randomUUID } from "node:crypto";
import { validate as uuidValidate } from "uuid";
import { InvalidUuidError } from "../errors/invalid-uuid-error";

export class UniqueEntityId {
  private readonly id?: string;

  constructor(id?: string) {
    this.id = id ?? randomUUID();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
