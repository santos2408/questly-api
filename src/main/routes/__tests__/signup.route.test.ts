import request from "supertest";
import app from "../../config/app";
import { faker } from "@faker-js/faker";

describe("SignUp Routes", () => {
  it("should return an account on success", async () => {
    const password = faker.internet.password({ length: 6 });
    const bodyRequest = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: password,
      passwordConfirmation: password,
    };
    await request(app).post("/api/signup").send(bodyRequest).expect(201);
  });
});
