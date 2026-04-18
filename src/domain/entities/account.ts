import { UniqueEntityId } from "../value-objects/unique-entity-id-value-object";

export type AccountProperties = {
  email: string;
  password: string;
  name: string;
  bio?: string | null;
  createdAt?: Date;
};

type AccountInternalProperties = AccountProperties & {
  bio: string | null;
  createdAt: Date;
};

export class Account {
  private readonly accountProps: AccountInternalProperties;
  private readonly id: UniqueEntityId;

  constructor(props: AccountProperties, id?: UniqueEntityId) {
    this.id = id || new UniqueEntityId();
    this.accountProps = {
      ...props,
      bio: props.bio ?? null,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get accountId(): UniqueEntityId {
    return this.id;
  }

  public get email(): string {
    return this.accountProps.email;
  }

  public get password(): string {
    return this.accountProps.password;
  }

  public get name(): string {
    return this.accountProps.name;
  }

  public get bio(): string | null {
    return this.accountProps.bio;
  }

  public get createdAt(): Date {
    return this.accountProps.createdAt;
  }
}
