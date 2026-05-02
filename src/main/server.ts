import pg from "pg";
import env from "./config/env.js";
import { PostgresHelper } from "../infra/database/postgres/helpers/postgres-helper.js";

const config: pg.PoolConfig = { connectionString: env.databaseUrl };

(async () => {
  try {
    await PostgresHelper.connect(config);
    const app = await (await import("./config/app.js")).makeApp();
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
})();
