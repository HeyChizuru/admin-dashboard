import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMock from './user'

// 导出所有mock模块
export const mockModules = [...userMock]

// 设置生产环境mock服务器
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
