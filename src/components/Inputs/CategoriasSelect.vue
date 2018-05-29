<template>
    <v-select
            :items="categorias"
            :label="label ? label : 'Categoria'"
            :name="name"
            single-line
            item-value="id"
            item-text="nome"
            :loading="categorias.length <= 0"
            :disabled="categorias.length <= 0 || disabled"
            color="accent"
            autocomplete
            :clearable="clearable"
            :value="value"
            :error-messages="errorMessages"
            @input="updateCategoria"
    />
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'CategoriasSelect',
    props: ['value', 'disabled', 'clearable', 'errorMessages', 'name', 'label'],
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
      this.$store.dispatch('categorias/loadCategorias', {limit: 0})
    }
  }
</script>

<style scoped>

</style>
