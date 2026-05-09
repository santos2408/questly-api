import type { CreateAccountDTO } from "../../../../../application/usecases/add-account/index.js";
import pg from "pg";
import { PostgresHelper } from "../../helpers/postgres-helper.js";
import { Account } from "../../../../../domain/entities/account.js";
import { AddAccountPostgresRepository } from "../postgres-account-repository.js";
import env from "../../../../../main/config/env.js";
import { migrationsHelper } from "../../helpers/migrations-helper.js";

const makeSut = () => {
  const sut = new AddAccountPostgresRepository();
  return { sut };
};

let connection: pg.PoolClient;

describe("Account PostgreSQL Repository", () => {
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

  it("should create an account on success", async () => {
    // arrange
    const { sut } = makeSut();
    const CreateAccountDTO: CreateAccountDTO = {
      name: "any_name",
      email: "any_email@mail.com",
      password: "hashed_password",
    };
    const account = Account.create(CreateAccountDTO);

    // act
    await sut.add(account);
    const result = await connection.query("SELECT * FROM accounts WHERE email = $1", [account.email]);
    const [accountRow] = result.rows;

    // assert
    expect(result.rows).toHaveLength(1);
    expect(accountRow.id).toBeTruthy();
    expect(accountRow.name).toBe(account.name);
    expect(accountRow.email).toBe(account.email);
    expect(accountRow.password).toBe(account.password);
    expect(accountRow.role).toBe(account.role);
    expect(accountRow.status).toBe(account.status);
    expect(accountRow.created_at).toEqual(account.createdAt);
    expect(accountRow.updated_at).toEqual(account.updatedAt);
  });
});
