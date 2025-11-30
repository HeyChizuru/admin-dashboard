export interface loginForm {
  username: string
  password: string
}
// 定义响应类型
export interface LoginResponse {
  code: number
  message: string
  data: {
    token: string
  }
}