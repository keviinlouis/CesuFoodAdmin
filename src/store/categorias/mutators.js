
export default {
  addCategorias (state, categorias) {
    state.categorias.push(...categorias)
  },
  deleteCategorias (state, id) {
    let index = state.categorias.findIndexBy('id', id)
    state.categorias.splice(index, 1)
  },
  setCategorias (state, categorias) {
    state.categorias = categorias
  },
  setCategoria (state, categoria) {
    state.categoria = categoria
  }
}
