import react from "@vitejs/plugin-react";
import { default as path } from "path";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), tailwindcss()],
    base: "./",
    resolve: {
      alias: {
        "@/": `${path.resolve(import.meta.dirname, "src")}/`,
        "tailwindcss/resolveConfig": path.resolve(import.meta.dirname, "src/utils/resolve-config.js")
      }
    }
  });
};
