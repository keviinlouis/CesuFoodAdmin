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
  let token = store.getters['auth/getToken']
  let authenticated = store.getters['auth/authenticated']
  if (!to.name) {
    next({name: 'dashboard'})
    return
  }

  if (to.meta.auth && !token) {
    return router.push({name: 'login'})
  }
  if (!to.meta.auth && token) {
    return router.push({name: 'dashboard'})
  }
  if (to.meta.auth && token && !authenticated) {
    checkHasTokenAndIsUnauthenticated()
    if (store.getters['auth/getToken']) {
      next()
    }
    return
  }
  return next()
})

function checkHasTokenAndIsUnauthenticated () {
  let token = store.getters['auth/getToken']
  let authenticated = store.getters['auth/authenticated']
  if (authenticated && token) {
    return
  }

  if (!authenticated && !token) {
    return
  }

  store.dispatch('auth/updateAuthenticated', true)

  store.dispatch('auth/checkLogin')
    .catch((error) => {
      router.push({name: 'login'}, function () {
        console.log(1)
      })
      store.dispatch('utils/showToast', {text: error.getMessage()})
    })
}

export default router
