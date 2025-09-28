import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "headerMf",
      filename: "remoteEntry.js",
      exposes: {
        "./Header": "./src/components/Header.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5001,
    cors: true,
  },

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
