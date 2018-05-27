
export default {
  addProdutos (state, produtos) {
    state.produtos.push(...produtos)
  },
  setProutos (state, produtos) {
    state.produtos = produtos
  },
  setProduto (state, produto) {
    state.produto = produto
  }
}
