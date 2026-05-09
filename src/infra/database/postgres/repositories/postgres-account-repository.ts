import type { AddAccountRepository } from "../../../../domain/protocols/account/add-account-repository.js";
import { Account } from "../../../../domain/entities/account.js";
import { PostgresHelper } from "../helpers/postgres-helper.js";

export class AddAccountPostgresRepository implements AddAccountRepository {
  async add(account: Account): Promise<void> {
    const { id, name, email, password, role, status, createdAt, updatedAt } = account.toJSON();
    const connection = await PostgresHelper.getConnection();
    await connection.query(
      `INSERT INTO accounts (id, name, email, password, role, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, name, email, password, role, status, createdAt, updatedAt],
    );
  }
}
