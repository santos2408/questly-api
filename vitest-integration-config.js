import defineConfig from "./vitest.config";
defineConfig.test.include = ["**/*.test.?(c|m)[jt]s?(x)"];
export default defineConfig;
