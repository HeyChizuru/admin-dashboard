<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select :disabled="!showAttrList" style="width: 220px;" placeholder="请选择一级分类" v-model="id1"
          @change="getAttrList2(Number(id1))">
          <el-option v-for="item in attrList1" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select :disabled="!showAttrList" style="width: 220px;" placeholder="请选择二级分类" v-model="id2"
          @change="getAttrList3(Number(id2))">
          <el-option v-for="item in attrList2" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="!showAttrList" style="width: 220px;" placeholder="请选择三级分类" v-model="id3"
          @change="getid3(Number(id3))">
          <el-option v-for="item in attrList3" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang='ts'>
import { regetAttrList1, regetAttrList2, regetAttrList3 } from '@/api/attr'
import { onMounted } from 'vue'
import { ref } from 'vue'
import type { CategoryData } from '@/api/attr/type'
import { ElMessage } from 'element-plus'
// 一级分类列表
const attrList1 = ref<CategoryData[]>([])
// 二级分类列表
const attrList2 = ref<CategoryData[]>([])
// 三级分类列表
const attrList3 = ref<CategoryData[]>([])
// 一级分类选中项
const id1 = ref('')
// 二级分类选中项
const id2 = ref('')
// 三级分类选中项
const id3 = ref('')
// 定义发送父组件事件
const emit = defineEmits(['category-selected1', 'category-selected2', 'category-selected3'])
// 添加和修改属性时，根据showAttrList判断是否禁用分类选择器
defineProps(['showAttrList'])
// 获取一级分类列表
const getAttrList1 = async () => {
  const res = await regetAttrList1()
  if (res.code === 200) {
    attrList1.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}
// 获取二级分类列表
const getAttrList2 = async (id: number) => {
  const res = await regetAttrList2(id)
  if (res.code === 200) {
    id2.value = ''
    emit('category-selected2', id2.value)
    id3.value = ''
    emit('category-selected3', id3.value)
    attrList3.value = []
    attrList2.value = res.data
    emit('category-selected1', id)
  } else {
    ElMessage.error(res.message)
  }
}
// 获取三级分类列表
const getAttrList3 = async (id: number) => {
  const res = await regetAttrList3(id)
  if (res.code === 200) {
    id3.value = ''
    emit('category-selected3', id3.value)
    attrList3.value = []
    attrList3.value = res.data
    emit('category-selected2', id)
  } else {
    ElMessage.error(res.message)
  }
}
// 三级分类选中项
const getid3 = (id: number) => {
  emit('category-selected3', id)
}
onMounted(() => {
  getAttrList1()
})
</script>

<style scoped></style>