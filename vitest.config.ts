import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["./src/**/*.{spec,test}.ts"],
    exclude: ["dist"],
    setupFiles: ["./setup-tests.js"],
    globalSetup: "./postgres-testcontainer-global-setup.ts",
    fileParallelism: false,
    hookTimeout: 180000,
    testTimeout: 180000,
    coverage: {
      enabled: false,
      provider: "v8",
      include: ["./src/**/*.ts"],
      exclude: ["./src/**/*.{spec,test}.ts"],
    },
  },
});
