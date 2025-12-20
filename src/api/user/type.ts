// 用户登录参数类型
export interface loginForm {
  username: string
  password: string
}
// 用户登录响应类型
export interface LoginResponse {
  code: number
  message: string
  data: string
}
// 用户信息响应类型
export interface UserInfoResponse {
  code: number
  message: string
  data: {
    avatar: string
    name: string
  }
}
// 退出登录响应类型
export interface LogoutResponse {
  code: number
  message: string
  data: string
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