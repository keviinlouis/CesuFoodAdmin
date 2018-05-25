<template>
    <v-app id="inspire">
        <v-navigation-drawer fixed v-model="drawer" app>
            <v-list dense>
                <div class="logo">
                    <img :src="logo" alt="logo"/>
                </div>
                <v-list-tile @click="routePush(menu.route)" v-for="(menu, key) in menus" :key="key" :color="getColorByRoute(menu.route)">
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
            <v-menu offset-y left transition="slide-x-transition">
                <v-btn slot="activator" flat icon>
                    <v-icon>settings</v-icon>
                </v-btn>
                <v-list >
                    <v-list-tile @click="logout()">
                        <v-list-tile-action>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title >
                            Sair
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  import Logo from '@/assets/logo.png'

  export default {
    name: 'BasePage',
    data () {
      return {
        drawer: true,
        logo: Logo,
        menus: [
          {
            icon: 'dashboard',
            label: 'Dashboard',
            route: 'dashboard'
          },
          {
            icon: 'list',
            label: 'Produtos',
            route: 'produtos'
          },
          {
            icon: 'photo_camera',
            label: 'Vender',
            route: ''
          }
        ]
      }
    },
    methods: {
      routePush (route) {
        this.$router.push({name: route})
      },
      pageName () {
        let pageName = this.$router.currentRoute.name
        return pageName[0].toUpperCase() + pageName.substring(1)
      },
      getColorByRoute (name) {
        return this.$router.currentRoute.name === name ? 'dark' : 'gray'
      },
      logout () {
        this.routePush('login')
      },
      isAdmin () {
        return true
      }
    },
    created () {
      if (this.isAdmin()) {
        this.menus.push(
          {
            icon: 'people',
            label: 'Funcionários',
            route: 'funcionarios'
          }
        )
      }
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
