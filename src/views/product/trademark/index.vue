<template>
  <el-card style="width: 100%">
    <el-button type="primary" color="black" @click="addTrademark">添加品牌</el-button>
    <el-table :data="trademarkList" style="width: 100%;  margin: 10px 0 ;" border
      :class="{ 'table-responsive': layoutSettingStore.collapse ? false : true }">
      <el-table-column label="序号" width="100" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称">
        <template #default="{ row }">
          {{ row.tmName }}
        </template>
      </el-table-column>
      <el-table-column label="品牌logo">
        <template #default="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 60px; height: 60px;">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" icon="Edit" @click="updateTrademark(row)" color="black"></el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="deleteTrademark(row.id)">
            <template #reference>
              <el-button type="danger" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" :disabled="disabled"
      :background="background" layout="prev, pager, next, jumper" :total="total" @current-change="getTradeMarkList" />
  </el-card>
  <!-- 对话框 -->
  <el-dialog v-model="dialogVisible" :title="trademarkForm.id ? '修改品牌' : '添加品牌'" width="800">
    <el-form :model="trademarkForm" :rules="rules" ref="l_form">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkForm.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" prop="logoUrl">
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
          :headers="{ 'token': userStore.token }" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="cancel" color="black">取消</el-button>
      <el-button type="primary" @click="confirm" color="black">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { regetTradeMarkListByPage, reAddTradeMark, reUpdateTradeMark, reDeleteTradeMark } from '@/api/trademark/index'
import type { TradeMarkPageResponse, TradeMark, TradeMarkAddUpdateDeleteResponse } from '@/api/trademark/type'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { useLayoutSettingStore } from '@/stores/modules/setting'
import { useUserStore } from '@/stores/modules/user'
const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
//当前页码
const currentPage = ref(1)
// 每页显示条目个数  默认8条
const pageSize = ref(6)
// 分页器尺寸
const size = ref('small')
// 是否禁用分页器
const disabled = ref(false)
// 是否为分页按钮添加背景色
const background = ref(true)
// 总条目数
const total = ref(0)
// 品牌列表
const trademarkList = ref<TradeMarkPageResponse['data']['records']>([])
// 对话框是否可见
const dialogVisible = ref(false)
// 收集品牌新增数据
const trademarkForm = ref<TradeMark>({
  tmName: '',
  logoUrl: ''
})
// 表单实例
const l_form = ref()
// 获取品牌列表
const getTradeMarkList = async () => {
  const res: TradeMarkPageResponse = await regetTradeMarkListByPage(currentPage.value, pageSize.value)
  if (res.code === 200) {
    trademarkList.value = res.data.records
    total.value = res.data.total
  }
}
// 组件挂载时获取品牌列表
onMounted(() => getTradeMarkList())
// 添加/修改品牌
const addTrademark = () => {
  dialogVisible.value = true
  // 清空表单校验
  if (l_form.value) {
    l_form.value.clearValidate()
  }
  trademarkForm.value = {
    id: undefined,
    tmName: '',
    logoUrl: ''
  }
}
// 更新品牌
const updateTrademark = async (row: TradeMark) => {
  dialogVisible.value = true
  Object.assign(trademarkForm.value, row)

}
// 取消添加品牌
const cancel = () => {
  dialogVisible.value = false
}
// 确认添加/修改品牌
const confirm = async () => {
  // 表单校验
  await l_form.value.validate()
  let res
  if (trademarkForm.value.id) {
    res = await reUpdateTradeMark(trademarkForm.value)
    if (res.code === 200) {
      ElMessage({
        message: '修改品牌成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: '修改品牌失败',
        type: 'error'
      })
    }
    dialogVisible.value = false
  } else {
    res = await reAddTradeMark(trademarkForm.value)
    if (res.code === 200) {
      ElMessage({
        message: '添加品牌成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: '添加品牌失败',
        type: 'error'
      })
    }
    dialogVisible.value = false
  }
  getTradeMarkList()
}
// 限制品牌logo上传的文件类型
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
    return true
  } else {
    ElMessage({
      message: '品牌logo只能上传png、jpeg、gif格式的图片',
      type: 'error'
    })
    return false
  }
}
// 品牌logo上传成功后的处理函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response
) => {
  trademarkForm.value.logoUrl = response.data
}
// 品牌表单校验规则
const rules = {
  tmName: [
    { required: true, message: '品牌名称不能为空', trigger: 'blur' }
  ],
  logoUrl: [
    { required: true, message: '品牌logo不能为空', trigger: 'blur' }
  ]
}
// 删除品牌
const deleteTrademark = async (id: number) => {
  const res: TradeMarkAddUpdateDeleteResponse = await reDeleteTradeMark(id)
  if (res.code === 200) {
    ElMessage({
      message: '删除品牌成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '删除品牌失败',
      type: 'error'
    })
  }
  getTradeMarkList()
}
</script>
<style scoped lang="scss">
// 自己修复了el-table响应式问题
.table-responsive {
  width: calc(100% - 4px) !important;
}

// 修改el-pagination分页器样式
:deep(.el-pagination) {
  .el-pager {
    li {
      &.active {
        background-color: #000 !important;
        border-color: #000 !important;
        color: #fff !important;

        &:hover {
          background-color: #333 !important;
        }
      }

      &:not(.active) {
        background-color: #fff;
        border-color: #dcdfe6;
        color: #606266;

        &:hover {
          color: #000;
          border-color: #000;
        }
      }
    }
  }

  .btn-prev,
  .btn-next {
    &:not(.disabled) {
      &:hover {
        color: #000;
        border-color: #000;
      }
    }

    &.disabled {
      color: #c0c4cc;
      background-color: #f5f7fa;
    }
  }

  .el-pagination__jump {
    color: #606266;

    .el-pagination__editor {
      .el-input__inner {
        &:focus {
          border-color: #000;
        }
      }
    }
  }
}


// 品牌logo上传组件样式
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: black;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>