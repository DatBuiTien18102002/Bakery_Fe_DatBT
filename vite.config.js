/* eslint-disable no-undef */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://bakery-be-datbt.onrender.com'
      // '/api': 'http://localhost:3005'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Thêm các alias khác nếu cần
    },
  },
  plugins: [react()],
})
