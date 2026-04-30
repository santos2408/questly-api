import type { CreateAccountDTO } from "../../../../../application/usecases/add-account";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import pg from "pg";
import { PostgresHelper } from "../../helpers/postgres-helper";
import { Account } from "../../../../../domain/entities/account";
import { AddAccountPostgresRepository } from "../postgres-account-repository";

const makeSut = () => {
  const sut = new AddAccountPostgresRepository();
  return { sut };
};

let connection: pg.Pool;
let container: PostgreSqlContainer;
let databaseContainer: StartedPostgreSqlContainer;

describe("Account PostgreSQL Repository", () => {
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
