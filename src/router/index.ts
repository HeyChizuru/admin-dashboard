import { createRouter, createWebHistory } from 'vue-router'
import {constantroutes} from './routers' 
const router = createRouter({
  // 路由模式
  history: createWebHistory(),
  routes:constantroutes,
  // 滚动行为
  scrollBehavior(){
    return{
      left:0,
      top:0
    }
  }
})

export default router
