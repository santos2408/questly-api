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

export class Account extends Entity<AccountInternalProperties> {
  constructor(props: AccountProperties, id?: UniqueEntityId) {
    const currentDate = new Date();
    const accountProps: AccountInternalProperties = {
      ...props,
      role: props.role ?? ROLES.USER,
      status: props.status ?? STATUS.ACTIVE,
      createdAt: props.createdAt ?? currentDate,
      updatedAt: props.updatedAt ?? currentDate,
    };

    super(accountProps, id);
  }

  static create(props: AccountProperties, id?: UniqueEntityId): Account {
    // [] - validations...
    return new Account(props, id);
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  public get role(): Roles {
    return this.props.role;
  }

  public get status(): Status {
    return this.props.status;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
