<template>
    <v-card>
        <v-card-text>
            <v-layout row wrap>
                <v-flex offset-md8 md4>
                    <v-spacer></v-spacer>
                    <v-text-field prepend-icon="search"
                                  label="Procurar"
                                  v-model="procurar"
                                  color="accent"
                                  type="text">
                    </v-text-field>
                </v-flex>
                <v-flex md3 sm6 xs12 v-for="produto in produtos" :key="produto.id">
                    <v-card>
                        <v-card-media height="180px" @click="verProduto(produto.id)" class="card-produto-imagem">
                            <v-carousel style="height: 180px" hide-controls>
                                <v-carousel-item v-for="(foto,i) in produto.fotos" :src="foto" :key="i"></v-carousel-item>
                            </v-carousel>
                        </v-card-media>
                        <v-card-title>
                            {{produto.nome + ' - R$ ' + produto.valor.formatMoney(2, ',')}}
                        </v-card-title>
                        <v-card-actions>
                            <v-switch
                                    label="Ativo"
                                    v-model="produto.ativo"
                                    @click="toogleProdutoStatus(produto.id)"
                            />
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'Produtos',
    data () {
      return {
        procurar: '',
        patinator: {

        }
      }
    },
    computed: {
      ...mapGetters({
        produtos: 'produtos/getProdutos'
      })
    },
    methods: {
      ...mapActions({
        loadProdutos: 'produtos/loadProdutos'
      }),
      verProduto (id) {
        console.log(id)
      },
      toogleProdutoStatus (id) {
        console.log(id)
      }
    },
    created () {
      this.loadProdutos()
    }
  }
</script>

<style scoped>
 .card-produto-imagem{
     cursor: pointer;
 }
</style>
