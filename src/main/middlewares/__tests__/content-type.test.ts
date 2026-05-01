import request from "supertest";
import app from "../../config/app";

describe("Content-type Middleware", () => {
  it("should return content-type as json by default", async () => {
    app.get("/test_content_type", (req, res) => {
      res.send("");
    });

    await request(app).get("/test_content_type").expect("content-type", /json/);
  });

  it("should return any other content-type when forced", async () => {
    app.get("/test_any_content_type", (req, res) => {
      res.type("xml");
      res.send("");
    });

    await request(app).get("/test_any_content_type").expect("content-type", /xml/);
  });
});
