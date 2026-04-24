import type { EmailValidator } from "../protocols";

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return false;
  }
}
