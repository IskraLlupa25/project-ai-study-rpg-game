import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",   // Ensure correct output directory for Vercel
    emptyOutDir: true // Clears the dist folder before building
  }
});
