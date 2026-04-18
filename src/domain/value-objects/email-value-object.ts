import { ValueObject } from "./value-object";
import { InvalidEmailError } from "../errors/invalid-email-error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * [] - a parte local, antes do @, pode ter até 64 caracteres
 * [] - o domínio pode chegar perto de 255 caracteres em teoria
 */

export class Email extends ValueObject<string> {
  constructor(email: string) {
    super(email);
    this.validate();
  }

  private validate() {
    const isValid = EMAIL_REGEX.test(this._value);
    if (!isValid) {
      throw new InvalidEmailError();
    }
  }
}
