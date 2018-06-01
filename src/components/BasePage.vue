<template>
    <v-app id="inspire">
        <v-navigation-drawer fixed v-model="drawer" app>
            <v-list dense>
                <div class="logo">
                    <img :src="logo" alt="logo"/>
                </div>
                <v-list-tile @click="routePush(menu.route)" v-for="(menu, key) in menus" :key="key"
                             :color="getColorByRoute(menu.route)" v-if="!menu.master || (menu.master && isAdmin)">
                    <v-list-tile-action>
                        <v-icon :color="getColorByRoute(menu.route)">{{menu.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{menu.label}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="primary" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>{{pageName()}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click.stop="routePush('ler-qr-code')"> <v-icon>photo_camera</v-icon> </v-toolbar-side-icon>
            <v-menu offset-y left transition="slide-x-transition">
                <v-btn slot="activator" flat icon>
                    <v-icon>settings</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile @click="logout()">
                        <v-list-tile-action>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>
                            Sair
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout row wrap>
                    <v-flex md12 sm12>
                        <transition>
                            <router-view/>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  import Logo from '@/assets/logo.png'
  import {mapGetters} from 'vuex'
  export default {
    name: 'BasePage',
    data () {
      return {
        drawer: false,
        logo: Logo,
        menus: [
          {
            icon: 'dashboard',
            label: 'Dashboard',
            route: 'dashboard',
            master: false
          },
          {
            icon: 'list',
            label: 'Produtos',
            route: 'produtos',
            master: false
          },
          {
            icon: 'group_work',
            label: 'Categorias',
            route: 'categorias',
            master: false
          },
          {
            icon: 'photo_camera',
            label: 'Ler QrCode',
            route: 'ler-qr-code',
            master: false
          },
          {
            icon: 'people',
            label: 'Funcionários',
            route: 'funcionarios',
            master: true
          }
        ]
      }
    },
    methods: {
      routePush (route) {
        this.$router.push({name: route})
      },
      pageName () {
        return this.$router.currentRoute.name.toUpperCase().replaceAll('-', ' ')
      },
      getColorByRoute (name) {
        return this.$router.currentRoute.name === name ? 'dark' : 'gray'
      },
      logout () {
        this.$store.dispatch('auth/logout')
        this.$router.push({name: 'login'})
      }
    },
    computed: {
      ...mapGetters({
        isAdmin: 'auth/isAdmin'
      })
    },
    mounted () {
      this.drawer = this.$vuetify.breakpoint.name === 'xl' || this.$vuetify.breakpoint.name === 'lg'
    }
  }
</script>

<style scoped>
    .logo {
        height: 300px;
        width: 100%;
        display: block !important;
        padding-left: 6%;
    }

    .logo img {
        height: 255px;

    }
</style>
