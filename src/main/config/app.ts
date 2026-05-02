import express from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

export const makeApp = async () => {
  const app = express();
  setupMiddlewares(app);
  await setupRoutes(app);
  return app;
};
