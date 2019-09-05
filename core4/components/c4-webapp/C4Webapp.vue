<template>
  <v-app
    class="c4-webapp"
    :class="standalone ? 'standalone' : 'embedded'"
    :dark="dark"
  >
    <template v-if="isNavVisible">
      <template v-if="standalone">
        <c4-navigation>
          <slot name="navigation-slot"></slot>
        </c4-navigation>

        <transition name="slide">
          <v-toolbar
            flat
            clipped-left
            dense
            dark
            app
            class="c4-toolbar"
            fixed
          >
            <v-toolbar-side-icon
              @click="$bus.$emit('toggleSidenav')"
              v-if="navButtonVisible"
            >
              <toolbar-side-icon />
            </v-toolbar-side-icon>
            <!-- @slot Use this slot for a custom title instead of the default app-name -->
            <slot
              v-if="!!this.$slots['title-slot']"
              name="title-slot"
            ></slot>
            <h2
              v-else
              class="app-title"
              :class="{'reset-font': !!inWidget}"
            >{{title}}</h2>
            <v-spacer class="core-dotted"></v-spacer>
            <c4-user></c4-user>
          </v-toolbar>
        </transition>
      </template>
      <v-content class="pt-0 core-background">
        <v-container
          :fluid="isFluid"
          class="core-container"
        >
          <!-- @slot Use this slot for router instance -->
          <slot name="router"></slot>
          <c4-snackbar></c4-snackbar>
        </v-container>
      </v-content>
    </template>
    <v-content
      v-else
      class="pa-0 ma-0 auth-routes"
    >
      <v-container
        fluid
        fill-height
        class="core-container"
      >
        <v-layout class="pa-0 ma-0">
          <v-flex class="pa-0 ma-0">
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-progress-linear
      indeterminate
      v-if="loading"
    ></v-progress-linear>
    <error-dialog></error-dialog>

  </v-app>
</template>
<script>
/* import {
  TRACK,
  ERROR
} from '../../event-bus' */
import C4Snackbar from './c4-snackbar/Snackbar.vue'
import ErrorDialog from './c4-error-dialog/ErrorDialog.vue'
import Navigation from './c4-navigation/Navigation.vue'
import ToolbarSideIcon from './c4-navigation/c4-toolbar-side-icon.vue'
import C4User from './c4-user/C4User.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'c4-webapp',
  props: {
    /**
       * Controls responsive behavior of the app.
       * If set to true the app content is full-width of the browser, even in large screen reslutions
       */
    fullWidth: {
      type: Boolean,
      default: false,
      required: false
    },
    navButtonVisible: {
      type: Boolean,
      default: true,
      required: false
    },
    standalone: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  components: {
    C4Snackbar,
    ErrorDialog,
    C4User,
    ToolbarSideIcon,
    'c4-navigation': Navigation
  },
  mounted () {
    this.fetchProfile()
    this.$nextTick(() => {
      if (!this.fullWidth) {
        this._updateDimensions()
        window.addEventListener('resize', this._updateDimensions, { 'passive': true })
      }
    })
  },
  destroyed () {
    window.removeEventListener('resize', this._updateDimensions)
  },
  data () {
    return {
      alertMessage: null,
      alertOpen: false,
      clientWidth: 0
    }
  },
  methods: {
    ...mapActions([
      'fetchProfile',
      'logout',
      'setTitle'
    ]),

    _updateDimensions () {
      // TODO mixin
      this.clientWidth = Math.max(document.documentElement.clientWidth,
        window.innerWidth || 0)
    }
  },
  computed: {
    ...mapGetters([
      'profile',
      'loading',
      'inWidget',
      'dark',
      'title'
    ]),
    isNavVisible () {
      const meta = this.$route.meta || {
        hideNav: false
      }
      return !meta.hideNav
    },
    isFluid () {
      return (this.clientWidth < 1260) || (this.fullWidth)
    }
  }
}
</script>

<style lang="css">
.v-navigation-drawer__border {
  opacity: 0.15;
}
</style>

<style scoped lang="css">
.slide-enter-active,
.slide-leave-active {
  top: 0;
}

.slide-enter,
.slide-leave-to {
  top: -48px;
}

/* .auth-routes >>> .container {
  padding: 0;
}

.auth-routes >>> .v-content__wrap,
 {
  padding-top: 0;
}
div.embedded >>> .v-content__wrap,
 {
  padding-top: 0 !important;
  bordewr: 1px solid red;
} */

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid rgba(100, 100, 100, 0.2);
}

.v-progress-linear {
  position: absolute;
  z-index: 10;
  top: -3px;
  margin: 0;
}
.embedded .v-progress-linear {
  top: 0px !important;
}
.embedded .v-progress-linear:after {
  content: "";
  position: fixed;
  cursor: forbidden;
  top: 6px;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vw;
  background: rgba(100, 100, 100, 0.05);
  z-index: 100000;
}

.c4-toolbar >>> .v-toolbar__content {
  padding-right: 8px;
  padding-left: 18px;
}
</style>
