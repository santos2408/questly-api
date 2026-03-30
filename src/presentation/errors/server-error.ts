export class ServerError extends Error {
  constructor(message?: string) {
    super(message || "Algo inesperado aconteceu, por favor, tente novamente mais tarde.");
    this.name = "ServerError";
  }
}
