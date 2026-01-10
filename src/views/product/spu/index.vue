<template>
  <Category @category-selected1="onCategorySelected2" @category-selected2="onCategorySelected3"
    @category-selected3="onCategoryId3" :showAttrList="showAttrList" />
  <el-card style="margin-top: 20px;">
    <el-button type="primary" :disabled="!id3">添加SPU</el-button>
    <el-table border style="margin-top: 20px;" :data="spuList">
      <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
      <el-table-column label="SPU名称" prop="spuName"></el-table-column>
      <el-table-column label="SPU描述" prop="description"></el-table-column>
      <el-table-column label="操作">
        <template #default>
          <el-button type="primary" size="mini" icon="Plus" title="添加SKU"></el-button>
          <el-button type="primary" size="mini" icon="Edit" title="编辑SPU"></el-button>
          <el-button type="primary" size="mini" icon="View" title="查看SPU"></el-button>
          <el-button type="danger" size="mini" icon="Delete" title="删除SPU"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" :disabled="disabled"
      :background="background" layout="prev, pager, next, jumper" :total="total"
      @current-change="getSpuListData(id3)" />
  </el-card>
</template>
<script setup lang="ts">
import Category from '@/components/Category.vue'
import { ref, watch } from 'vue'
import { reqHasSpu } from '@/api/spu'
import type { HasSpuResponseData, SpuData } from '@/api/spu/type'
import { ElMessage } from 'element-plus'
// 分类1级id
const id1 = ref(0)
// 分类2级id
const id2 = ref(0)
// 分类3级id
const id3 = ref(0)
// 根据showAttrList判断是否禁用分类选择器
const showAttrList = ref(true)
//当前页码
const currentPage = ref(1)
// 每页显示条目个数  默认3条
const pageSize = ref(3)
// 分页器尺寸
const size = ref('small')
// 是否禁用分页器
const disabled = ref(false)
// 是否为分页按钮添加背景色
const background = ref(true)
// 总条目数
const total = ref(0)
// SPU列表
const spuList = ref<SpuData[]>([])
// 二级分类选中项处理
const onCategorySelected2 = (id: number) => {
  id1.value = id
}
// 三级分类选中项处理
const onCategorySelected3 = (id: number) => {
  id2.value = id
}
// 三级分类选中项处理
const onCategoryId3 = (id: number) => {
  id3.value = id
}
// 获取SPU列表数据
const getSpuListData = async (newId: number) => {
  const res: HasSpuResponseData = await reqHasSpu(currentPage.value, pageSize.value, newId)
  if (res.code === 200) {
    spuList.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error(res.message)
  }
}
// 组件挂载时获取SPU列表数据
watch(id3, async (newId) => {
  spuList.value = []
  if (newId) {
    getSpuListData(newId)
  }
})
</script>

<style scoped></style>