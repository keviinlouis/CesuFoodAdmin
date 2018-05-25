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
  const token = store.getters['auth/getToken']
  const authenticated = store.getters['auth/authenticated']
  if (!to.name) {
    next({name: 'dashboard'})
    return
  }
  if (typeof to.meta.auth === 'undefined') {
    next()
    return
  }

  if (to.meta.auth && !authenticated && !token) {
    return router.push({name: 'login'})
  }
  if (!to.meta.auth && (authenticated || token)) {
    checkHasTokenAndIsUnauthenticated()

    return router.push({name: 'dashboard'})
  }

  checkHasTokenAndIsUnauthenticated()

  next()
})

function checkHasTokenAndIsUnauthenticated () {
  const token = store.getters['auth/getToken']
  const authenticated = store.getters['auth/authenticated']
  if (authenticated && token) {
    return
  }

  if (!authenticated && !token) {
    return
  }

  store.dispatch('auth/updateStatus', true)

  store.dispatch('auth/checkLogin').then(() => {
  }).catch(() => {
    router.push({name: 'login'})
  })
}

export default router
