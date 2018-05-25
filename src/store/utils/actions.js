export default {
  showToast ({commit}, toast) {
    commit('showToast', toast)
  },
  toogleToast ({state, commit}) {
    commit('toogleToast')
  }
}
