import pg from "pg";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { PostgresHelper } from "./src/infra/database/postgres/helpers/postgres-helper";

const DATABASE = "postgres:18-alpine";

export const postgresTestcontainer = {
  container: null as unknown as PostgreSqlContainer,
  databaseContainer: null as unknown as StartedPostgreSqlContainer,

  async initialize() {
    this.container = new PostgreSqlContainer(DATABASE);
    this.databaseContainer = await this.container.start();

    const config: pg.PoolConfig = {
      host: this.databaseContainer.getHost(),
      port: this.databaseContainer.getPort(),
      database: this.databaseContainer.getDatabase(),
      user: this.databaseContainer.getUsername(),
      password: this.databaseContainer.getPassword(),
    };

    await PostgresHelper.connect(config);
  },

  async stop() {
    await this.databaseContainer.stop();
  },
};
