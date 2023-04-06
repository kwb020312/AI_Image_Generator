import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/papago/n2mt": {
        target: "https://openapi.naver.com/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/papago/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
