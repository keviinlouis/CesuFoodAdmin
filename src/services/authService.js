export default {
  emailRecuperarSenha: (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.floor((Math.random() * 2) + 1) === 1) {
          resolve()
        } else {
          reject(new Error('Email não encontrado'))
        }
      }, 500)
    })
  }
}
