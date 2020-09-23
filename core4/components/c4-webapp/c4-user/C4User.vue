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
        :close-on-content-click="false"
        v-model="open"
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
              <v-row
                no-gutters
                align="center"
                justify="center"
              >
                <v-avatar
                  size="112"
                  class="mx-auto"
                >
                  <img
                    color="primary"
                    :src="profile.avatar"
                    alt="Avatar"
                  >
                </v-avatar>
                <!--         <v-btn
                  small
                  color="primary"
                  @click="()=>{}"
                >Change Avatar</v-btn> -->
              </v-row>
            </v-flex>

            <v-text-field
              outlined
              readonly
              disabled
              v-model="profile.realname"
              label="Name"
            ></v-text-field>
            <v-text-field
              outlined
              readonly
              disabled
              v-model="profile.email"
              label="Email Address"
            ></v-text-field>
            <v-row
              no-gutters
              align="center"
              outlined
            >
              <h5 class="subtitle-1 mr-3"> Display &amp; Brightness</h5>
              <v-radio-group
                v-model="isDark"
                row
              >
                <v-radio
                  label="Dark"
                  :value="true"
                ></v-radio>
                <v-radio
                  label="Light"
                  :value="false"
                ></v-radio>
              </v-radio-group>
              <!--               <v-tooltip bottom>
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
              </v-tooltip> -->
            </v-row>
          </v-card-text>
          <v-card-actions class="pb-5 pr-4">
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="logout"
            >
              <v-icon
                left
                dark
              >mdi-logout-variant</v-icon>
              Logout
            </v-btn>
            <v-btn
              color="primary"
              :to="{name : 'content' , params: { type: profileItem.label } }"
            >
              <v-icon
                left
                dark
              >mdi-account-edit</v-icon>
              View Profile
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-menu>

      <v-avatar
        size="40"
        class="mx-2 small"
      >
        <img
          v-show="profile.avatar != null"
          :src="profile.avatar"
          alt="User Image"
        >
      </v-avatar>
      <!-- v-if="hasOwnTheme !== true" -->
      <!--       <v-tooltip bottom>
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
      </v-tooltip> -->
      <!--       <v-tooltip bottom>
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
      </v-tooltip> -->

      <!-- v-if="hasOwnTheme !== true" -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            v-on="on"
            small
            icon
            @click="toggleTheme"
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
      open: false,
      curr: 0,
      isDarkInternal: false
    }
  },
  props: {
    inWidget: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$store.dispatch('fetchProfile')
    this.$store.dispatch('setC4Theme', THEMES[0])
    this.isDark = this.dark
  },
  methods: {
    openProfile () {
      /*       window.parent.postMessage(
        { event: 'WidgetOpen' }, '*') */
    },

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
    profileItem () {
      const profile = this.menu.find(val => val.Label === 'Profile') // workaround
      return profile || {
        label: 'Profile', path: '/core4/api/v1/profile'

      }
    },
    isDark: {
      get () {
        return this.isDarkInternal != null ? this.isDarkInternal : this.dark
      },
      set (newVal) {
        this.isDarkInternal = newVal
        const variant = newVal === true ? 'dark' : 'light'
        this.toggleDark(variant)
      }
    },
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
      'dark'
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
