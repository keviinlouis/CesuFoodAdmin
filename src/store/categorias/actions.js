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
          reject(new ResponseError(error.response.message, error.response.status))
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
          reject(new ResponseError(error.response.message, error.response.status))
        })
    })
  }
}
