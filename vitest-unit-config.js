import defineConfig from "./vitest.config";

defineConfig.test.include = ["**/*.spec.?(c|m)[jt]s?(x)"];
defineConfig.test.globalSetup = undefined;

export default defineConfig;
