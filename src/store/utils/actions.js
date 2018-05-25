export default {
  setToast ({commit}, toast) {
    commit('showToast', toast)
  },
  toogleToast ({state, commit}) {
    commit('toogleToast')
  }
}
