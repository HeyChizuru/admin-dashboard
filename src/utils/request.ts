// 对axios进行封装 使用请求拦截器 响应拦截器
import axios from 'axios'
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})
// 给request添加请求响应拦截器
request.interceptors.request.use(
  (config) => {
    return config
  }
)
// 给request添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request
