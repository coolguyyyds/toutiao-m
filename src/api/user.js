import request from '@/utils/request'
/**
 * 登录请求
 * data 电话号码:number 验证码:number
 */
export const login = data => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})
/**
 * 验证码请求
 * params 电话号码:number
 */
export const sendCode = params => request({
  method: 'GET',
  url: `/v1_0/sms/codes/${params}`
})
/**
 * 获取用户信息
 */
export const getUserInfo = () => request({
  method: 'GET',
  url: '/v1_0/user'
  /* 发送请求头数据
  headers: {
    改接口需要授权才能访问 Bearer后面有空格 后面跟token
    Authorization: `Bearer ${store.state.user.token}`
  } */
})
/**
 * 获取用户频道列表
 */
export const getUserChannel = () => request({
  method: 'GET',
  url: '/v1_0/user/channels'
})
/**
 * 添加关注
 */
export const addFollows = target => request({
  method: 'POST',
  url: '/v1_0/user/followings',
  data: {
    target
  }
})
/**
 * 取消关注
 */
export const deleteFollows = target => request({
  method: 'DELETE',
  url: `/v1_0/user/followings/${target}`
})
/**
 * 获取用户个人资料
 */
export const getUserProfile = target => request({
  method: 'GET',
  url: '/v1_0/user/profile'
})
/**
 * 编辑用户个人资料
 */
export const editUserProfile = data => request({
  method: 'PATCH',
  url: '/v1_0/user/profile',
  data
})
/**
 * 编辑用户照片资料（头像、身份证照片）
 */
export const editUserAvatar = data => request({
  method: 'PATCH',
  url: '/v1_0/user/photo',
  data
})
