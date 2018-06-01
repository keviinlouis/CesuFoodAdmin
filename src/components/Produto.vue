<template>
    <v-card>
        <v-card-text>
            <v-layout row wrap>
                <v-flex md6 sm12 class="inputs-group">
                    <v-layout row wrap>
                        <v-flex md12 sm12 xs12 lg12 class="input-field">
                            <v-text-field type="text"
                                          name="nome"
                                          v-model="produto.nome"
                                          label="Nome"
                                          v-validate="'required|min:3'"
                                          :error-messages="errors.first('nome')?errors.first('nome'):[]"
                            />
                        </v-flex>
                        <v-flex md6 sm12 xs12 lg4 class="input-field" style="padding-top: 20px">
                            <v-switch
                                    label="Ativo"
                                    v-model="produto.status"
                                    :false-value="0"
                                    :true-value="1"
                                    :input-value="produto.status"
                            />
                        </v-flex>
                        <v-flex md6 sm12 xs12 lg4 class="input-field">
                            <MoneyField v-model="produto.valor"
                                        label="Valor"
                                        name="valor"
                                        v-validate="{required: true, not_in:0}"
                                        :error-messages="errors.first('valor') ? errors.first('valor') : []"
                            />
                        </v-flex>
                        <v-flex md12 sm12 xs12 lg12 class="input-field">
                            <CategoriasSelect v-model="produto.categoria.id"
                                              label="Selecione uma categoria"
                                              name="categoria"
                                              v-validate="{required: true, not_in: 0}"
                                              :error-messages="errors.first('categoria') ? errors.first('categoria') : []"

                            />
                        </v-flex>
                        <v-flex md12 sm12 xs12 lg12 class="input-field">
                            <v-text-field type="text"
                                          name="descricao"
                                          multi-line
                                          v-model="produto.descricao"
                                          label="Descrição"
                                          v-validate="'required|min:10'"
                                          :error-messages="errors.first('descricao')?errors.first('descricao'):[]"
                            />
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md6 class="input-foto">
                    <DropzoneComponent
                            ref="dropzone"
                            :fotos="produto.fotos"
                            :width="150"
                            :height="150"
                            :remove="true"
                            v-on:update="updateFotos"
                            v-on:uploading="uploading"
                            validation="required|min:10"
                            v-on:validate="validateFotos"
                            :error-messages="errors.first('fotos')?errors.first('fotos'):[]"
                    />

                </v-flex>
                <v-flex md12>
                    <v-btn flat color="gray" @click="$router.back()">Voltar</v-btn>
                    <v-btn color="accent"
                           @click="validate()"
                           :loading="loading"
                           :disabled="loading"
                    >Salvar
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
  import MoneyField from './Inputs/MoneyField'
  import CategoriasSelect from './Inputs/CategoriasSelect'
  import DropzoneComponent from './Inputs/DropzoneComponent'

  export default {
    name: 'Produto',
    components: {CategoriasSelect, MoneyField, DropzoneComponent},
    data () {
      return {
        loading: false,
        fotos_uploading: 0,
        produto: {
          nome: '',
          valor: 0,
          descricao: '',
          status: 0,
          categoria: {
            id: 0
          },
          fotos: []
        },
        fotos_adicionadas: [],
        fotos_removidas: []
      }
    },
    methods: {
      uploading () {
        this.loading = true
        this.fotos_uploading++
      },
      validateFotos (messages) {
        let result = true
        this.errors.remove('fotos')
        if (messages && messages.length) {
          this.$validator.errors.add('fotos', messages)
          result = false
        }
        if (result && this.fotos_adicionadas.length <= 0 && this.fotos_removidas.length >= this.produto.fotos.length) {
          this.validateFotos('Insira pelo menos uma foto')
          result = false
        }
        return result
      },
      updateFotos ({fotosAdicionadas, fotosRemovidas}) {
        this.fotos_adicionadas = fotosAdicionadas
        this.fotos_removidas = fotosRemovidas
        this.fotos_uploading--
        if (this.fotos_uploading <= 0) {
          this.loading = false
        }
        this.validateFotos()
      },
      loadProduto (id) {
        this.$store.dispatch('produtos/loadProduto', id).then(() => {
          this.produto = this.$store.getters['produtos/getProduto']
        })
      },
      validate () {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            this.validateFotos()
            return
          }
          if (!this.validateFotos()) {
            return
          }
          this.saveProduto()
        })
      },
      saveProduto () {
        let produto = {
          nome: this.produto.nome,
          valor: this.produto.valor,
          descricao: this.produto.descricao,
          status: this.produto.status,
          categoria_id: this.produto.categoria.id
        }
        if (this.produto.id) {
          produto.id = this.produto.id
          produto.fotos_adicionadas = this.fotos_adicionadas
          produto.fotos_removidas = this.fotos_removidas
        } else {
          produto.fotos = this.fotos_adicionadas
        }
        this.loading = true
        this.$store.dispatch('produtos/saveProduto', produto)
          .then(() => {
            this.$router.push({name: 'produtos'})
          })
          .catch((error) => {
            if (error.hasInput('nome')) {
              this.$validator.errors.add('nome', error.getMessageFromInput('nome'))
            }
            if (error.hasInput('valor')) {
              this.$validator.errors.add('valor', error.getMessageFromInput('valor'))
            }
            if (error.hasInput('descricao')) {
              this.$validator.errors.add('descricao', error.getMessageFromInput('descricao'))
            }
            if (error.hasInput('categoria_id')) {
              this.$validator.errors.add('categoria', error.getMessageFromInput('categoria_id'))
            }
            if (error.hasInput('fotos')) {
              this.$validator.errors.add('fotos', error.getMessageFromInput('fotos'))
            } else if (error.hasInput('fotos_adicionadas')) {
              this.$validator.errors.add('fotos', error.getMessageFromInput('fotos_adicionadas'))
            } else if (error.hasInput('fotos_removidas')) {
              this.$validator.errors.add('fotos', error.getMessageFromInput('fotos_removidas'))
            }
          })
          .finally(() => {
            this.loading = false
          })
      },
      clearProduto () {
        // this.$refs.dropzone.clearFotos()
        this.fotos_removidas = []
        this.fotos_adicionadas = []
        this.produto = {
          nome: '',
          valor: 0,
          descricao: '',
          status: 0,
          categoria: {
            id: 0
          },
          fotos: []
        }
        this.errors.remove('fotos')
      }
    },
    watch: {
      'produto.valor' (value) {
        if (!value) {
          this.errors.add('preco', 'Valor do produto não pode ser zero')
        } else {
          this.errors.remove('preco')
          this.produto.valor = value
        }
      }
    },
    created () {
      if (this.$router.currentRoute.params.id) {
        this.loadProduto(this.$router.currentRoute.params.id)
      }
    },
    destroyed () {
      this.clearProduto()
    }
  }
</script>

<style scoped>
    .input-field {
        padding: 5px;
    }

    .input-foto {
        padding: 0 20px;
    }

    .inputs-group {
        padding: 0 20px;
        max-height: 430px;
    }
</style>
