import { PostgreSqlContainer } from "@testcontainers/postgresql";

const DATABASE = "postgres:18-alpine";

export async function setup() {
  console.time("[testcontainers] postgres startup");

  const startupTimeout = 180000;
  const container: PostgreSqlContainer = new PostgreSqlContainer(DATABASE).withStartupTimeout(startupTimeout);
  const startedContainer = await container.start();
  const connectionUri = startedContainer.getConnectionUri();

  console.timeEnd("[testcontainers] postgres startup");
  console.log("[testcontainers] postgres container:", startedContainer.getId());
  console.log("[testcontainers] postgres url:", startedContainer.getConnectionUri());

  process.env.DATABASE_URL = connectionUri;

  return async () => {
    console.log("[testcontainers] stopping postgres:", startedContainer.getId());

    await startedContainer.stop();
  };
}
