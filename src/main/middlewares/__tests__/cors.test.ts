import request from "supertest";
import { makeApp } from "../../config/app";

describe("CORS Middleware", async () => {
  const app = await makeApp();

  it("should enable CORS", async () => {
    app.get("/test_cors", (req, res) => {
      res.send();
    });

    // TODO: verificar liberação do CORS para que seja apenas para o domínio da aplicação front-end
    await request(app)
      .get("/test_cors")
      .expect("access-control-allow-origin", "*")
      .expect("access-control-allow-methods", "*")
      .expect("access-control-allow-headers", "*");
  });
});
