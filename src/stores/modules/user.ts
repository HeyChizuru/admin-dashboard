import { defineStore } from "pinia";
import type { loginForm  } from '@/api/user/type.ts'
import { relogin } from '@/api/user/index'
 export const useUserStore =defineStore('User',{
  actions:{
     async login(data:loginForm){
       const result=await relogin(data)
       if(result.code==200){
        this.token=result.data.token
        localStorage.setItem("TOKEN",result.data.token)
        return 'ok'
       }else{
        return Promise.reject(new Error(result.message))
       }
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