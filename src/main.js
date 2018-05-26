// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VeeValidate, {Validator} from 'vee-validate'
import ptBr from 'vee-validate/dist/locale/pt_BR.js'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import money from 'v-money'
import {loadProgressBar} from 'axios-progress-bar'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/prototypes.js'
// Helpers

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: '#4F689C',
    dark: '#3F547C',
    accent: '#FFA500'
  }
})

Validator.localize('pt_BR', ptBr)
Vue.use(VeeValidate, {locale: 'pt_BR'})

Vue.use(money)

loadProgressBar()

axios.interceptors.response.use(function (response) {
  let newToken = response.headers['new_token']
  if (newToken) {
    store.dispatch('auth/updateToken', newToken)
  }
  if (response.status === 401 && response.headers['WWW-Authenticate'] === 'jwt_auth') {
    store.dispatch('auth/logout')
  }
  if (response.status === 500) {
    store.dispatch('utils/showToast', {text: 'Ocorreu um erro'})
  }
  return response
})

axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['auth/getToken']
axios.defaults.headers.common['Accept'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
