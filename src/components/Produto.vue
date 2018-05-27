<template>

</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'Produto',
    computed: {
      ...mapGetters({
        produto: 'produtos/getProduto'
      })
    },
    created () {
      this.$store.dispatch('produtos/loadProduto', this.$router.currentRoute.params.id)
    }
  }
</script>

<style scoped>

</style>
