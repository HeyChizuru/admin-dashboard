import request from '@/utils/request'
import type { loginForm  } from '@/api/user/type.ts'
import type { LoginResponse } from '@/api/user/type.ts'
// 用户登录
// request会返回一个Promise对象，Promise返回的情况有两种，所以LoginResponse对象要包含错误和成功
export const relogin = (data:loginForm): Promise<LoginResponse> => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const regetUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 用户退出登录
export const relogout = () => {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取用户列表
export const regetUserList = (params?: {
  page?: number
  pageSize?: number
  keyword?: string
}) => {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}