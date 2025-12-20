import { defineStore } from "pinia";
import type { loginForm, LoginResponse, UserInfoResponse, LogoutResponse } from '@/api/user/type.ts'
import { relogin, regetUserInfo, relogout } from '@/api/user/index'
export const useUserStore = defineStore('User', {
  actions: {
    // 登录
    async login(data: loginForm) {
      const result: LoginResponse = await relogin(data)
      if (result.code == 200) {
        this.token = result.data
        localStorage.setItem("TOKEN", result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const result: UserInfoResponse = await regetUserInfo()
      if (result.code == 200) {
        this.avater = result.data.avatar
        this.name = result.data.name
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录
    async logout() {
      const result: LogoutResponse = await relogout()
      if (result.code == 200) {
        this.token = ''
        this.avater = ''
        this.name = ''
        localStorage.removeItem('TOKEN')
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
      avater: '',
      name: ''
    }
  },
  getters: {

  }
}
)