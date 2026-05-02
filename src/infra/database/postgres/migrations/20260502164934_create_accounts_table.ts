import type pg from "pg";

export const name = "20260502164934_create_accounts_table";

export async function up(connection: pg.Pool): Promise<void> {
  await connection.query(`CREATE TABLE IF NOT EXISTS accounts (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL,
      status VARCHAR(20) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function down(connection: pg.Pool): Promise<void> {
  await connection.query("DROP TABLE accounts");
}
