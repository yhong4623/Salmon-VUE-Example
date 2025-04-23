import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'


export default defineConfig({
  plugins: [
    vue(),
    VueDevTools()
  ],
  base: './', // 確保打包後使用相對路徑
  build: {
    outDir: 'dist', // 打包輸出到web/dist
    assetsDir: 'assets', // 靜態資源子目錄
  },
})