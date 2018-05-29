export default {
  getProdutos (state) { return state.produtos },
  getProdutosByCategoria: (state) => (id) => {
    return state.produtos.filter((produto) => {
      return produto.categoria.id === id
    })
  },
  getProduto (state, id) {
    let produto = state.produto
    produto.fotos = produto.fotos.filter((x) => x.search('assets') === -1)
    return produto
  }
}
