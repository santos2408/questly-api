import type pg from "pg";
import fg from "fast-glob";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const migrationsHelper = {
  async run(client: pg.PoolClient) {
    let transactionStarted = false;

    try {
      await client.query(`CREATE TABLE IF NOT EXISTS migrations (
        name VARCHAR(255) PRIMARY KEY,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`);

      const queryResult: pg.QueryResult = await client.query("SELECT * FROM migrations");
      const files = await this.getFiles();

      for (const file of files) {
        const migration = await import(pathToFileURL(file).href);
        const alreadyExecuted = queryResult.rows.find((item) => item.name === migration.name);

        if (alreadyExecuted) continue;

        await client.query("BEGIN");
        transactionStarted = true;
        await migration.up(client);
        await client.query("INSERT INTO migrations (name) VALUES ($1)", [migration.name]);
        await client.query("COMMIT");
        transactionStarted = false;
      }
    } catch (error) {
      if (transactionStarted) {
        await client.query("ROLLBACK");
      }

      throw error;
    }
  },

  async getFiles() {
    const migrationsDir = path.resolve(__dirname, "../migrations");
    const files = await fg("*.{ts,js}", { cwd: migrationsDir, absolute: true, onlyFiles: true });
    return files.sort();
  },
};
