<template>
  <div class="c4-user">
    <v-tooltip
      bottom
      v-if="hasOwnTheme !== true"
    >
      <v-btn
        slot="activator"
        class="theme-btn"
        flat
        icon
        @click="toggleDark()"
      >
        <v-icon>invert_colors</v-icon>
      </v-btn>
      <span>Toggle theme</span>
    </v-tooltip>

    <v-menu
      left
      class="c4-more-menu"
      absolute
      offset-y
      close-on-click
      close-on-content-click
    >
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
          v-for="(item,index) in internalMenu"
          :key="index"
          :to="{name : 'content' , params: { type: item.label } }"
        >
          <v-list-tile-title>{{item.label}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{name: 'profile'}">
          <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout()">
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-tooltip
      bottom
      v-if="inWidget || isMenuPage"
    >
      <v-btn
        @click="close"
        slot="activator"
        flat
        icon
      >
        <v-icon>cancel</v-icon>
      </v-btn>
      <span>Close widget</span>
    </v-tooltip>
    <pre>{{internalInWidget}}</pre>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'c4-user',
  props: {},
  components: {},
  mounted () {

  },
  data () {
    return {
      alertMessage: null,
      alertOpen: false,
      showNavigation: false,
      clientWidth: 0,
      sidenavOpen: null
    }
  },
  methods: {
    close () {
      if (this.isMenuPage) {
        this.$router.go(-1)
      } else {
        this.$bus.$emit('c4-application-close')
      }
    },
    ...mapActions([
      'logout',
      'toggleDark'
    ])
  },
  computed: {
    isMenuPage () {
      return this.$route.name === 'content'
    },
    internalMenu () {
      return this.menu
    },
    ...mapGetters([
      'profile',
      'menu',
      'inWidget',
      'dark'
    ]),
    ...mapState([
      'hasOwnTheme',
      'title'
    ])
  }
}
</script>

<style scoped lang="css">
.c4-user > * {
  display: inline-flex;
}

.c4-user .v-btn {
  margin-left: 0;
  margin-right: 0;
}
</style>
