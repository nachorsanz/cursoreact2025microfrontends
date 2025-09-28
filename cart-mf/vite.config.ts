import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cartMf",
      filename: "remoteEntry.js",
      exposes: {
        "./Cart": "./src/components/Cart.tsx",
        "./CartButton": "./src/components/CartButton.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5003,
    cors: true,
  },

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
