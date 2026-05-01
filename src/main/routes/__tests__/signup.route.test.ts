import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import request from "supertest";
import pg from "pg";
import app from "../../config/app";
import { faker } from "@faker-js/faker";
import { PostgresHelper } from "../../../infra/database/postgres/helpers/postgres-helper";

let connection: pg.Pool;
let container: PostgreSqlContainer;
let databaseContainer: StartedPostgreSqlContainer;

describe("SignUp Routes", () => {
  beforeAll(async () => {
    container = new PostgreSqlContainer("postgres:18-alpine");
    databaseContainer = await container.start();

    const config: pg.PoolConfig = {
      host: databaseContainer.getHost(),
      port: databaseContainer.getPort(),
      database: databaseContainer.getDatabase(),
      user: databaseContainer.getUsername(),
      password: databaseContainer.getPassword(),
    };

    await PostgresHelper.connect(config);
    connection = PostgresHelper.getConnection();

    await connection.query(`CREATE TABLE accounts (
          id UUID PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) NOT NULL,
          status VARCHAR(20) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
  });

  beforeEach(async () => {
    await connection.query("TRUNCATE TABLE accounts");
  });

  afterAll(async () => {
    await connection.query("TRUNCATE TABLE accounts");
    await PostgresHelper.disconnect();
    await databaseContainer.stop();
  });

  it("should return an account on success", async () => {
    const password = faker.internet.password({ length: 6 });
    const bodyRequest = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: password,
      passwordConfirmation: password,
    };
    await request(app).post("/api/v1/signup").send(bodyRequest).expect(201);
  });
});
