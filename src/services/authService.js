import axios from 'axios'

export default {
  emailRecuperarSenha: (email) => {
    axios.post('/recuperar-senha', {email}).then(()=>{

    })
  }
}
