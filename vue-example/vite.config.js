import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './', // 確保打包後使用相對路徑
  build: {
    outDir: 'dist', // 打包輸出到web/dist
    assetsDir: 'assets', // 靜態資源子目錄
  },
})