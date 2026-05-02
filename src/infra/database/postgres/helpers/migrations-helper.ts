import type pg from "pg";
import fg from "fast-glob";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const migrationsHelper = {
  // TODO: criar uma tabela "migrations" no banco e rodar somente as que não foram executadas ainda
  async run(connection: pg.Pool) {
    const migrationsDir = path.resolve(__dirname, "../migrations");

    const files = await fg("*.{ts,js}", {
      cwd: migrationsDir,
      absolute: true,
      onlyFiles: true,
    });

    const sortedFiles = files.sort();

    for (const file of sortedFiles) {
      const migration = await import(pathToFileURL(file).href);
      await migration.up(connection);
    }
  },
};
