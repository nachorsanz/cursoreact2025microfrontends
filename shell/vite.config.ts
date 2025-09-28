import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // URLs para desarrollo vs producción
  const isDevelopment = mode === "development";

  const remotes = isDevelopment
    ? {
        // URLs locales para desarrollo
        headerMf: "http://localhost:5001/assets/remoteEntry.js",
        productMf: "http://localhost:5002/assets/remoteEntry.js",
        cartMf: "http://localhost:5003/assets/remoteEntry.js",
        userMf: "http://localhost:5004/assets/remoteEntry.js",
      }
    : {
        // URLs de producción (Vercel)
        headerMf: `${env.VITE_HEADER_MF_URL || "https://header-mf-your-team.vercel.app"}/assets/remoteEntry.js`,
        productMf: `${env.VITE_PRODUCTS_MF_URL || "https://products-mf-your-team.vercel.app"}/assets/remoteEntry.js`,
        cartMf: `${env.VITE_CART_MF_URL || "https://cart-mf-your-team.vercel.app"}/assets/remoteEntry.js`,
        userMf: `${env.VITE_USER_MF_URL || "https://user-mf-your-team.vercel.app"}/assets/remoteEntry.js`,
      };

  return {
    plugins: [
      react(),
      federation({
        name: "shell",
        remotes,
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
      minify: mode === "production",
      cssCodeSplit: false,
      rollupOptions: {
        external: isDevelopment ? [] : undefined,
      },
    },
  };
});
