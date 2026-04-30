import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import pg from "pg";

const { Pool } = pg;

export const PostgresHelper = {
  databaseContainer: null as unknown as StartedPostgreSqlContainer,
  pool: null as unknown as pg.Pool,

  async connect() {
    const container = new PostgreSqlContainer("postgres:18-alpine");
    this.databaseContainer = await container.start();
    this.pool = new Pool({
      host: this.databaseContainer.getHost(),
      port: this.databaseContainer.getPort(),
      database: this.databaseContainer.getDatabase(),
      user: this.databaseContainer.getUsername(),
      password: this.databaseContainer.getPassword(),
    });
  },

  async disconnect() {
    await this.pool.end();
    await this.databaseContainer.stop();
  },

  getConnection() {
    return this.pool;
  },
};
