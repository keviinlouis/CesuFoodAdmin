export default {
  showToast: (state, toast) => {
    state.toast.text = toast.text
    state.toast.tempo = toast.tempo ? toast.tempo : 6000
    state.toast.show = true
    switch (toast.direction) {
      case 'tl':
        state.toast.top = true
        state.toast.bottom = false
        state.toast.left = true
        state.toast.right = false
        break
      case 'tr':
        state.toast.top = true
        state.toast.bottom = false
        state.toast.left = false
        state.toast.right = true
        break
      case 'bl':
        state.toast.top = false
        state.toast.bottom = true
        state.toast.left = true
        state.toast.right = false
        break
      default:
        state.toast.top = false
        state.toast.bottom = true
        state.toast.left = false
        state.toast.right = true
    }
  },
  toogleToast: (state) => {
    state.toast.show = !state.toast.show
  }
}
