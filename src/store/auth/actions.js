import axios from 'axios'
import {URL_BASE} from '@/config'
import ResponseError from '@/classes/ResponseError'

export default {
  esqueciSenha (state, email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.floor((Math.random() * 2) + 1) === 1) {
          resolve()
        } else {
          let error = []
          error['email'] = 'Email não encontrado'
          reject(new ResponseError(error, 400))
        }
      }, 500)
    })
  },
  login ({state, commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      axios.post(URL_BASE + 'login', params).then((response) => {
        commit('login', {user: response.data.data, token: response.data.token})
        dispatch('utils/showToast', {text: 'Bem vindo ' + response.data.data.nome}, {root: true})
        resolve()
      }).catch((error) => {
        reject(new ResponseError(error.response.data.data, error.response.status))
      })
    })
  },
  checkLogin ({state, commit, getters}) {
    return new Promise((resolve, reject) => {
      const token = getters['getToken']
      if (!token) {
        commit('logout')
        return reject(new ResponseError('Login não autorizado', 401))
      }

      axios.get(URL_BASE + 'me').then((response) => {
        commit('setUser', response.data.data)
        resolve()
      }).catch((error) => {
        commit('logout')
        reject(new ResponseError(error.response.data.message, error.response.status))
      })
    })
  },
  updateToken ({commit}, token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    commit('setToken', token)
  },
  updateAuthenticated ({commit}, status) {
    commit('setAuthenticated', status)
  },
  logout ({commit}) {
    commit('logout')
  }
}
