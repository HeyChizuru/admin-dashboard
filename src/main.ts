import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入默认样式
import '@/styles/init.scss'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)
// 把菠萝创建并挂载
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
// 注册所有el图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
