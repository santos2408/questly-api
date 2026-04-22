import { UniqueEntityId } from "../value-objects/unique-entity-id-value-object";

export abstract class Entity<Props> {
  private readonly props: Props;
  private readonly uniqueEntityId: UniqueEntityId;

  constructor(props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
    this.props = props;
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
