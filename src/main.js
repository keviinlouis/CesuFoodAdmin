// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VeeValidate, {Validator} from 'vee-validate'
import ptBr from 'vee-validate/dist/locale/pt_BR.js'
import router from '@/router'
import store from '@/store'
import money from 'v-money'
import {loadProgressBar} from 'axios-progress-bar'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
