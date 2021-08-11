import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import Cloudbase from '@cloudbase/vue-provider'
import cloudbaseConfig from '@/configs/cloudbase.js'
import '@/assets/css/antd-variable.less'
import '@/assets/css/site.less'

Vue.config.productionTip = false

Vue.use(Cloudbase, cloudbaseConfig)
Vue.use(Antd)

let loginRoute = {
  path: '/login',
  name: 'login'
}
let whiteList = [loginRoute.path, '/403', '/404']
router.beforeEach(async (to, from, next) => {
  if (!store.state.cloudbaseAuth) {
    store.commit('SET_CLOUDBASE_AUTH',
      Vue.prototype.$cloudbase.auth({ persistence: 'local' })
    )
  }
  if (store.state.cloudbaseAuth.currentUser) {
    to.path === loginRoute.path ? next('/') : next()
  } else if (whiteList.includes(to.path)) {
    next()
  } else {
    router.push({
      name: loginRoute.name,
      params: { to: to }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
