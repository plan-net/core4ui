<template>
  <span class="c4-user">
    <v-row
      no-gutters
      align="center"
      v-click-outside="open = false"
    >
      <v-menu
        xxxopen-on-hover
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
                <c4-avatar></c4-avatar>
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
                :value="dark"
                @change="onDarkChange"
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
          v-if="avatar"
          :src="avatar"
          alt="User Image"
        >
        <v-icon
          v-else
          large
          color="primary"
        >mdi-account-circle</v-icon>
      </v-avatar>
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
import C4Avatar from './C4Avatar'
import Auth from '../../../Auth'

export default {
  name: 'c4-user',
  components: {
    C4Avatar
  },
  data () {
    return {
      open: false,
      curr: 0,
      isDarkInternal: false,
      avatar: null
    }
  },
  props: {
    inWidget: {
      type: Boolean,
      default: false
    }
  },
  async mounted () {
    this.$store.dispatch('fetchProfile')
    this.isDark = this.dark
    this.$bus.$on('c4_reload_avatar', this.checkAvatar)
    this.checkAvatar()
  },
  methods: {
    async checkAvatar () {
      const ret = await Auth.checkAvatar()
      this.avatar = null
      await this.$nextTick()
      if (typeof ret === 'string') {
        this.avatar = this.url
      }
    },
    onDarkChange (event) {
      const variant = event === true ? 'dark' : 'light'
      this.toggleDark(variant)
    },

    close () {
      this.$router.push('/')
    },
    ...mapActions([
      'logout',
      'toggleDark'
    ])
  },

  computed: {
    local () {
      return window.location.href.includes('localhost') ? 'http://0.0.0.0:5001/' : ''
    },
    url () {
      const user = JSON.parse(window.localStorage.getItem('user') || {})
      const token = `?token=${user.token || -1}`
      return `${process.env.VUE_APP_APIBASE_CORE}/avatar${token}`
    },
    profileItem () {
      return {
        label: 'Profile', path: `${process.env.VUE_APP_APIBASE_CORE}/profile`
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
