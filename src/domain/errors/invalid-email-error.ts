export class InvalidEmailError extends Error {
  constructor(message = "e-mail should be valid.") {
    super(message);
    this.name = "InvalidEmailError";
  }
}
