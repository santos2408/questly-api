import type { Router } from "express";
import { makeSignUpController } from "../factories/signup-controller-factory.js";
import { routeAdapter } from "../adapters/express-route-adapter.js";

export default (router: Router) => {
  router.post("/v1/signup", routeAdapter(makeSignUpController()));
};
