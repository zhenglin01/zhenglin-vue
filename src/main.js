// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routes from './router'
Vue.use(Element)
Vue.config.productionTip = false
Vue.use(VueRouter)
/* eslint-disable no-new */
const router = new VueRouter({
  routes
})
/* 登录拦截 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('EMPNAME')
  }
  let empNname = sessionStorage.getItem('EMPNAME')
  if (!empNname && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
