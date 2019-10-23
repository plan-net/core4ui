<template>
  <div class="c4-user">
    <v-tooltip
      bottom
      v-if="hasOwnTheme !== true"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          class="theme-btn"
          small
          text
          icon
          @click="toggleDark()"
        >
          <v-icon>invert_colors</v-icon>
        </v-btn>
      </template>
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
          small
          dark
          icon
          v-on="on"
        >
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>

      <v-list shaped>
        <!-- <v-subheader>Controls</v-subheader> -->
        <v-list-item-group
          v-model="selected"
          color="primary"
        >
          <v-list-item
            v-for="(item,index) in menu"
            :key="index"
            :to="{name : 'content' , params: { type: item.label } }"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.label"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group color="primary">
          <v-list-item @click="logout()">

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         <!--  <v-list-item @click="logout()">

            <v-list-item-content>
              <v-list-item-title>
                <pre>{{wself}}</pre>
                <pre>{{wtop}}</pre>
                <pre>{{wselftop}}</pre>
                </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>

    </v-menu>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-if="showCloseButton"
            @click="close"
            v-on="on"
            small
            dark
            text
            icon
          >
            <v-icon>cancel</v-icon>
          </v-btn>
        </template>
        <span>Close widget</span>
      </v-tooltip>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'c4-user',
  data () {
    return {
      selected: null,
      alertMessage: null,
      alertOpen: false,
      showNavigation: false,
      clientWidth: 0,
      sidenavOpen: null
    }
  },
  mounted () {
  },
  methods: {
    close () {
      // this is beeing send from the iframe
      if (this.inIframe && this.isMenuPage === false) {
        window.parent.postMessage('c4-application-close', '*')
        return
      }
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
    inIframe () {
      try {
        return window.self !== window.top
      } catch (err) {

      }
      return false
    },
    showCloseButton () {
      console.log(window.self, window.top, window.self !== window.top)
      return this.inIframe || this.inWidget || this.isMenuPage
    },
    isMenuPage () {
      return this.$route.name === 'content'
    },

    ...mapGetters([
      'profile',
      'menu',
      'inWidget',
      'dark',
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
