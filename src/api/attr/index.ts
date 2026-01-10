import request from '@/utils/request'
import type { AttrListResponse, AttrInfoListResponse, AttrInfoData, AddOrUpdateAttrResponse } from './type'
// 获取一级属性列表
export const regetAttrList1 = () => request.get<string, AttrListResponse>('/admin/product/getCategory1')
// 获取二级属性列表
export const regetAttrList2 = (category1Id: number) => request.get<number, AttrListResponse>(`/admin/product/getCategory2/${category1Id}`)
// 获取三级属性列表
export const regetAttrList3 = (category2Id: number) => request.get<number, AttrListResponse>(`/admin/product/getCategory3/${category2Id}`)
// 获取分类下已有属性和属性值
export const regetAttrInfoList = (category1Id: number, category2Id: number, category3Id: number) =>
  request.get<string, AttrInfoListResponse>(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
// 添加或修改属性
export const reAddOrUpdateAttr = (data: AttrInfoData) =>
  request.post<AttrInfoData, AddOrUpdateAttrResponse>('/admin/product/saveAttrInfo', data)
// 删除属性
export const reDeleteAttr = (attrId: number) =>
  request.delete<number, AddOrUpdateAttrResponse>(`/admin/product/deleteAttr/${attrId}`)