<template>
  <div>主页</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
onMounted(() => {
  const userStore = useUserStore()
  userStore.getUserInfo()
})
</script>

<style scoped></style>