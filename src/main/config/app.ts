import express from "express";
import setupMiddlewares from "./middlewares.js";
import setupRoutes from "./routes.js";

export const makeApp = async () => {
  const app = express();
  setupMiddlewares(app);
  await setupRoutes(app);
  return app;
};
