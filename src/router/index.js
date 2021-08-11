import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/shared/layout.vue'
import home from '@/views/home/index.vue'
import test from '@/views/home/test.vue'
import login from '@/views/login/index.vue'

Vue.use(Router)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/test',
          name: 'test',
          component: test
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/403',
      component: () => import('@/shared/403')
    },
    {
      path: '/404',
      component: () => import('@/shared/404')
    },
    {
      path: '*',
      name: 'any',
      redirect: '/404'
    }
  ]
})
