import axios from 'axios'
import {URL_BASE} from '@/config'
import ResponseError from '@/classes/ResponseError'

export default {
  loadProdutos ({commit}, params) {
    return new Promise((resolve, reject) => {
      axios.get(URL_BASE + 'produto', {params})
        .then((response) => {
          commit('addProdutos', response.data.data)
        })
        .catch((error) => {
          reject(new ResponseError(error.response.message, error.response.status))
        })
    })
  },
  loadProduto ({commit}, id) {
    return new Promise((resolve, reject) => {
      axios.get(URL_BASE + 'produto/' + id)
        .then((response) => {
          commit('setProdutos', response.data.data)
        })
        .catch((error) => {
          reject(new ResponseError(error.response.message, error.response.status))
        })
    })
  }
}
