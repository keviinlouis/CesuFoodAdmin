import axios from 'axios'
import {URL_BASE} from '@/config'
import ResponseError from '@/classes/ResponseError'

export default {
  loadProdutos ({commit}, {query, pagination}) {
    return new Promise((resolve, reject) => {
      let params = {
        page: pagination.page,
        ...query
      }
      axios.get(URL_BASE + 'produto', {params})
        .then((response) => {
          commit('setProdutos', response.data.data)
          resolve({meta: response.data.meta, links: response.data.links})
        })
        .catch((error) => {
          reject(new ResponseError(error.response.message, error.response.status))
        })
    })
  },
  loadMoreProdutos ({commit}, {query, pagination}) {
    return new Promise((resolve, reject) => {
      let params = {
        page: pagination.page,
        ...query
      }
      axios.get(URL_BASE + 'produto', {params})
        .then((response) => {
          commit('addProdutos', response.data.data)
          resolve({meta: response.data.meta, links: response.data.links})
        })
        .catch((error) => {
          console.log(error)
          reject(new ResponseError(error.response.message, error.response.status))
        })
    })
  },
  loadProduto ({commit}, id) {
    return new Promise((resolve, reject) => {
      axios.get(URL_BASE + 'produto/' + id)
        .then((response) => {
          commit('setProduto', response.data.data)
          resolve()
        })
        .catch((error) => {
          reject(new ResponseError(error.response.message, error.response.status))
        })
    })
  },
  updateProduto ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.put(URL_BASE + 'produto/' + data.id, data)
        .then((response) => {
          commit('setProduto', response.data.data)
          commit('utils/showToast', {text: 'Produto atualizado'}, {root: true})
          resolve()
        })
        .catch((error) => {
          if (error.response.status === 404) {
            commit('removeProduto', data)
            commit('utils/showToast', {text: 'Produto não encontrado'}, {root: true})
          }
          reject(new ResponseError(error.response.message, error.response.status))
        })
    })
  }
}
