import request from "supertest";
import { makeApp } from "../../config/app.js";

describe("Body Parser Middleware", async () => {
  const app = await makeApp();

  it("should parse body request as json", async () => {
    app.post("/test_body_parser", (req, res) => {
      res.send(req.body);
    });

    await request(app).post("/test_body_parser").send({ name: "any_name" }).expect({ name: "any_name" });
  });
});
