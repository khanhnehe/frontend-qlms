import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3004,
    proxy: {
      "/api": { // Thêm tiền tố "/api" cho proxy
        target: "http://localhost:8001/",
        changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
