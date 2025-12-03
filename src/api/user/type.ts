export interface loginForm {
  username: string
  password: string
}
// 定义登录返回的类型
export interface LoginResponse {
  code: number
  message: string
  data: {
    token: string
  }
}
// 定义路由项类型
export interface MenuItem {
  path: string
  name?: string
  meta?: {
    title: string
    icon?: string
    hidden?: boolean
  }
  children?: MenuItem[]
}