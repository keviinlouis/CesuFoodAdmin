<template>
    <v-select
            :items="categorias"
            label="Categoria"
            single-line
            item-value="id"
            item-text="nome"
            :loading="categorias.length <= 0"
            :disabled="categorias.length <= 0"
            color="accent"
            autocomplete
            clearable
            @input="updateCategoria"
    ></v-select>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'CategoriasSelect',
    props: ['value'],
    methods: {
      ...mapActions({
        loadCategorias: 'categorias/loadCategorias'
      }),
      updateCategoria (categoria) {
        this.$emit('input', categoria)
      }
    },
    computed: {
      ...mapGetters({
        categorias: 'categorias/getCategorias'
      })
    },
    created () {
      if (this.categorias.length <= 0) {
        this.$store.dispatch('categorias/loadCategorias', {limit: 0})
      }
    }
  }
</script>

<style scoped>

</style>
