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
  export default {
    name: 'Produtos',
    data () {
      return {
        procurar: '',
        produtos: [
          {
            id: 1,
            fotos: [
              'https://abrilmdemulher.files.wordpress.com/2016/09/receita-suco-laranja-beterraba-cenoura.jpg?quality=90&strip=info&w=620&h=372&crop=1',
              'https://static.vix.com/pt/sites/default/files/styles/large/public/bdm/suco-dieta-corpo-celulite-receita-inchaco.jpg?itok=GlnKf9gb',
              'https://semprevivaalimentos.com.br/wp-content/uploads/2017/02/suco-4.jpg'
            ],
            nome: 'Suco',
            ativo: true,
            valor: 4.5
          }
        ]
      }
    },
    methods: {
      verProduto (id) {
        console.log(id)
      },
      toogleProdutoStatus (id) {
        console.log(id)
      }
    }
  }
</script>

<style scoped>
 .card-produto-imagem{
     cursor: pointer;
 }
</style>
