<template>
    <v-card v-scroll="onScroll">
        <v-card-text>
            <v-layout row wrap class="filtros">
                <v-flex md3>
                    <CategoriasSelect v-model="query.categoria"></CategoriasSelect>
                </v-flex>
                <v-flex md3>
                    <v-select
                            :items="sort"
                            v-model="query.sort"
                            label="Campo"
                            single-line
                            item-value="value"
                            item-text="text"
                            color="accent"
                    ></v-select>
                </v-flex>
                <v-flex md3>
                    <v-select
                            :items="ordens"
                            v-model="query.order"
                            label="Ordem"
                            single-line
                            item-value="value"
                            item-text="text"
                            color="accent"
                    ></v-select>
                </v-flex>
                <v-flex md3>
                    <v-spacer></v-spacer>
                    <v-text-field prepend-icon="search"
                                  label="Procurar"
                                  v-model="query.search"
                                  color="accent"
                                  type="text">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row justify-center v-if="produtos.length <= 0 && loading">
                <v-flex md1>
                    <v-progress-circular :indeterminate="true"></v-progress-circular>
                </v-flex>
            </v-layout>
            <v-layout row justify-center v-else-if="produtos.length <= 0 && !loading">
                <v-flex md12>
                    <v-alert :value="true" color="accent">
                        Sem itens para mostrar
                    </v-alert>

                </v-flex>
            </v-layout>
            <v-layout row wrap v-else>
                <v-flex lg2 md4 sm6 xs12 v-for="produto in produtos" :key="produto.id" class="card-produto">
                    <ProdutoCard :produto="produto"></ProdutoCard>
                </v-flex>
            </v-layout>
            <v-layout row justify-center v-if="loadingPage">
                <v-flex md1>
                    <v-progress-circular :indeterminate="true"></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ProdutoCard from './Cards/ProdutoCard'
  import CategoriasSelect from './Inputs/CategoriasSelect'
  import _ from 'lodash'

  export default {
    name: 'Produtos',
    components: {CategoriasSelect, ProdutoCard},
    data: function () {
      return {
        loading: true,
        offsetTop: 0,
        ordens: [
          {
            text: 'Crescente',
            value: 'asc'
          },
          {
            text: 'Decrescente',
            value: 'desc'
          }
        ],
        sort: [
          {
            text: 'Criação',
            value: 'created_at'
          },
          {
            text: 'Valor',
            value: 'valor'
          },
          {
            text: 'Nome',
            value: 'nome'
          }
        ],
        page: 1,
        lastPage: null,
        loadingPage: false,
        query: {
          sort: 'nome',
          order: 'asc',
          categoria: null,
          valor: 0,
          search: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        produtos: 'produtos/getProdutos'
      })
    },
    methods: {
      onScroll () {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        let diff = (document.documentElement.scrollHeight - this.offsetTop) * -1
        if (diff <= 200 && !this.loadingPage && this.page < this.lastPage) {
          this.loadingPage = true
          this.page = this.page + 1
          this.loadMoreProdutos(true)
        }
      },
      loadProdutos () {
        this.loading = true
        this.page = 1
        this.$store.dispatch('produtos/loadProdutos', this.query)
          .then((result) => {
            this.query.page = result.meta.current_page
            this.lastPage = result.meta.last_page
          })
          .finally(() => {
            this.loading = false
            this.loadingPage = false
          })
      },
      loadMoreProdutos () {
        this.loading = true
        let params = this.query
        params.page = this.page
        this.$store.dispatch('produtos/loadMoreProdutos', params)
          .then((result) => {
            this.query.page = result.meta.current_page
            this.lastPage = result.meta.last_page
          })
          .finally(() => {
            this.loading = false
            this.loadingPage = false
          })
      }
    },
    watch: {
      query: {
        handler (val) {
          this.debounceSearch()
        },
        deep: true
      }
    },
    created () {
      this.loadProdutos()
      this.debounceSearch = _.debounce(() => {
        this.loadProdutos()
      }, 300)
    }
  }
</script>

<style>
    .carousel__controls {
        height: 28px !important;
    }

    .filtros {
        padding: 0 16px;
    }

    .filtros .flex {
        padding: 0 5px;
    }

    .card-produto {
        padding: 16px;
    }

    .card-produto-imagem {
        cursor: pointer;
    }
</style>
