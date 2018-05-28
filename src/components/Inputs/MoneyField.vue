<template>
    <v-text-field type="text"
                  v-mask="'money'"
                  v-model.lazy="price"
                  :label="label"
                  :error-messages="errorMessages"
                  @keyup="updateValor"
    />
</template>

<script>
  import AwesomeMask from 'awesome-mask'
  export default {
    name: 'MoneyField',
    directives: {
      'mask': AwesomeMask
    },
    data () {
      return {
        price: 0,
        updated: false
      }
    },
    methods: {
      updateValor () {
        this.$emit('input', this.price.toFloatNumber())
      }
    },
    props: ['value', 'disabled', 'label', 'errorMessages'],
    watch: {
      value (value) {
        if (!this.updated && value && value.formatMoney(2, ',', '.') !== this.price) {
          this.updated = true
          this.price = value.formatMoney(2, ',', '.')
        }
      }
    }
  }
</script>

<style scoped>

</style>
