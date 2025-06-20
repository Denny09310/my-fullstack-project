import process from "node:process";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

import generouted from "@generouted/react-router/plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), generouted(), tailwindcss()],
    server: {
      proxy: {
        "^/api": {
          target: process.env.VITE_API_TARGET,
          secure: mode === "development",
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
  });
};
