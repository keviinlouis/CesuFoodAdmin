export default {
  showToast ({commit}, toast) {
    commit('showToast', toast)
  },
  toogleToast ({state, commit}) {
    commit('toogleToast')
  },
  setNextUrl ({state, commit}, url) {
    commit('setNextUrl', url)
  }
}
