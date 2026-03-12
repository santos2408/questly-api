import { describe, expect, it } from "vitest";
import { SignUpController } from "./signup-controller";

describe("SignUp Controller", () => {
  it("should return 400 if no 'name' is provided", () => {
    // arrange
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        username: "any_username",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    // act
    const httpResponse = sut.handle(httpRequest);

    // assert
    expect(httpResponse.statusCode).toBe(400);
  });
});
