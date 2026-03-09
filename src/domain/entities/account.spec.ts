import { describe, it, expect } from "vitest";
import { Account } from "./account.js";

describe("Account Entity Unit Tests", () => {
  it("should create an instance of account", () => {
    // arrange
    const createdAt = new Date();
    const props = {
      email: "roger.santos36@gmail.com",
      password: "123456",
      username: "rogersanttoss",
      createdAt,
    };

    // act
    const account = new Account(props);
    const expected = { ...props, bio: null };

    // assert
    expect(account.props).toStrictEqual(expected);
  });
});
