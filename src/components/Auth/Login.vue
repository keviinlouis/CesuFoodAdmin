<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height class="base-page-login">
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md5 lg3>
                        <v-card class="elevation-12 card-login" center>
                            <v-card-media
                                    :contain="true"
                                    height="356.25px"
                                    :src="logo"
                            />
                            <v-card-text>
                                <v-form data-vv-scope="login" v-on:submit.prevent="login">
                                    <v-text-field prepend-icon="person"
                                                  id="email"
                                                  name="email"
                                                  label="Email"
                                                  v-model="form.email"
                                                  v-validate="'required|email'"
                                                  @keyup.enter="login"
                                                  :error-messages="errors.first('login.email')?errors.first('login.email'):[]"
                                                  type="email">
                                    </v-text-field>
                                    <v-text-field prepend-icon="lock"
                                                  id="senha"
                                                  name="senha"
                                                  label="Senha"
                                                  v-model="form.senha"
                                                  v-validate="'required|min:6'"
                                                  @keyup.enter="login"
                                                  :error-messages="errors.first('login.senha')?errors.first('login.senha'):[]"
                                                  type="password">
                                    </v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="grey darken-1" flat small @click="senhaDialog = true">
                                    Esqueci a senha
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="accent"
                                       @click="login"
                                       :loading="form.loading"
                                       @click.native="loader = 'form.loading'"
                                       :disabled="form.loading">
                                    Login
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-dialog v-model="senhaDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    Esqueci a senha
                </v-card-title>
                <v-card-text>
                    Enviaremos um email para você com as instruções para redefinir sua senha
                    <v-form data-vv-scope="esqueci-senha" v-on:submit.prevent="enviarEmailRecuperarSenha">
                        <v-text-field prepend-icon="person"
                                      name="email"
                                      label="Email"
                                      v-model="esqueciSenha.email"
                                      v-validate="'required|email'"
                                      :error-messages="errors.first('esqueci-senha.email')?errors.first('esqueci-senha.email'):[]"
                                      type="email">
                        </v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="grey darken-1" flat @click.stop="senhaDialog=false">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="accent"
                           @click="enviarEmailRecuperarSenha"
                           :loading="esqueciSenha.loading"
                           @click.native="loader = 'esqueciSenha.loading'"
                           :disabled="esqueciSenha.loading">
                        Enviar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="emailEnviadoDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    Esqueci a senha
                </v-card-title>
                <v-card-text>
                    Email enviado com sucesso!
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent"
                           @click="emailEnviadoDialog = false">
                        Enviar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
  import Logo from '@/assets/logo.png'
  import authService from '@/services/authService'
  export default {
    name: 'Login',
    data () {
      return {

        form: {
          email: '',
          senha: '',
          loading: false,
          random: 0
        },
        esqueciSenha: {
          email: '',
          loading: false,
          random: 0
        },
        logo: Logo,
        emailEnviadoDialog: false,
        senhaDialog: false
      }
    },
    methods: {
      enviarEmailRecuperarSenha () {
        this.esqueciSenha.loading = true
        this.errors.remove('esqueci-senha.email')
        this.$validator.validateAll('esqueci-senha').then((result) => {
          if (!result) {
            this.esqueciSenha.loading = false
            return false
          }
          authService.emailRecuperarSenha(this.esqueciSenha.email).then(() => {
            this.emailEnviadoDialog = true
            this.esqueciSenha.random = 0
            this.senhaDialog = false
          }).catch((error) => {
            this.$validator.errors.add('esqueci-senha.email', error.message)
            this.esqueciSenha.random = 1
          }).finally(() => {
            this.esqueciSenha.loading = false
          })
        })
      },
      login: function () {
        this.form.loading = true
        this.errors.clear()
        this.$validator.validateAll('login').then((result) => {
          if (!result) {
            this.form.loading = false
            return false
          }
          setTimeout(() => {
            this.form.loading = false
            if (this.form.random === 0) {
              this.form.random = 1
              this.$validator.errors.add('login.email', 'Email não encontrado')
            } else if (this.form.random === 1) {
              this.form.random = 2
              this.$validator.errors.add('login.senha', 'Senha incorreta')
            } else {
              // TODO Push to Dashboard
            }
          }, 500)
        })
      }
    }
  }
</script>

<style scoped>
    .card-login {
        margin-top: 10%;
    }

    .base-page-login {
        background: #3F547C;
    }
</style>
