import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

// Add a request interceptor 添加一个请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent 每次向服务器发送请求都会经过这个
  // config 请求配置对象(保存着请求的相关信息)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 必须返回config对象, 否则请求就会阻塞在这里
  return config
}, function (error) {
  // Do something with request error 如果请求出错了(还没有发出去)会进入这里 抛出异常
  return Promise.reject(error)
})

export default request
