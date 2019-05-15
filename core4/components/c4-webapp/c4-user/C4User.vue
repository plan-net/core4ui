<template>
  <div class="c4-user">
    <v-spacer></v-spacer>
    <v-tooltip bottom v-if="hasOwnTheme !== true">
      <v-btn
        slot="activator"
        class="theme-btn pr-0 mr-0 "
        flat icon
        @click="toggleDark()"
      >
        <v-icon>invert_colors</v-icon>
        <!-- set api call to toggle dark theme -->
        <!-- <span >{{dark === true ? 'light' : 'dark'}}</span> -->
      </v-btn>
      <span>Toggle theme</span>
    </v-tooltip>

    <v-menu left class="c4-more-menu">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          icon
          v-on="on"
        >
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile
          :to="{name: 'profile'}"
        >
          <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile disabled
                     :to="{name: 'privacy'}"
        >
          <v-list-tile-title>Privacy Policy</v-list-tile-title>
        </v-list-tile>
        <v-list-tile disabled
                     :to="{name: 'imprint'}"
        >
          <v-list-tile-title>Imprint</v-list-tile-title>
        </v-list-tile>


        <v-list-tile
          @click="logout()">
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'c4-user',
    props: {},
    components: {},
    mounted() {
    },
    data() {
      return {
        alertMessage: null,
        alertOpen: false,
        showNavigation: false,
        clientWidth: 0,
        sidenavOpen: null
      }
    },
    methods: {
      ...mapActions([
        'logout',
        'toggleDark'
      ])
    },
    computed: {
      ...mapGetters([
        'profile',
        'title',
        'dark',
        'hasOwnTheme'
      ])
    }
  }
</script>

<style scoped lang="css">

</style>
