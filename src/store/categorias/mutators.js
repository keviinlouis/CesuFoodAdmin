
export default {
  addCategorias (state, categorias) {
    state.categorias.push(...categorias)
  },
  setProutos (state, categorias) {
    state.categorias = categorias
  },
  setCategoria (state, categoria) {
    state.categoria = categoria
  }
}
