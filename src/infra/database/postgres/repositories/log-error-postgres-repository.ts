import type { LogErrorRepository } from "../../../../domain/protocols/decorators/log-error-repository.js";
import { PostgresHelper } from "../helpers/postgres-helper.js";

export class LogErrorPostgresRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const connection = await PostgresHelper.getConnection();
    await connection.query(`INSERT INTO errors (stack) VALUES ($1)`, [stack]);
  }
}
