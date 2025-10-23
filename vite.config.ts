import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      vueDevTools()
  ],
  resolve: {
    alias: {
      // 让 @/ 指向 src
      '@': path.resolve(__dirname, 'src'),
      // 指向auth-matrix的源码
      '@auth-matrix': path.resolve(__dirname, '../auth-matrix/frontend/src'),
      // shared-api 别名
      'shared-api': path.resolve(__dirname, '../shared-api/src'),
    }
  },
  server: {
    port: 5174,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端端口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
