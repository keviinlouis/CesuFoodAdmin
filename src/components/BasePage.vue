<template>
    <div id="app">
        <v-app id="inspire">
            <v-navigation-drawer
                    fixed
                    v-model="drawer"
                    app
            >
                <v-list dense>
                    <div class="logo">
                        <img :src="logo" alt="logo"/>
                    </div>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon>home</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Dashboard</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon>contact_mail</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Contact</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar color="primary" dark fixed app>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>Application</v-toolbar-title>
            </v-toolbar>
            <v-content>
                <v-container fluid fill-height>
                    <router-view></router-view>
                </v-container>
            </v-content>
            <v-footer color="indigo" app inset>
                <span class="white--text">&copy; 2018</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
  import Logo from '@/assets/logo.png'

  export default {
    name: 'BasePage',
    data () {
      return {
        drawer: true,
        logo: Logo
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
