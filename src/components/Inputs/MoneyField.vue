<template>
    <v-text-field type="text"
                  :name="name"
                  v-mask="'money'"
                  v-model.lazy="price"
                  :label="label"
                  :error-messages="errorMessages"
                  @input="updateValor"
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
        price: '0,00',
        updated: false
      }
    },
    methods: {
      updateValor () {
        this.updated = true
        this.$emit('input', this.price.toFloatNumber())
      }
    },
    props: ['value', 'disabled', 'label', 'errorMessages', 'name'],
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
