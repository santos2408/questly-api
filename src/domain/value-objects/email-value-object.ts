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

  private validateEmailLength(email: string) {
    const emailLengthMaxAllowed = 254;
    const isAValidEmailLength = email.length <= emailLengthMaxAllowed;

    if (!isAValidEmailLength) {
      throw new InvalidEmailError();
    }
  }

  private validateEmailRegex(email: string) {
    const isValid = EMAIL_REGEX.test(email);

    if (!isValid) {
      throw new InvalidEmailError();
    }
  }

  private validateLocalPartAndDomain(email: string) {
    const [localPart, domain] = email.split("@");

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
  }

  private validate() {
    const normalizedEmail = this.normalize(this.value);

    if (!normalizedEmail) {
      throw new InvalidEmailError();
    }

    this.validateLocalPartAndDomain(normalizedEmail);
    this.validateEmailLength(normalizedEmail);
    this.validateEmailRegex(normalizedEmail);
  }
}
