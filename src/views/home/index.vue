<template>
  <div>
    主页
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
const a = useUserStore()
console.log(a.token)

</script>

<style scoped></style>