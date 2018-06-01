<template>
    <v-card>
        <v-card-media height="180px" class="card-produto-imagem">
            <v-carousel style="height: 180px" hide-controls>
                <v-carousel-item v-for="(foto,i) in produto.fotos" :src="foto" :key="i" @click="verProduto()"/>
            </v-carousel>

        </v-card-media>
        <v-card-title primary-title>
            <div class="card-text-item card-text-title">
                <span class="headline mb-2">{{produto.nome}}</span>
            </div>
            <div class="card-text-item">
                <span><b>Valor: </b>{{'R$ ' + produto.valor.formatMoney(2, ',')}}</span>
            </div>
            <div class="card-text-item">
                <span><b>Categoria: </b>{{produto.categoria.nome}}</span>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-spacer/>
            <v-btn
                    flat
                    fab
                    dark
                    color="red"
                    @click="removerProduto()"
            >
                <v-icon>delete</v-icon>
            </v-btn>
            <v-btn
                    flat
                    fab
                    dark
                    color="dark"
                    @click="verProduto()"
            >
                <v-icon>edit</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'ProdutoCard',
    props: ['produto'],
    data () {
      return {
        loadingToogle: false
      }
    },
    methods: {
      verProduto () {
        this.$router.push({name: 'produto', params: {id: this.produto.id}})
      },
      toogleProdutoStatus () {
        this.loadingToogle = true
        this.$store.dispatch('produtos/updateProduto', {id: this.produto.id, status: !this.produto.status})
          .finally(() => {
            this.loadingToogle = false
          })
      }
    }
  }
</script>

<style scoped>
    .card-text-item {
        width: 100%;
    }

    .card-text-title {
        min-height: 61px;
    }
</style>
