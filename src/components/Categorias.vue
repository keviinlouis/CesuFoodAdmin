<template>
    <div>
        <v-btn @click="criarCategoria" color="accent" dark class="mb-2">Nova Categoria</v-btn>
        <v-dialog v-model="dialog.show" max-width="500px">

            <v-card>
                <v-card-title>
                    <span class="headline">{{ dialog.title }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="dialog.categoria.nome"
                                              label="Nome"
                                              name="nome"
                                              @keyup.enter="salvar"
                                              v-validate="'required|min:3'"
                                              :error-messages="errors.first('nome') ? errors.first('nome') : []"
                                />
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="gray" flat @click.native="dialog.show = false">Voltar</v-btn>
                    <v-btn color="accent " :loading="dialog.loading" :disabled="dialog.loading" @click="salvar">Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table
                :headers="headers"
                :items="categorias"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-left"> {{ props.item.nome}}</td>
                <td class="text-xs-left hidden-xs-only">{{ parseInt(props.item.produtos_count) }}</td>
                <td class="text-xs-left hidden-xs-only">{{ parseInt(props.item.clientes_produtos_count) }}</td>
                <td class="text-xs-right">
                    <v-btn icon class="mx-0" @click="editarCategoria(props.item)">
                        <v-icon color="dark">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" :disabled="loading" @click="removerCategoria(props.item)">
                        <v-icon color="red">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </div>

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Categorias',
    computed: {
      ...mapGetters({
        categorias: 'categorias/getCategorias'
      }),
      headers () {
        let headers = [
          {text: 'Nome', value: 'nome'}
        ]
        if (this.$vuetify.breakpoint.name !== 'xs') {
          headers.push({text: 'Produtos', value: 'produtos_count', align: 'left'})
          headers.push({text: 'Produtos Vendidos', value: 'clientes_produtos_count', align: 'left'})
        }

        headers.push({text: 'Ações', sortable: false, align: 'right'})

        return headers
      }
    },
    methods: {
      criarCategoria () {
        this.dialog.show = true
        this.dialog.title = 'Nova Categoria'
        this.dialog.categoria = {
          id: 0,
          nome: ''
        }
      },
      editarCategoria (categoria) {
        this.dialog.show = true
        this.dialog.title = 'Editar Categoria'
        this.dialog.categoria = categoria
      },
      salvar () {
        this.dialog.loading = true
        this.$validator.validateAll()
          .then((result) => {
            if (!result) {
              throw new Error()
            }
            return this.$store.dispatch('categorias/salvarCategoria', this.dialog.categoria)
          })
          .then(() => {
            this.dialog.show = false
          })
          .finally(() => {
            this.dialog.loading = false
          })
      },
      removerCategoria (categoria) {
        this.loading = true
        this.$store.dispatch('categorias/deleteCategoria', categoria).finally(() => { this.loading = false })
      }
    },
    data () {
      return {
        loading: false,
        dialog: {
          show: false,
          loading: false,
          title: 'Nova Categoria',
          categoria: {
            id: 0,
            nome: ''
          }
        }
      }
    },
    created () {
      this.loading = true
      this.$store.dispatch('categorias/loadCategorias', {
        limit: 0,
        count_produtos: true,
        count_produtos_vendidos: true
      }).finally(() => {
        this.loading = false
      })
    }
  }
</script>

<style scoped>

</style>
