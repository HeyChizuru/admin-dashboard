import request from '@/utils/request'
import type { TradeMarkResponse, TradeMarkPageResponse, TradeMark, TradeMarkAddUpdateResponse } from './type'

// 获取品牌分页列表
export const regetTradeMarkListByPage = (page: number, limit: number) =>
  request.get<string, TradeMarkPageResponse>(`/admin/product/baseTrademark/${page}/${limit}`)

// 获取全部品牌列表
export const regetAllTradeMarkList = () =>
  request.get<string, TradeMarkResponse>('/admin/product/baseTrademark/getTrademarkList')
// 新增品牌
export const reAddTradeMark = (data: TradeMark) =>
  request.post<TradeMark, TradeMarkAddUpdateResponse>('/admin/product/baseTrademark/save', data)
// 更新品牌
export const reUpdateTradeMark = (data: TradeMark) =>
  request.put<TradeMark, TradeMarkAddUpdateResponse>('/admin/product/baseTrademark/update', data)
