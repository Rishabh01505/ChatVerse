import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        //target: "http://127.0.0.1:3000",
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
