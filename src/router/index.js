import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
// import {NAME_TOKEN} from '@/config'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('jwt_token')

  if (!to.name) {
    return next({name: 'dashboard'})
  }

  if (to.meta.auth && !token) {
    return router.push({name: 'login'})
  }
  if (!to.meta.auth && token) {
    return router.push({name: 'dashboard'})
  }
  if (to.meta.auth && token && !store.getters['auth/authenticated']) {
    store.dispatch('auth/checkLogin').catch((error) => {
      store.dispatch('utils/showToast', {text: error.getMessage()})
      return router.push({name: 'login'})
    })
  }
  return next()
})

export default router
