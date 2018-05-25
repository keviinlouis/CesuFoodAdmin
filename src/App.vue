<template>
    <div id="app">
        <router-view></router-view>
        <v-snackbar
                :timeout="toast.timeout"
                :top="toast.top"
                :bottom="toast.bottom"
                :right="toast.right"
                :left="toast.left"
                v-model="toast.show"
        >
            {{ toast.text }}
            <v-btn flat color="red" @click.native="toogleToast">Fechar</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapGetters({
        toast: 'utils/getToast'
      })
    },
    methods: {
      ...mapActions({
        toogleToast: 'utils/toogleToast'
      })
    }
  }
</script>

<style>

</style>
