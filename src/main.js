import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant 核心组件库
import Vant from 'vant'
// 加载vant全局样式
import 'vant/lib/index.css'
// 加载全局样式 全局样式加载在后面可覆盖重新设置的样式
import './styles/index.less'

// 动态设置 rem 基准值
import 'amfe-flexible'
import './utils/dayjs'
Vue.config.productionTip = false

// 注册使用 Vant 组件库
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
