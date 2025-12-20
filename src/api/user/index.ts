import request from '@/utils/request'
import type { loginForm, LoginResponse, UserInfoResponse, LogoutResponse } from '@/api/user/type.ts'

// 用户登录
// request会返回一个Promise对象，Promise返回的情况有两种，所以LoginResponse对象要包含错误和成功
export const relogin = (data: loginForm) => request.post<loginForm, LoginResponse>('/admin/acl/index/login', data)
// 获取用户信息
export const regetUserInfo = () => request.get<string, UserInfoResponse>('/admin/acl/index/info')
// 退出登录
export const relogout = () => request.post<string, LogoutResponse>('/admin/acl/index/logout')