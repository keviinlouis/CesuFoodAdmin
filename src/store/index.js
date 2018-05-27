import Vue from 'vue'
import Vuex from 'vuex'

import utils from './utils'
import auth from './auth'
import produtos from './produtos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    utils,
    auth,
    produtos
  }
})
