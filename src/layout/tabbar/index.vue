<template>
  <div class='tabbar'>
    <div class="tabbar-left">
      <!-- 隐藏菜单 -->
      <!-- 点击事件，每次点击对isCollapse取反 -->
      <el-icon size=24 style="margin-right: 10px;" @click="layoutSettingStore.collapse = !layoutSettingStore.collapse">
        <component :is="layoutSettingStore.collapse ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <!-- 面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item) in useRoute().matched" :key="item.path" :to="item.path">
          <el-icon v-if="item.meta.icon">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span v-if="item.meta.title">
            {{ item.meta.title }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <!-- 刷新 -->
      <el-button size="default" icon="Refresh" circle @click="layoutSettingStore.refsh++"></el-button>
      <!-- 全屏 -->
      <el-button size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
      <!-- 设置 -->
      <el-button size="default" icon="Setting" circle></el-button>
      <img :src="userStore.avater" alt="">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { useLayoutSettingStore } from '@/stores/modules/setting'
import { useUserStore } from '@/stores/modules/user'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
let $router = useRouter()
const fullScreen = () => {
  if (!document.fullscreenElement) {
    // 进入全屏
    document.documentElement.requestFullscreen()
      .then(() => {
        console.log('进入全屏模式')
      })
      .catch(err => {
        console.error('进入全屏失败:', err)
      })
  } else {
    // 退出全屏
    document.exitFullscreen()
      .then(() => {
        console.log('退出全屏模式')
      })
      .catch(err => {
        console.error('退出全屏失败:', err)
      })
  }
}
// 退出登录
const logout = async () => {
  try {
    await userStore.logout()
    $router.push('/Login')
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
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;

  .tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    img {
      height: 32px;
      width: 32px;
      border: 1px solid #ccc;
      border-radius: 50%;
      margin: 0 10px;
    }
  }

}
</style>