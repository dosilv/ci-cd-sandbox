import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    define: {
      "process.env.REACT_APP_MODE": JSON.stringify(
        process.env.REACT_APP_MODE || "DEFAULT",
      ),
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
  }),
);
