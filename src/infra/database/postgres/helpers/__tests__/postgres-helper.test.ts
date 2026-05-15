import { PostgresHelper } from "../postgres-helper.js";
import env from "../../../../../main/config/env.js";

describe("Postgres Helper", () => {
  beforeAll(async () => {
    await PostgresHelper.connect({ connectionString: env.databaseUrl });
  });

  afterAll(async () => {
    await PostgresHelper.disconnect();
  });

  it("should reconnect if postgres connection is down", async () => {
    await PostgresHelper.disconnect();
    const connection = await PostgresHelper.getConnection();
    expect(connection.ended).toBeFalsy();
  });
});
