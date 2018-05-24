import Vue from 'vue'
import Vuex from 'vuex'

import utils from './utils'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    utils: utils,
    auth: auth
  }
})
