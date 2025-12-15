// 对axios进行封装 使用请求拦截器 响应拦截器
import axios from 'axios'
import { useUserStore } from '@/stores/modules/user'
// 配置一个新的axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})
// 给request添加请求响应拦截器
request.interceptors.request.use(
  (config) => {
    // config里面的headers属性可以设置请求头，携带公共token
    const userStore = useUserStore()
    if(userStore.token){
      config.headers.Authorization = `Bearer ${userStore.token}`
      console.log(config)
    }
    return config
  }
)
// 给request添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 在这里可以对返回的数据初步加工
    return response.data
  },
  (error) => {
    return Promise.reject(new Error(error.message))
  }
)
export default request
