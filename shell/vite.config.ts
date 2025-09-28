import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        headerMf: "http://localhost:5001/assets/remoteEntry.js",
        productMf: "http://localhost:5002/assets/remoteEntry.js",
        cartMf: "http://localhost:5003/assets/remoteEntry.js",
        userMf: "http://localhost:5004/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5000,
    open: true,
  },

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
