import { defineStore } from "pinia";
import type { loginForm  } from '@/api/user/type.ts'
import { relogin } from '@/api/user/index'
import type { LoginResponse } from '@/api/user/type.ts'
import { regetUserInfo } from '@/api/user/index'
 export const useUserStore =defineStore('User',{
  actions:{
    // 登录
     async login(data:loginForm){
       const result:LoginResponse=await relogin(data)
       if(result.code==200){
        this.token=result.data.token
        localStorage.setItem("TOKEN",result.data.token)
        return 'ok'
       }else{
        return Promise.reject(new Error(result.message))
       }
     },
     // 获取用户信息
     async  getUserInfo(){
        const result = await regetUserInfo()
        console.log(result)
     }
  },
  state:()=>{
    return {
      token:localStorage.getItem('TOKEN')
    }
  },
  getters:{

  }
}
)