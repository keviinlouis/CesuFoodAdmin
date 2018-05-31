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
                                                  v-model="loginForm.email"
                                                  v-validate="'required|email'"
                                                  @keyup.enter="login"
                                                  :error-messages="errors.first('login.email')?errors.first('login.email'):[]"
                                                  type="email">
                                    </v-text-field>
                                    <v-text-field prepend-icon="lock"
                                                  id="senha"
                                                  name="senha"
                                                  label="Senha"
                                                  v-model="loginForm.senha"
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
                                       :loading="loginForm.loading"
                                       @click.native="loader = 'loginForm.loading'"
                                       :disabled="loginForm.loading">
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
                                      v-model="esqueciSenhaForm.email"
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
                           :loading="esqueciSenhaForm.loading"
                           @click.native="loader = 'esqueciSenhaForm.loading'"
                           :disabled="esqueciSenhaForm.loading">
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
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          email: '',
          senha: '',
          loading: false
        },
        esqueciSenhaForm: {
          email: '',
          loading: false
        },
        logo: Logo,
        emailEnviadoDialog: false,
        senhaDialog: false
      }
    },
    computed: {
      ...mapGetters({
        nextUrl: 'utils/getNextUrl'
      })
    },
    methods: {
      ...mapActions({
        esqueciSenha: 'auth/esqueciSenha',
        sendLogin: 'auth/login'
      }),
      enviarEmailRecuperarSenha () {
        this.esqueciSenhaForm.loading = true
        this.errors.remove('esqueci-senha.email')
        this.$validator.validateAll('esqueci-senha').then((result) => {
          if (!result) {
            this.esqueciSenhaForm.loading = false
            return false
          }
          this.esqueciSenha(this.esqueciSenhaForm.email).then(() => {
            this.emailEnviadoDialog = true
            this.senhaDialog = false
          }).catch((error) => {
            if (error.hasInput('email')) {
              this.$validator.errors.add('esqueci-senha.email', error.getMessageFromInput('email'))
            }
          }).finally(() => {
            this.esqueciSenhaForm.loading = false
          })
        })
      },
      login: function () {
        this.loginForm.loading = true
        this.errors.clear()
        this.$validator.validateAll('login').then((result) => {
          if (!result) {
            this.loginForm.loading = false
            return false
          }
          this.sendLogin({email: this.loginForm.email, senha: this.loginForm.senha}).then(() => {
            if (this.nextUrl) {
              this.$router.push(this.nextUrl)
              return
            }
            this.$router.push({name: 'dashboard'})
          }).catch((error) => {
            if (error.getCode() !== 400) {
              return
            }

            if (error.hasInput('email')) {
              this.$validator.errors.add('login.email', error.getMessageFromInput('email'))
            }

            if (error.hasInput('senha')) {
              this.$validator.errors.add('login.senha', error.getMessageFromInput('senha'))
            }
          }).finally(() => {
            this.loginForm.loading = false
          })
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
