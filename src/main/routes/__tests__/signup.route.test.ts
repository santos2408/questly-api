import request from "supertest";
import pg from "pg";
import { makeApp } from "../../config/app.js";
import { faker } from "@faker-js/faker";
import { PostgresHelper } from "../../../infra/database/postgres/helpers/postgres-helper.js";
import env from "../../config/env.js";
import { migrationsHelper } from "../../../infra/database/postgres/helpers/migrations-helper.js";

let connection: pg.PoolClient;

describe("SignUp Routes", async () => {
  const app = await makeApp();

  beforeAll(async () => {
    await PostgresHelper.connect({ connectionString: env.databaseUrl });
    connection = await PostgresHelper.getClient();
    await migrationsHelper.run(connection);
  });

  beforeEach(async () => {
    await connection.query("TRUNCATE TABLE accounts");
  });

  afterAll(async () => {
    await connection.query("TRUNCATE TABLE accounts");
    connection.release();
    await PostgresHelper.disconnect();
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
