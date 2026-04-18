export class InvalidEmailError extends Error {
  constructor(message = "E-mail should be valid.") {
    super(message);
    this.name = "InvalidEmailError";
  }
}
