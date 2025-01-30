import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
// import fs from "fs";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    // },
  },
  build: {
    outDir: "build",
  }
});
