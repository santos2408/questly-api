import pg from "pg";
import env from "../../../../main/config/env.js";
import { PostgresHelper } from "../helpers/postgres-helper.js";
import { migrationsHelper } from "../helpers/migrations-helper.js";

let client: pg.PoolClient | undefined;

try {
  const poolConfig: pg.PoolConfig = { connectionString: env.databaseUrl };
  await PostgresHelper.connect(poolConfig);
  client = await PostgresHelper.getClient();
  await migrationsHelper.run(client);
  console.log("Migrations successfuly migrated");
  process.exitCode = 0;
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  client?.release();
  await PostgresHelper.disconnect();
}
