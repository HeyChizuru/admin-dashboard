<template>
  <div>
    <Category @category-selected1="onCategorySelected2" @category-selected2="onCategorySelected3"
      @category-selected3="onCategoryId3" />
    <el-card style="margin-top: 20px;">
      <el-button type="primary" :disabled="id3 ? false : true">添加属性</el-button>
      <el-table :data="attrInfoList" border style="margin-top: 20px;"
        :class="{ 'table-responsive': layoutSettingStore.collapse ? false : true }">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="属性名称" width="120" prop="attrName"></el-table-column>
        <el-table-column label="属性值">
          <template #default="{ row }">
            <el-tag v-for="item in row.attrValueList" :key="item.id" type="primary" style="margin-right: 5px;">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template #default>
            <el-button type="primary" icon="Edit" color="black"></el-button>
            <el-button type="danger" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import Category from '@/components/Category.vue'
import { useLayoutSettingStore } from '@/stores/modules/setting'
import { ref, watch } from 'vue'
import { regetAttrInfoList } from '@/api/attr'
import type { AttrInfoListResponse } from '@/api/attr/type'
const layoutSettingStore = useLayoutSettingStore()
const id1 = ref<number>(0)
// 二级分类选中项
const id2 = ref<number>(0)
// 三级分类选中项
const id3 = ref<number>(0)
// 属性列表
const attrInfoList = ref<AttrInfoListResponse['data']>([])
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
// 监听三级分类选中项变化
watch(id3, async (newId) => {
  attrInfoList.value = []
  if (newId) {
    const res: AttrInfoListResponse = await regetAttrInfoList(id1.value, id2.value, newId)
    if (res.code === 200) {
      attrInfoList.value = res.data
    }
  }
})
</script>

<style scoped lang="scss">
// 自己修复了el-table响应式问题
.table-responsive {
  width: calc(100% - 4px) !important;
}
</style>