export class InvalidUuidError extends Error {
  constructor(message = "ID must be a valid UUID.") {
    super(message);
    this.name = "InvalidUuidError";
  }
}
