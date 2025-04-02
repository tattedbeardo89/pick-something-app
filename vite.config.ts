import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/pick-something-app/", // ✅ Correct for GitHub Pages
  define: {
    "process.env": {}, // ✅ Ensures compatibility
  },
  envPrefix: "VITE_", // ✅ Ensures only VITE_ variables are loaded
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
