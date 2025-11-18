import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
      polyfills: true,
      modernPolyfills: true,
    }),
  ],
  base: "/swe",
  build: {
    target: "es2015",
  },
  worker: {
    format: "es",
  },
  optimizeDeps: {
    include: ["pdfjs-dist"],
    esbuildOptions: {
      target: "es2015",
    },
  },
});
