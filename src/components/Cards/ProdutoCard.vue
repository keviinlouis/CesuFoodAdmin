<template>
    <v-card>
        <v-card-media height="180px" @click="verProduto(produto.id)" class="card-produto-imagem">
            <v-carousel style="height: 180px" hide-controls>
                <v-carousel-item v-for="(foto,i) in produto.fotos" :src="foto" :key="i"></v-carousel-item>
            </v-carousel>
        </v-card-media>
        <v-card-title>
            {{produto.nome}}<br/>
           {{'R$ ' + produto.valor.formatMoney(2, ',')}}
        </v-card-title>
        <v-card-actions>
            <v-switch
                    label="Ativo"
                    v-model="produto.status"
                    :false-value="0"
                    :true-value="1"
                    :input-value="produto.status"
                    @click="toogleProdutoStatus(produto.id)"
                    :disabled="loadingToogle"
            />
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
      verProduto (id) {
        console.log(id)
      },
      toogleProdutoStatus (id) {
        this.loadingToogle = true
        this.$store.dispatch('produtos/updateProduto', {id, status: !this.produto.status})
          .finally(() => { this.loadingToogle = false })
      }
    }
  }
</script>

<style scoped>

</style>
