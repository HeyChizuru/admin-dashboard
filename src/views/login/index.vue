<template>
  <div class='Loginbg'>
    <el-row> <!-- elment的布局栅格组件-->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到后台管理系统</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="possword" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_button" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
let useStore = useUserStore()
// 收集账号密码
let loginForm = reactive({ username: '', password: '' })
let $router = useRouter()
//登录事件
const login = async () => {
  // 登录成功会拿到token token是每一个账号的唯一标识
  try {
    await useStore.login(loginForm)
    $router.push('/')
  } catch (error) {
    console.log(error)
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}
</script>

<style scoped lang="scss">
.Loginbg {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  // 相对定位 相对自己位置移动 不影响占位
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;

  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }

  .login_button {
    width: 60%;
    height: 50px;
    margin: 0 auto;
  }
}
</style>