import { Router, type Express } from "express";
import fg from "fast-glob";

export default async (app: Express): Promise<void> => {
  const router = Router();
  const currentDirectoryProcess = process.cwd();
  const files = fg.sync("**/src/main/routes/*.route.ts");

  const promises = files.map(async (file) => {
    const route = (await import(`${currentDirectoryProcess}/${file}`)).default;
    route(router);
  });

  await Promise.all(promises);
  app.use("/api", router);
};
