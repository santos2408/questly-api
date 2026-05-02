import defineConfig from "./vitest.config";

defineConfig.test.include = ["**/*.test.?(c|m)[jt]s?(x)"];
defineConfig.test.globalSetup = "./postgres-testcontainer-global-setup.ts";
defineConfig.test.fileParallelism = false;
defineConfig.test.hookTimeout = 180000;
defineConfig.test.testTimeout = 180000;

export default defineConfig;
