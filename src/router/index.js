import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // 组件函数式写法
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
