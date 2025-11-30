import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      // 配置mock插件
      viteMockServe({
        localEnabled: command === 'serve',  // 开发环境启用
        prodEnabled: false,                 // 生产环境禁用
        injectCode: `
          import { setupProdMockServer } from './mock';
          setupProdMockServer();
        `,
      })
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
  }
})
