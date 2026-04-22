import { describe, it, expect } from "vitest";
import { Entity } from "../../entities/entity";
import { UniqueEntityId } from "../../value-objects/unique-entity-id-value-object";

class EntityStub extends Entity<{ props1: string; prop2: number }> {}

describe("Entity Unit Tests", () => {
  it("should set props and id", () => {
    const props = { props1: "any_value", prop2: 10 };
    const entityStub = new EntityStub(props);
    expect(entityStub.id).toBeTypeOf("string");
  });

  it("should convert an entity to a javascript object", () => {
    const props = { props1: "any_value", prop2: 10 };
    const id = new UniqueEntityId();
    const entityStub = new EntityStub(props, id);
    const expected = entityStub.toJSON();

    expect(expected).toStrictEqual({
      id: id.value,
      ...props,
    });
  });
});
