import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// https://vite.dev/config/
export default defineConfig(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      },
    },
  };
});
