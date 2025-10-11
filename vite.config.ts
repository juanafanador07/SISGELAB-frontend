import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const { VITE_DEMO_ADMIN_EMAIL, VITE_DEMO_ADMIN_PASSWORD } = process.env;

  const VITE_DEMO_ENABLE = process.env.VITE_DEMO_ENABLE === "true";

  if (!VITE_DEMO_ENABLE) {
    if (VITE_DEMO_ADMIN_EMAIL || VITE_DEMO_ADMIN_PASSWORD) {
      throw new Error(
        "❌ Invalid configuration: Demo credentials provided while VITE_DEMO_ENABLE is not true. This prevents leaking demo credentials into the production build.",
      );
    }
  }

  return defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
