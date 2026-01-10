<template>
  <div>
    <!-- 分类选择器 -->
    <Category @category-selected1="onCategorySelected2" @category-selected2="onCategorySelected3"
      @category-selected3="onCategoryId3" :showAttrList="showAttrList" />
  </div>
  <div v-if="showAttrList">
    <el-card style="margin-top: 20px;">
      <el-button type="primary" :disabled="id3 ? false : true" @click="addAttr">添加属性</el-button>
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
          <template #default="{ row }">
            <el-button type="primary" icon="Edit" color="black" @click="editAttr(row)"></el-button>
            <el-popconfirm title="Are you sure to delete this?" @confirm="deleteAttr(row)">
              <template #reference>
                <el-button type="danger" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <!-- 修改和添加属性 -->
  <div v-else>
    <el-card style="margin-top: 20px;">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrInfoData.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" :disabled="!attrInfoData.attrName" @click="addAttrValue">添加属性值</el-button>
      <el-table border style="margin-top: 20px;" :data="attrInfoData.attrValueList">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{ row }">
            <el-input placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template #default="{ row }">
            <el-button type="danger" icon="Delete" @click="removeAttrValue(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" style="margin-top: 20px;" @click="saveAttr">保存</el-button>
      <el-button type="primary" @click="showAttrList = !showAttrList" style="margin-top: 20px;">取消</el-button>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import Category from '@/components/Category.vue'
import { useLayoutSettingStore } from '@/stores/modules/setting'
import { ref, watch, } from 'vue'
import { regetAttrInfoList, reAddOrUpdateAttr, reDeleteAttr } from '@/api/attr'
import type { AttrInfoListResponse, AttrInfoData, AddOrUpdateAttrResponse, AttrValueData } from '@/api/attr/type'
import { ElMessage } from 'element-plus'
const layoutSettingStore = useLayoutSettingStore()
const id1 = ref<number>(0)
// 二级分类选中项
const id2 = ref<number>(0)
// 三级分类选中项
const id3 = ref<number>(0)
// 属性列表
const attrInfoList = ref<AttrInfoListResponse['data']>([])
// 控制属性列表是否显示
const showAttrList = ref<boolean>(true)
// 收集属性信息数据
const attrInfoData = ref<AttrInfoData>({
  id: undefined,
  attrName: '',
  attrValueList: [],
  categoryId: 0,
  categoryLevel: 3
})
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
// 获取三级分类下已有属性和属性值
const getAttrInfoList = async (newId: number) => {
  const res: AttrInfoListResponse = await regetAttrInfoList(id1.value, id2.value, newId)
  if (res.code === 200) {
    attrInfoList.value = res.data
  }
}
// 监听三级分类选中项变化
watch(id3, async (newId) => {
  attrInfoList.value = []
  if (newId) {
    getAttrInfoList(newId)
  }
})
// 添加属性
const addAttr = () => {
  attrInfoData.value = {
    id: undefined,
    attrName: '',
    attrValueList: [],
    categoryId: 0,
    categoryLevel: 3
  }
  showAttrList.value = !showAttrList.value
}
// 添加属性值
const addAttrValue = () => {
  attrInfoData.value.attrValueList.push({
    valueName: '',
  })
}
// 修改属性
const editAttr = (row: AttrInfoData) => {
  showAttrList.value = !showAttrList.value
  Object.assign(attrInfoData.value, row)
}
// 删除属性值
const removeAttrValue = (row: AttrValueData) => {
  // 过滤出不等于当前行的属性值
  attrInfoData.value.attrValueList = attrInfoData.value.attrValueList.filter(item => item !== row)
}
// 保存属性
const saveAttr = async () => {
  attrInfoData.value.categoryId = id3.value
  const res: AddOrUpdateAttrResponse = await reAddOrUpdateAttr(attrInfoData.value)
  if (res.code === 200) {
    ElMessage({
      message: '保存属性成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '保存属性失败',
      type: 'error'
    })
  }
  showAttrList.value = !showAttrList.value
  getAttrInfoList(id3.value)
}
// 删除属性
const deleteAttr = async (row: AttrInfoData) => {
  const res: AddOrUpdateAttrResponse = await reDeleteAttr(row.id!)
  if (res.code === 200) {
    ElMessage({
      message: '删除属性成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '删除属性失败',
      type: 'error'
    })
  }
  getAttrInfoList(id3.value)
}
</script>

<style scoped lang="scss">
// 自己修复了el-table响应式问题
.table-responsive {
  width: calc(100% - 4px) !important;
}
</style>