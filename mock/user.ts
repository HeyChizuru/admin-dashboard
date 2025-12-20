// import { MockMethod } from 'vite-plugin-mock'

// 用户数据配置
// const users = [
//   {
//     id: 1,
//     username: 'admin',
//     password: '123456',
//     nickname: '管理员',
//     avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
//     email: 'admin@example.com',
//     phone: '13800138000',
//     status: 1,
//     roles: ['admin'],
//     permissions: ['*:*:*'],
//     createTime: '2024-01-01'
//   },
//   {
//     id: 2,
//     username: 'user',
//     password: '123456',
//     nickname: '普通用户',
//     avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
//     email: 'user@example.com',
//     phone: '13900139000',
//     status: 1,
//     roles: ['user'],
//     permissions: ['user:read', 'user:write'],
//     createTime: '2024-01-02'
//   },
//   {
//     id: 3,
//     username: 'user1',
//     password: '123456',
//     nickname: '用户1',
//     avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
//     email: 'user1@example.com',
//     phone: '13900139001',
//     status: 1,
//     roles: ['user'],
//     permissions: ['user:read'],
//     createTime: '2024-01-03'
//   },
//   {
//     id: 4,
//     username: 'user2',
//     password: '123456',
//     nickname: '用户2',
//     avatar: 'https://avatars.githubusercontent.com/u/4?v=4',
//     email: 'user2@example.com',
//     phone: '13900139002',
//     status: 0,
//     roles: ['user'],
//     permissions: ['user:read'],
//     createTime: '2024-01-04'
//   }
// ]

// // Token映射配置
// const tokenMap = {
//   'admin-token-123456': 1,  // token -> userId
//   'user-token-654321': 2,
//   'user1-token-111111': 3,
//   'user2-token-222222': 4
// }

// export default [
//   // 用户登录接口
//   {
//     url: '/api/user/login',
//     method: 'post',
//     timeout: 1000,
//     response: ({ body }) => {
//       const { username, password } = body

//       // 查找用户
//       const user = users.find(u => u.username === username && u.password === password)

//       if (user) {
//         // 生成token（实际项目中应该用更复杂的方式）
//         const token = `${user.username}-token-${Math.random().toString(36).substr(2, 6)}`
//         tokenMap[token] = user.id

//         return {
//           code: 200,
//           message: '登录成功',
//           data: {
//             token: token,
//             userInfo: {
//               id: user.id,
//               username: user.username,
//               nickname: user.nickname,
//               avatar: user.avatar,
//               roles: user.roles,
//               permissions: user.permissions
//             }
//           }
//         }
//       } else {
//         return {
//           code: 401,
//           message: '用户名或密码错误',
//           data: null
//         }
//       }
//     }
//   },

//   // 获取用户信息接口
//   {
//     url: '/api/user/info',
//     method: 'get',
//     timeout: 500,
//     response: ({ headers }) => {
//       const authHeader = headers?.authorization || ''
//       const token = authHeader.replace('Bearer ', '')

//       const userId = tokenMap[token]
//       if (userId) {
//         const user = users.find(u => u.id === userId)
//         if (user) {
//           return {
//             code: 200,
//             message: '成功',
//             data: {
//               userInfo: {
//                 id: user.id,
//                 username: user.username,
//                 nickname: user.nickname,
//                 avatar: user.avatar,
//                 email: user.email,
//                 phone: user.phone,
//                 roles: user.roles,
//                 permissions: user.permissions
//               }
//             }
//           }
//         }
//       }

//       return {
//         code: 401,
//         message: 'token无效',
//         data: null
//       }
//     }
//   },

//   // 用户退出登录接口
//   {
//     url: '/api/user/logout',
//     method: 'post',
//     timeout: 300,
//     response: ({ headers }) => {
//       const authHeader = headers?.authorization || ''
//       const token = authHeader.replace('Bearer ', '')

//       // 清除token映射（模拟退出）
//       if (tokenMap[token]) {
//         delete tokenMap[token]
//       }

//       return {
//         code: 200,
//         message: '退出成功',
//         data: null
//       }
//     }
//   },

//   // 获取用户列表接口
//   {
//     url: '/api/user/list',
//     method: 'get',
//     timeout: 800,
//     response: ({ query }) => {
//       const { page = 1, pageSize = 10, keyword } = query

//       // 关键词过滤（排除密码字段）
//       let filteredUsers = users.map(user => ({
//         id: user.id,
//         username: user.username,
//         nickname: user.nickname,
//         avatar: user.avatar,
//         email: user.email,
//         phone: user.phone,
//         status: user.status,
//         roles: user.roles,
//         permissions: user.permissions,
//         createTime: user.createTime
//       }))
//       if (keyword) {
//         filteredUsers = filteredUsers.filter(user =>
//           user.username.includes(keyword) || user.nickname.includes(keyword)
//         )
//       }

//       // 分页
//       const start = (page - 1) * pageSize
//       const end = start + pageSize
//       const userList = filteredUsers.slice(start, end)

//       return {
//         code: 200,
//         message: '成功',
//         data: {
//           list: userList,
//           total: filteredUsers.length,
//           page: parseInt(page),
//           pageSize: parseInt(pageSize)
//         }
//       }
//     }
//   }
// ] as MockMethod[]
