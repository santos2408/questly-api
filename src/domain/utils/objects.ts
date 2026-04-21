export function deepFreeze<ObjectType>(obj: ObjectType) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const valueAsObject = obj as Record<string, unknown>;
  const propNames = Object.getOwnPropertyNames(obj);

  for (const name of propNames) {
    const value = valueAsObject[name];

    if (typeof value === "object" && value !== null) {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
}
