import { UniqueEntityId } from "../value-objects/unique-entity-id-value-object";
import { Roles } from "../enums/roles";
import { Status } from "../enums/status";

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

export class Account {
  private readonly accountProps: AccountInternalProperties;
  private readonly id: UniqueEntityId;

  constructor(props: AccountProperties, id?: UniqueEntityId) {
    this.id = id || new UniqueEntityId();
    this.accountProps = {
      ...props,
      role: Roles.USER,
      status: Status.ACTIVE,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get accountId(): UniqueEntityId {
    return this.id;
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
