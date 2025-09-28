import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "productMf",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductList": "./src/components/ProductList.tsx",
        "./ProductCard": "./src/components/ProductCard.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5002,
    cors: true,
  },

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
