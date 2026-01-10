# SPU模块功能实现计划

## 一、API完善

### 1. SPU API扩展

* 添加获取单个SPU详情接口

* 添加编辑SPU接口

* 添加删除SPU接口

### 2. SKU API实现

* 添加获取SPU下的SKU列表接口

* 添加添加SKU接口

* 添加编辑SKU接口

* 添加删除SKU接口

## 二、类型定义完善

### 1. SPU类型扩展

* 添加SPU详情类型

* 添加编辑SPU请求参数类型

* 添加删除SPU响应类型

### 2. SKU类型实现

* 添加SKU记录类型

* 添加SKU列表响应类型

* 添加添加SKU请求参数类型

## 三、组件实现

### 1. 完善SPU列表组件

* 添加查看SPU功能

* 添加编辑SPU功能

* 添加删除SPU功能

### 2. 创建编辑SPU组件

* 路径：`src/views/product/spu/EditSpu.vue`

* 实现编辑SPU表单

* 实现提交编辑功能

### 3. 创建添加SKU组件

* 路径：`src/views/product/spu/AddSku.vue`

* 实现添加SKU表单

* 实现提交添加功能

### 4. 完善SKU管理组件

* 实现SKU列表展示

* 实现SKU编辑功能

* 实现SKU删除功能

## 四、功能实现步骤

1. 首先完善API接口和类型定义
2. 实现SPU组件的查看、编辑、删除功能
3. 创建并实现编辑SPU组件
4. 创建并实现添加SKU组件
5. 完善SKU管理组件

## 五、技术要点

* 使用Element Plus组件库构建UI

* 遵循Vue 3 Composition API规范

* 实现TypeScript类型安全

* 实现表单验证

* 实现文件上传功能

* 实现级联选择功能

## 六、文件结构

```
src/
├── api/
│   ├── spu/
│   │   ├── index.ts      # SPU API接口
│   │   └── type.ts       # SPU类型定义
│   └── sku/
│       ├── index.ts      # SKU API接口
│       └── type.ts       # SKU类型定义
└── views/
    └── product/
        ├── spu/
        │   ├── index.vue     # SPU列表组件
        │   ├── EditSpu.vue   # 编辑SPU组件
        │   └── AddSku.vue    # 添加SKU组件
        └── sku/
            └── index.vue     # SKU管理组件
```

