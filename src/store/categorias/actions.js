import axios from 'axios'
import {URL_BASE} from '@/config'
import ResponseError from '@/classes/ResponseError'

export default {
  loadCategorias ({commit}, params) {
    return new Promise((resolve, reject) => {
      axios.get(URL_BASE + 'categoria', {params})
        .then((response) => {
          commit('setCategorias', response.data.data)
          resolve()
        })
        .catch((error) => {
          reject(new ResponseError(error.response.data.message, error.response.status))
        })
    })
  },
  loadCategoria ({commit}, id) {
    return new Promise((resolve, reject) => {
      axios.get(URL_BASE + 'categoria/' + id)
        .then((response) => {
          commit('setCategoria', response.data.data)
          resolve()
        })
        .catch((error) => {
          reject(new ResponseError(error.response.data.message, error.response.status))
        })
    })
  },
  salvarCategoria ({dispatch}, categoria) {
    if (categoria.id) {
      return dispatch('updateCategoria', categoria)
    }
    return dispatch('createCategoria', categoria)
  },
  createCategoria ({commit}, categoria) {
    return new Promise((resolve, reject) => {
      axios.post(URL_BASE + 'categoria', categoria)
        .then((response) => {
          commit('utils/showToast', {text: 'Categoria criada'}, {root: true})
          commit('addCategorias', [response.data.data])
          resolve()
        })
        .catch((error) => {
          reject(new ResponseError(error.response.data.message, error.response.status))
        })
    })
  },
  updateCategoria ({commit}, categoria) {
    return new Promise((resolve, reject) => {
      axios.put(URL_BASE + 'categoria/' + categoria.id, categoria)
        .then(() => {
          commit('utils/showToast', {text: 'Categoria atualizada'}, {root: true})
          resolve()
        })
        .catch((error) => {
          if (error.response) {
            reject(new ResponseError(error.response.data.message, error.response.status))
          }
          reject(error)
        })
    })
  },
  deleteCategoria ({commit}, categoria) {
    return new Promise((resolve, reject) => {
      axios.delete(URL_BASE + 'categoria/' + categoria.id)
        .then(() => {
          commit('utils/showToast', {text: 'Categoria Removida'}, {root: true})
          commit('deleteCategorias', categoria.id)
          resolve()
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
            commit('utils/showToast', {text: error.response.data.message}, {root: true})
            reject(new ResponseError(error.response.data.message, error.response.status))
          }

          reject(error)
        })
    })
  }
}
