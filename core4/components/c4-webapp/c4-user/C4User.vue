<template>
  <span class="c4-user">
    <v-row
      no-gutters
      align="center"
    >
      <v-menu
        open-on-hover
        close-delay="250"
        open-delay="100"
        bottom
        left
        :offset-y="true"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            style="text-transform: none;"
            text
            v-bind="attrs"
            v-on="on"
          >
            {{profile.realname || ''}}
            <v-icon
              right
              small
            >mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <v-flex class="mb-4">
              <v-avatar
                size="96"
                class="mr-4"
              >
                <img
                  color="primary"
                  :src="profile.avatar"
                  alt="Avatar"
                >
              </v-avatar>
              <v-btn
                small
                color="primary"
                @click="()=>{}"
              >Change Avatar</v-btn>
            </v-flex>

            <v-text-field
              v-model="profile.realname"
              label="Last Name"
            ></v-text-field>
            <v-text-field
              v-model="profile.email"
              label="Email Address"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="pb-3">
            <v-spacer></v-spacer>
            <v-btn
              small
              color="primary"
              @click.native="()=>{}"
            >
              <v-icon
                left
                dark
                small
              >mdi-check</v-icon>
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-menu>

      <v-avatar
        size="40"
        class="mx-2 small"
      >
        <img
          :src="profile.avatar"
          alt="User Image"
        >
      </v-avatar>
      <!-- v-if="hasOwnTheme !== true" -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            v-on="on"
            small
            icon
            @click="toggleDark()"
          >
            <v-icon>mdi-invert-colors</v-icon>
          </v-btn>
        </template>
        <span>Toggle light / dark</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            v-on="on"
            small
            icon
            @click="toggleTheme"
          >
            <v-icon>mdi-shape</v-icon>
          </v-btn>
        </template>
        <span>Toggle theme</span>
      </v-tooltip>

      <!-- v-if="hasOwnTheme !== true" -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            v-on="on"
            small
            icon
            @click="()=>{}"
          >
            <v-icon>mdi-bell</v-icon>
            <!--  <v-icon>mdi-bell-alert</v-icon> -->
          </v-btn>
        </template>
        <span>Notifications</span>
      </v-tooltip>
      <v-tooltip
        bottom
        v-if="showCloseButton"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            @click="close"
            v-on="on"
            small
            icon
          >
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </template>
        <span>Close widget</span>
      </v-tooltip>
    </v-row>
  </span>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
const THEMES = [
  {
    primary: '#AC2A41',
    accent: '#0D2D5B',

    secondary: '#000000',
    error: '#EC583E',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  {
    primary: '#111111',
    accent: '#EC08B3',

    secondary: '#333',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  {
    primary: '#E91E63',
    accent: '#7B1FA2',

    secondary: '#000000',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  {
    dark: {
      primary: '#f57f17',
      accent: '#0097a7',
      secondary: '#ffe18d',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252'
    },
    light: {
      primary: '#1976D2',
      accent: '#e91e63',
      secondary: '#30b1dc',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252'
    }
  },
  {
    dark: {
      primary: '#21CFF3',
      accent: '#FF4081',
      secondary: '#ffe18d',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252'
    },
    light: {
      primary: '#388E3C',
      accent: '#5C6BC0',
      secondary: '#30b1dc',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252'
    }
  }
]
export default {
  name: 'c4-user',
  data () {
    return {
      curr: 0
    }
  },
  mounted () {
    this.$store.dispatch('fetchProfile')
    this.$store.dispatch('setC4Theme', THEMES[0])
  },
  methods: {
    toggleTheme () {
      this.curr = (this.curr + 1) % THEMES.length
      const theme = THEMES[this.curr]
      this.$store.dispatch('setC4Theme', theme)
    },
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

<style scoped lang="scss">
.v-avatar {
  border: 2px solid var(--v-primary-base);
  position: relative;
  &.small {
    &:after {
      top: -2px;
      left: -2px;
      position: absolute;
      height: 40px;
      width: 40px;
      display: block;
      border-radius: 18px;
      border: 4px solid white;
      content: "";
    }
  }
}
.c4-user > * {
  display: inline-flex;
}
.col {
  padding-left: 0;
  padding-right: 0;
}
.c4-user .v-btn {
  margin-left: 0;
  margin-right: 0;
}
</style>
