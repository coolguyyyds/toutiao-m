import request from '@/utils/request'
/**
 * 获取所有频道
 */
export const allChannel = () => request({
  method: 'GET',
  url: '/v1_0/channels'
})
/**
 * 修改用户频道列表
 */
export const updateChannels = channel => request({
  method: 'PATCH',
  url: '/v1_0/user/channels',
  data: {
    channels: [channel]
  }
})
/**
 * 删除指定用户频道
 */
export const deleteChannel = id => request({
  method: 'DELETE',
  url: `/v1_0/user/channels/${id}`
})
