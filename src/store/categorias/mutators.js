
export default {
  addCategorias (state, categorias) {
    state.categorias.push(...categorias)
  },
  setCategorias (state, categorias) {
    state.categorias = categorias
  },
  setCategoria (state, categoria) {
    state.categoria = categoria
  }
}
