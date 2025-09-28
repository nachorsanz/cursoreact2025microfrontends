import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "userMf",
      filename: "remoteEntry.js",
      exposes: {
        "./Profile": "./src/components/Profile.tsx",
        "./Login": "./src/components/Login.tsx",
        "./UserSettings": "./src/components/UserSettings.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5004,
    cors: true,
  },

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
