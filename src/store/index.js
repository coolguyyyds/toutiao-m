import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

const KOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // user对象, 存储当前登录用户信息(token等数据)
    user: getItem(KOKEN_KEY)
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
