import request from '@/utils/request'
/**
 * 联想建议接口
 */
export const searchSuggestion = params => request({
  method: 'GET',
  url: '/v1_0/suggestion',
  params: {
    q: params
  }
})
export const searchResult = params => request({
  method: 'GET',
  url: '/v1_0/search',
  params
})
