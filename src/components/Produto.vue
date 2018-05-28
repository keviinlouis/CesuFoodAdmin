<template>
    <v-card>
        <v-card-text>
            <v-form>
            <v-layout row wrap>
                <v-flex md6 sm12 class="inputs-group">
                    <v-layout row wrap>
                        <v-flex md12 sm12 xs12 lg4 class="input-field">
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
                        <v-flex md6 sm12 xs12 lg1 class="input-field">
                            <MoneyField v-model="produto.valor"
                                        label="Valor"
                                        name="valor"
                                        :value="produto.valor"
                                        v-validate="{required: true}"
                                        :error-messages="errors.first('valor')?errors.first('valor'):[]"
                            />
                        </v-flex>
                        <v-flex md12 sm12 xs12 lg4 class="input-field">
                            <CategoriasSelect v-model="produto.categoria.id"
                                              data-vv-name="categoria"
                                              :error-messages="errors.first('categoria')?errors.first('categoria'):[]"

                            />
                        </v-flex>
                        <v-flex md12 sm12 xs12 lg4 class="input-field">
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
                <v-flex md6 class="inputs-group">
                    <DropzoneComponent
                            ref="dropzone"
                            :fotos="produto.fotos"
                            :width="150"
                            :height="150"
                            :maxFiles="3"
                            :remove="true"
                            v-on:update="updateFotos"
                    />
                </v-flex>
                <v-flex md12>
                    <v-btn flat colo="gray">Voltar</v-btn>
                    <v-btn color="accent" @click="saveProduto()">Salvar</v-btn>
                </v-flex>
            </v-layout>
            </v-form>
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
      updateFotos ({fotosAdicionadas, fotosRemovidas}) {
        this.fotos_adicionadas = fotosAdicionadas
        this.fotos_removidas = fotosRemovidas
      },
      loadProduto (id) {
        this.$store.dispatch('produtos/loadProduto', id).then(() => {
          this.produto = this.$store.getters['produtos/getProduto']
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

        this.$store.dispatch('produtos/saveProduto', produto)
          .then()
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
      this.$store.commit('produtos/setProduto', {})
    }
  }
</script>

<style scoped>
    .input-field {
        padding: 5px;
    }
    .inputs-group {
        padding: 0 20px;
    }
</style>
