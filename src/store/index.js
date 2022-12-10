import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
/**
 * 数据持久化:
 * 取数据: 页面初始化时, 从本地存储中获取需要用到的数据如果没有设置默认值
 * 存数据: 当本地存储的数据发生变化时, 需要将变化后的数据更新到本地存储中
 */
const KOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // user对象, 存储当前登录用户信息(token等数据)
    user: getItem(KOKEN_KEY) || null
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止页面刷新时数据丢失, 我们需要把数据备份到本地存储
      setItem(KOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
