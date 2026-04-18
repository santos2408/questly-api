import { ValueObject } from "./value-object";
import { InvalidEmailError } from "../errors/invalid-email-error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Email extends ValueObject<string> {
  constructor(email: string) {
    super(email);
    this.validate();
  }

  private normalize(email: string) {
    return email.trim().toLowerCase();
  }

  private validate() {
    const normalizedEmail = this.normalize(this._value);

    if (!normalizedEmail) {
      throw new InvalidEmailError();
    }

    const [localPart, domain] = normalizedEmail.split("@");

    if (!localPart || !domain) {
      throw new InvalidEmailError();
    }

    const localPartLengthMaxAllowed = 64;
    const domainLengthMaxAllowed = 255;
    const isAValidLocalLength = localPart.length <= localPartLengthMaxAllowed;
    const isAValidDomainLength = domain.length <= domainLengthMaxAllowed;

    if (!isAValidLocalLength || !isAValidDomainLength) {
      throw new InvalidEmailError();
    }

    const emailLengthMaxAllowed = 254;
    const isAValidEmailLength = normalizedEmail.length <= emailLengthMaxAllowed;

    if (!isAValidEmailLength) {
      throw new InvalidEmailError();
    }

    const isValid = EMAIL_REGEX.test(normalizedEmail);

    if (!isValid) {
      throw new InvalidEmailError();
    }
  }
}
