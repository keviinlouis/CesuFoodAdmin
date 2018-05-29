<template>
    <Dropzone
            ref="dropzoneInput"
            id="dropzone"
            :options="dropzoneOptions"
            v-on:vdropzone-success="uploaded"
            v-on:vdropzone-removed-file="removed"/>
</template>

<script>
  import Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'
  import axios from 'axios'
  import {URL_API} from '../../config'

  export default {
    name: 'DropzoneComponent',
    components: {
      Dropzone
    },
    props: ['fotos', 'maxFiles', 'width', 'height', 'remove'],
    data () {
      return {
        dropzoneOptions: {
          url: URL_API + '/api/uploadTmp',
          thumbnailWidth: this.width,
          thumbnailHeight: this.height,
          maxFilesize: 20,
          maxFiles: this.maxFiles ? this.maxFiles : 0,
          addRemoveLinks: this.remove,
          dictDefaultMessage: 'Arraste os arquivos ou clique aqui para inserir os arquivos',
          dictCancelUpload: 'Cancelar Upload',
          dictRemoveFile: 'Remover'
        },
        fotos_adicionadas: [],
        fotos_removidas: []
      }
    },
    methods: {
      uploaded (file, response) {
        let foto = {fileName: file.name, realName: response.data}
        this.fotos_adicionadas.push(foto)
        this.updateFotos()
      },
      removed (file, error, xhr) {
        let imagem = this.fotos.find(x => x.search(file.name) !== -1)
        if (!imagem && imagem.search('imagem') >= 0) {
          let fotoAdicionada = this.fotos_adicionadas.findBy('fileName', file.name)
          axios.delete(URL_API + '/api/removeTmp/' + fotoAdicionada.realName)
          let fotoAdicionadaIndex = this.fotos_adicionadas.findIndexBy('fileName', file.name)
          this.fotos_adicionadas.splice(fotoAdicionadaIndex, 1)
          this.updateFotos()
          return
        }
        this.fotos_removidas.push(imagem.last())
        this.updateFotos()
      },
      addFotosFromUrl (url) {
        if (url.search('imagem') >= 0) {
          return
        }
        let filename = url.split('/')
        let file = {size: 123, name: filename.last(), isFromUrl: true}
        this.$refs.dropzoneInput.manuallyAddFile(file, url)
      },
      addFotosFromArrayOfUrl (array) {
        array.forEach(v => this.addFotosFromUrl(v))
      },
      updateFotos () {
        this.$emit('update', {fotosAdicionadas: this.fotos_adicionadas.map(x => x.realName), fotosRemovidas: this.fotos_removidas})
      }
    },
    watch: {
      fotos (value) {
        console.log(value)
        this.addFotosFromArrayOfUrl(value)
      }
    }
  }
</script>

<style>
    .dz-details {
        background-color: gray !important;
    }

    .dropzone .dz-preview .dz-image {
        z-index: 0;
    }
</style>
