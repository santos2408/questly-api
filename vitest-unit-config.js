import defineConfig from "./vitest.config";
defineConfig.test.include = ["**/*.spec.?(c|m)[jt]s?(x)"];
export default defineConfig;
