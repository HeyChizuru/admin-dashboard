// 属性列表响应数据
export interface AttrListResponse {
  code: number
  data: CategoryData[]
  message: string
}
// 分类数据类型
export interface CategoryData {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}
// 属性值数据类型
export interface AttrValueData {
  id: number
  attrId: string
  valueName: string
}
// 属性信息数据类型
export interface AttrInfoData {
  id: number
  attrName: string
  attrValueList: AttrValueData[]
  categoryId: number
  categoryLevel: number
}
// 获取分类下已有属性和属性值响应数据
export interface AttrInfoListResponse {
  code: number
  data: AttrInfoData[]
  message: string
}