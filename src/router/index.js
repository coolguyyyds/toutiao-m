import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // 组件函数式写法
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/home', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qs',
        name: 'qs',
        component: () => import('@/views/qs')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
