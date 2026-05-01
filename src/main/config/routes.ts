import { Router, type Express } from "express";
import fg from "fast-glob";

export default (app: Express): void => {
  const router = Router();
  const files = fg.sync("**/src/main/routes/*.route.ts");
  const currentDirectoryProcess = process.cwd();

  files.map(async (file) => {
    const route = (await import(`${currentDirectoryProcess}/${file}`)).default;
    route(router);
  });

  app.use("/api", router);
};
