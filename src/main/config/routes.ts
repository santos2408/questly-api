import { Router, type Express } from "express";
import fg from "fast-glob";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export default async (app: Express): Promise<void> => {
  const router = Router();
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const routesDirectory = join(currentDirectory, "../routes");
  const files = fg.sync("*.route.{ts,js}", { cwd: routesDirectory, absolute: true });

  const promises = files.map(async (file) => {
    const route = (await import(pathToFileURL(file).href)).default;
    route(router);
  });

  await Promise.all(promises);
  app.use("/api", router);
};
