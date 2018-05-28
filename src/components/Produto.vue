<template>
    <v-card>
        <v-card-text>
            <v-layout row>
                <v-flex md6 sm12 xs12 lg4 class="input-field">
                    <v-text-field type="text"
                                  name="nome"
                                  v-model="produto.nome"
                                  label="Nome"
                                  v-validate="'required|min:3'"
                                  :error-messages="errors.first('nome')?errors.first('nome'):[]"
                    />
                </v-flex>
                <v-flex md2 sm12 xs12 lg4 class="input-field">
                   <MoneyField v-model="produto.valor"
                               label="Preço"
                               name="preco"
                               :value="produto.valor"
                               v-validate="{required: true}"
                               :error-messages="errors.first('preco')?errors.first('preco'):[]"
                   />
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
  import MoneyField from './Inputs/MoneyField'

  export default {
    name: 'Produto',
    components: {MoneyField},
    data () {
      return {
        produto: {
          nome: '',
          valor: 0
        }
      }
    },
    methods: {
    },
    watch: {
      'produto.valor' (value) {
        console.log(value)
        if (!value) {
          this.errors.add('preco', 'Valor do produto não pode ser zero')
        } else {
          this.errors.remove('preco')
          this.produto.valor = value
        }
      }
    },
    created () {
      this.$store.dispatch('produtos/loadProduto', this.$router.currentRoute.params.id).then(() => {
        this.produto = this.$store.getters['produtos/getProduto']
      })
    },
    destroyed () {
      this.$store.commit('produtos/setProduto', {})
    }
  }
</script>

<style scoped>
    .input-field{
        padding: 5px;
    }
</style>
