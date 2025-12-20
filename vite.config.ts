import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
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
    server: {
      open: true,  // 自动打开浏览器
      host: 'localhost',
      port: 5173,
      proxy: {
        [env.VITE_BASE_URL]: {
          // 服务器地址
          target: env.VITE_SERVE,
          // 是否代理跨域
          changeOrigin: true,
          // 路径重写，将 /api 替换为空字符串
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_BASE_URL), '')
        }
      }
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
