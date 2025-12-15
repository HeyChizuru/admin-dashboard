// layout 配置
import { defineStore } from 'pinia'
export const useLayoutSettingStore = defineStore('SettingStore',{
  state:()=>{
    return {
      collapse:false
    }
  }
})