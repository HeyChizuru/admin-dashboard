import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(( {command} )=>{return {
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局导入scss变量文件，使所有scss文件都能直接使用这些变量
         additionalData: `@use "@/styles/variable.scss" as *;`
      }
    }
  },
  viteMockServe:({
    localEnabled: command==='serve',
  })
}})
