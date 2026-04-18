import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["./src/**/*.{spec, test}.ts"],
    coverage: {
      enabled: false,
      provider: "v8",
      include: ["./src/**/*.ts"],
      exclude: ["./src/**/*.{spec, test}.ts"],
    },
  },
});
