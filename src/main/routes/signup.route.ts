import type { Router } from "express";
import { makeSignUpController } from "../factories/signup-controller-factory";
import { routeAdapter } from "../adapters/express-route-adapter";

export default (router: Router) => {
  router.post("/v1/signup", routeAdapter(makeSignUpController()));
};
