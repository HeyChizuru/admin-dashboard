import router from '@/router'
import { useUserStore } from '@/stores/modules/user'
// 全局前置首位
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.token) {
    // 登录成功后无法访问登录页面
    if (to.path === '/Login') {
      next({ path: from.path })
    } else {
      next()
    }
  } else {
    // 未登录状态下，只能访问登录页面
    if (to.path === '/Login') {
      next()
    } else {
      next({ path: '/Login', query: { redirect: to.fullPath } })
    }
  }
})
// 全局后置守卫
router.afterEach((to) => {
  document.title = to.meta.title as string
})