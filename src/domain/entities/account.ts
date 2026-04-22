import { Entity } from "./entity";
import { UniqueEntityId } from "../value-objects/unique-entity-id-value-object";
import { ROLES, STATUS, type Roles, Status } from "../enums";

export type AccountProperties = {
  name: string;
  email: string;
  password: string;
  role?: Roles;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
};

type AccountInternalProperties = AccountProperties & {
  role: Roles;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};

export class Account extends Entity<AccountProperties> {
  private readonly accountProps: AccountInternalProperties;

  constructor(props: AccountProperties, id?: UniqueEntityId) {
    super(props, id);
    this.accountProps = {
      ...props,
      role: props.role ?? ROLES.USER,
      status: props.status ?? STATUS.ACTIVE,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  static create(props: AccountProperties, id?: UniqueEntityId): Account {
    // [] - validations...
    return new Account(props, id);
  }

  public get name(): string {
    return this.accountProps.name;
  }

  public get email(): string {
    return this.accountProps.email;
  }

  public get password(): string {
    return this.accountProps.password;
  }

  public get role(): Roles {
    return this.accountProps.role;
  }

  public get status(): Status {
    return this.accountProps.status;
  }

  public get createdAt(): Date {
    return this.accountProps.createdAt;
  }

  public get updatedAt(): Date {
    return this.accountProps.updatedAt;
  }
}
