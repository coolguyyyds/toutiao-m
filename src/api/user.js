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
