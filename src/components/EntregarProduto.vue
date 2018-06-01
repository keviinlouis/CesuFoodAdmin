<template>
    <v-container>
        <v-layout align-center>
            <v-flex color="grey lighten-2">
                <h3 class="display-3">Entregar Produto</h3>
                <Viewer :images="clienteProduto.produto.fotos" :options="viewer" @inited="inited" ref="viewer">
                    <template slot-scope="scope">
                        <img v-for="src in clienteProduto.produto.fotos" :src="src" :key="src" class="foto">
                    </template>
                </Viewer>
                <div class="subheading" v-if="!loading" style="padding-left: 5px">
                    <a @click="goToProduto">{{clienteProduto.produto.nome}}</a> para {{clienteProduto.cliente.email}}
                </div>
                <v-divider class="my-3"></v-divider>
                <v-btn large color="gray" class="mx-0" flat @click="goToProdutos()">voltar</v-btn>
                <v-btn large color="accent" class="mx-0" :loading="loading" :disabled="loading" @click="entregar()">
                    entregar
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import {URL_API} from '../config'
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer/src/component.vue'

  export default {
    name: 'EntregarProduto',
    components: {
      Viewer
    },
    data () {
      return {
        loading: false,
        viewer: {
          inline: false,
          button: true,
          navbar: true,
          title: false,
          toolbar: false,
          tooltip: false,
          movable: true,
          zoomable: true,
          rotatable: false,
          scalable: false,
          transition: true,
          fullscreen: false,
          keyboard: true,
          url: 'data-source'
        },
        clienteProduto: {
          id: 0,
          valor: 0,
          status: 0,
          status_label: '',
          produto: {
            id: 0,
            nome: '',
            valor: 0,
            descricao: '',
            status: 0,
            categoria: {
              id: 0,
              nome: ''
            },
            fotos: []
          },
          cliente: {
            id: 0,
            email: '',
            ra: '',
            foto_perfil: URL_API + '/assets/images/imagem-perfil.jpg',
            created_at: '',
            status: null,
            status_label: ''
          }
        }
      }
    },
    methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      show () {
        this.$viewer.show()
      },
      goToProdutos () {
        this.$router.push({name: 'produtos'})
      },
      goToProduto () {
        this.$router.push({name: 'produto', params: {id: this.clienteProduto.produto.id}})
      },
      entregar () {
        this.loading = true
        this.$store.dispatch('produtos/entregarProduto', this.$router.currentRoute.params.hash)
          .then(() => {
            this.goToProdutos()
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    created () {
      this.loading = true
      this.$store.dispatch('produtos/loadClienteProduto', this.$router.currentRoute.params.hash)
        .then((clienteProduto) => {
          this.clienteProduto = clienteProduto
        })
        .catch(() => {
          this.$router.push({name: 'dashboard'})
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
</script>

<style scoped>
    .foto {
        height: 100px;
        width: 100px;
        cursor: pointer;
        margin: 5px;
    }
</style>
