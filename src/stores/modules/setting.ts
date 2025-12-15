// layout 配置
import { defineStore } from 'pinia'
export const useLayoutSettingStore = defineStore('SettingStore',{
  state:()=>{
    return {
      // 侧边栏是否折叠
      collapse:false,
      // 刷新
      refsh:0
    }
  }
})