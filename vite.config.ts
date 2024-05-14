import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "build",
        sourcemap: true
    },
    server: {
        port: 8080,
        host: "0.0.0.0"
    }
});
