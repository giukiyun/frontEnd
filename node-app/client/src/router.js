import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('./views/Index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('./views/404.vue')
  }
  ]
})
// 添加路由守卫
router.beforeEach((to, form, next) => {
  const isLogin = !!localStorage.eleToken
  // eslint-disable-next-line eqeqeq
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})
export default router
