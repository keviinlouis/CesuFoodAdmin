<template>
    <v-card>
        <v-card-text>
            <v-form>
                <v-layout row wrap>
                    <v-flex>
                        <qrcode-reader @init="onInit"  @decode="onDecode" :paused="paused" />
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
  import { QrcodeReader } from 'vue-qrcode-reader'
  export default {
    name: 'LerQrCode',
    components: { QrcodeReader },
    data () {
      return {
        paused: false
      }
    },
    methods: {
      onDecode (content) {
        this.paused = true
        this.$router.push('/vender/' + content.split('/').last())
      },
      async onInit (promise) {
        // show loading indicator

        try {
          await promise

          // successfully initialized
        } catch (error) {
          if (error.name === 'NotAllowedError') {
            // user denied camera access permisson
          } else if (error.name === 'NotFoundError') {
            // no suitable camera device installed
          } else if (error.name === 'NotSupportedError') {
            // page is not served over HTTPS (or localhost)
          } else if (error.name === 'NotReadableError') {
            // maybe camera is already in use
          } else if (error.name === 'OverconstrainedError') {
            // passed constraints don't match any camera. Did you requested the front camera although there is none?
          } else {
            // browser is probably lacking features (WebRTC, Canvas)
          }
        } finally {
          // hide loading indicator
        }
      }
    }
  }
</script>

<style scoped>

</style>
