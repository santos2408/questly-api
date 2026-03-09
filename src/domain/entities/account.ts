export type AccountProperties = {
  email: string;
  password: string;
  username: string;
  bio?: string | null;
  createdAt?: Date;
};

export class Account {
  private readonly accountProps: AccountProperties;

  constructor(props: AccountProperties) {
    this.accountProps = { ...props };
    this.bio = props.bio ?? null;
    this.createdAt = props.createdAt ?? new Date();
  }

  public get props(): AccountProperties {
    return this.accountProps;
  }

  private set bio(value: string | null) {
    this.accountProps.bio = value;
  }

  private set createdAt(value: Date) {
    this.accountProps.createdAt = value;
  }
}
