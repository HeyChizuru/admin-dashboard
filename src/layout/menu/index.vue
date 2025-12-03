<template>
  <div>
    <!-- 自定义组件动态生成菜单 -->
    <template v-for="(item) in menulist" :key="item.path">
      <el-menu-item v-if="!item.children && item.meat.hidden" :index="item.path">
        <el-icon>
          <component :is="item.meat.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meat.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有且只有一个 -->
      <el-menu-item v-if="item.children && item.children.length == 1 && item.meat.hidden" :index="item.path">
        <el-icon>
          <component :is="item.meat.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meat.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有子路由 -->
      <el-sub-menu v-if="item.children && item.children.length > 1 && item.meat.hidden" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meat.icon"></component>
          </el-icon>
          <span>{{ item.meat.title }}</span>
        </template>
        <Menu :menulist="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/layout/menu/index.vue'
defineProps(['menulist'])
</script>

<style scoped lang="scss">
// 菜单项通用样式 
.el-menu-item {
  border-top: none;
  border-bottom: none;
  border-right: none;
  border-left: none;
  color: white; // 默认文字颜色

  // 悬停效果
  &:hover {
    background-color: rgba(241, 236, 236, 0.3) !important;
    color: white !important;
  }

  // 选中状态
  &.is-active {
    background-color: rgba(241, 236, 236, 0.8) !important;
    color: black !important;
  }
}

.el-sub-menu {
  border: none;
}
</style>