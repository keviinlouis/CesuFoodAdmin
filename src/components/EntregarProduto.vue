<template>
    <v-card>
        <v-card-text>
            <v-form>
                <v-layout row wrap>
                    <v-flex>
                        {{clienteProduto.status_label}}
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'Dashboard',
    data () {
      return {
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
              id: 0
            },
            fotos: []
          }
        }
      }
    },
    methods: {
      ...mapActions({
        entregar: 'produtos/entregarProduto'
      })
    },
    created () {
      this.$store.dispatch('produtos/loadClienteProduto', this.$router.currentRoute.params.hash)
        .then((clienteProduto) => {
          this.clienteProduto = clienteProduto
        })
        .catch(() => {
          this.$router.push({name: 'dashboard'})
        })
    }
  }
</script>

<style scoped>

</style>
