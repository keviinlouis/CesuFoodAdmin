export default {
  getProdutos (state) { return state.produtos },
  getProdutosByCategoria: (state) => (id) => {
    return state.produtos.filter((produto) => {
      return produto.categoria.id === id
    })
  },
  getProduto (state, id) { return state.produto }
}
