// 定义品牌项类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}
// 品牌分页列表响应类型
export interface TradeMarkPageResponse {
  code: number
  data: {
    current: number
    pages: number
    records: TradeMark[]
    size: number
    total: number
  }
  message: string
}
// 品牌列表响应类型
export interface TradeMarkResponse {
  code: number
  message: string
  data: TradeMark[]
}
// 新增品牌和修改品牌响应类型
export interface TradeMarkAddUpdateResponse {
  code: number
  message: string
  data: string
}
