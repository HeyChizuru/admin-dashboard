<template>
  <div class='layout_container'>
    <div class="layout_slider" :class="{ collapse: layoutSettingStore.collapse }">
      <div class="logo">
        <a href="/"><img src="/logo.svg" alt=""></a>
        <h1>后台管理系统</h1>
      </div>
      <!-- 菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu background-color="black" text-color="white" router :default-active="useRoute().path"
          :collapse="layoutSettingStore.collapse">
          <Menu :menulist="constantroutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_right">
      <div class="layout_tabber">
        <Tabbar></Tabbar>
      </div>
      <div class="layout_main" :key="refsh">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './menu/index.vue'
import { constantroutes } from '@/router/routers'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import Tabbar from '@/layout/tabbar/index.vue'
import { useLayoutSettingStore } from '@/stores/modules/setting'


const layoutSettingStore = useLayoutSettingStore()
// 使用 computed 确保响应式
import { computed } from 'vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
onMounted(() => {
  const userStore = useUserStore()
  userStore.getUserInfo()
})
const refsh = computed(() => layoutSettingStore.refsh)
</script>

<style scoped lang="scss">
.layout_container {
  display: flex;
  width: 100%;
  height: 100vh;

  // 左侧导航
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-bg;
    transition: all 0.3s ease-in-out;

    .logo {
      display: flex;
      align-items: center;

      a img {
        width: 60px;
        height: $base-menu-logo;
      }

      h1 {
        color: white;
        min-width: 120px; // 确保h1有最小宽度，保持布局稳定
        white-space: nowrap; // 防止文字换行
      }
    }

    .scrollbar {
      height: calc(100vh - $base-menu-logo);
    }

    // 左侧导航收起
    &.collapse {
      width: $base-menu-width-collapse;

      h1 {
        display: none;
      }
    }
  }

  // 右侧
  .layout_right {
    width: 100%;
    transition: all 0.3s ease-in-out;

    // 顶部导航
    .layout_tabber {
      width: 100%;
      height: $base-tabber-high;
    }

    // 主要内容
    .layout_main {
      width: 100%;
      height: calc(100vh - $base-tabber-high);
      padding: 20px;
    }
  }
}
</style>