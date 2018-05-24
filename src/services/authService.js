import ErrorFormValidation from '../class/ErrorFormValidation'

export default {
  emailRecuperarSenha: (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.floor((Math.random() * 2) + 1) === 1) {
          resolve()
        } else {
          let error = []
          error['email'] = 'Email não encontrado'
          reject(new ErrorFormValidation(error))
        }
      }, 500)
    })
  },
  login: (email, senha) => {
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
          reject(new ErrorFormValidation(error))
        }
      }, 500)
    })
  }
}
