
export default {
  addProdutos (state, produtos) {
    produtos.forEach((produto) => {
      let produtoIndex = state.produtos.findIndexBy('id', produto.id)
      if (produtoIndex === -1) {
        state.produtos.push(produto)
      }
    })
  },
  setProdutos (state, produtos) {
    state.produtos = produtos
  },
  setProduto (state, produto) {
    state.produto = produto
    let produtoIndex = state.produtos.findIndexBy('id', produto.id)
    if (produtoIndex === -1) {
      state.produtos.push(produto)
    } else {
      state.produtos.splice(produtoIndex, 1, produto)
    }
  },
  removeProduto (state, produto) {
    let produtoIndex = state.produtos.findIndexBy('id', produto.id)
    if (produtoIndex === -1) {
      return true
    }
    state.produtos.splice(produtoIndex, 1)
  }
}
