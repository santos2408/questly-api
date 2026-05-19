import pg from "pg";
import { PostgresHelper } from "../../helpers/postgres-helper.js";
import { LogErrorPostgresRepository } from "../log-error-postgres-repository.js";
import env from "../../../../../main/config/env.js";
import { migrationsHelper } from "../../helpers/migrations-helper.js";

const makeSut = () => {
  const sut = new LogErrorPostgresRepository();
  return { sut };
};

let connection: pg.PoolClient;

describe("Log Error Postgres Repository", () => {
  beforeAll(async () => {
    await PostgresHelper.connect({ connectionString: env.databaseUrl });
    connection = await PostgresHelper.getClient();
    await migrationsHelper.run(connection);
  });

  beforeEach(async () => {
    await connection.query("TRUNCATE TABLE errors");
  });

  afterAll(async () => {
    await connection.query("TRUNCATE TABLE errors");
    connection.release();
    await PostgresHelper.disconnect();
  });

  it("should create an error log on success", async () => {
    // arrange
    const { sut } = makeSut();

    // act
    await sut.logError("any_stack");
    const result = await connection.query("SELECT * FROM errors");

    // assert
    expect(result.rows).toHaveLength(1);
  });
});
