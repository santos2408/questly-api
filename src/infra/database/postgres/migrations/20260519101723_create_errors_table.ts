import type pg from "pg";

export const name = "20260519101723_create_errors_table";

export async function up(client: pg.PoolClient): Promise<void> {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
  await client.query(`CREATE TABLE IF NOT EXISTS errors (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      stack TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function down(client: pg.PoolClient): Promise<void> {
  await client.query("DROP TABLE errors");
}
