<template>
  <div class='tabbar'>
    <div class="tabbar-left">
      <!-- 隐藏菜单 -->
      <!-- 点击事件，每次点击对isCollapse取反 -->
      <el-icon size=24 style="margin-right: 10px;" @click="isCollapse = !isCollapse">
        <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <!-- 面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>面包屑</el-breadcrumb-item>
        <el-breadcrumb-item>面包屑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <el-button size="default" icon="Refresh" circle></el-button>
      <el-button size="default" icon="FullScreen" circle></el-button>
      <el-button size="default" icon="Setting" circle></el-button>
      <img src="/logo.svg" alt="">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
const isCollapse = ref(false)
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