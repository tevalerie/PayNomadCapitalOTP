import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// Removed tempo-devtools/swc plugin as it's not needed
const conditionalPlugins: [string, Record<string, any>][] = [];

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< Updated upstream
  base: process.env.NODE_ENV === "development" ? "/" : "/",
=======
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
>>>>>>> Stashed changes
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    tempo(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
<<<<<<< Updated upstream
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  build: {
    rollupOptions: {
      // Ensure external dependencies are properly handled
      external: [],
    },
=======
    allowedHosts: true,
>>>>>>> Stashed changes
  },
});
