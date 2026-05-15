import type { LogErrorRepository } from "../../../../domain/protocols/decorators/log-error-repository.js";

export class LogErrorPostgresRepository implements LogErrorRepository {
  async log(stack: string): Promise<void> {
    //
  }
}
