import { randomUUID } from "node:crypto";

export type AccountProperties = {
  email: string;
  password: string;
  username: string;
  bio?: string | null;
  createdAt?: Date;
};

export class Account {
  private readonly accountProps: AccountProperties;
  private readonly id: string;

  constructor(props: AccountProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.accountProps = {
      ...props,
      bio: props.bio ?? null,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get accountId(): string {
    return this.id;
  }

  public get email(): string {
    return this.accountProps.email;
  }

  public get password(): string {
    return this.accountProps.password;
  }

  public get username(): string {
    return this.accountProps.username;
  }

  public get bio(): string | null {
    return this.accountProps.bio ?? null;
  }

  public get createdAt(): Date | undefined {
    return this.accountProps.createdAt;
  }
}
