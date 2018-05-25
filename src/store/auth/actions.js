import axios from 'axios'
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
      setTimeout(() => {
        if (Math.floor((Math.random() * 2) + 1) === 2) {
          resolve()
        } else {
          let error = []
          if (Math.floor((Math.random() * 2) + 1) === 1) {
            error['email'] = 'Email não encontrado'
          } else {
            error['senha'] = 'Senha incorreta'
          }
          reject(new ResponseError(error, 400))
        }
      }, 500)
    })
  },
  checkLogin ({state, commit, getters}) {
    return new Promise((resolve, reject) => {
      const token = getters['getToken']
      if (!token) {
        commit('logout')
        return reject(new ResponseError('Login não autorizado', 401))
      }

      setTimeout(() => {
        // if (Math.floor((Math.random() * 2) + 1) === 2) {
        //   return resolve()
        // } else {
        commit('logout')
        return reject(new ResponseError('Login não autorizado', 401))
        // }
      }, 500)
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
