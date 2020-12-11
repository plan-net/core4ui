<template>
  <v-app>
    <template v-if="isNavVisible">
      <c4-navigation>
        <slot name="navigation-slot"></slot>
      </c4-navigation>
      <c4-appbar :show-hamburger="hasNavigationSlot"></c4-appbar>
    </template>
    <v-main>
      <v-container :fluid="fluid" class="px-6 pt-8">
        <portal-target slim name="c4ui-topnav-portal"> </portal-target>
        <router-view />
        <c4-snackbar></c4-snackbar>
        <error-dialog></error-dialog>
      </v-container>
    </v-main>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <slot></slot>
  </v-app>
</template>
<script>
import C4Appbar from './c4-appbar/C4Appbar.vue'
import C4Snackbar from './c4-snackbar/Snackbar.vue'
import ErrorDialog from './c4-error-dialog/ErrorDialog.vue'
import C4Navigation from './c4-navigation/C4Navigation.vue'
import { mapActions, mapGetters } from 'vuex'
// import Auth from '../../Auth'

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
    }
  },
  components: {
    C4Appbar,
    C4Snackbar,
    ErrorDialog,
    C4Navigation
  },
  async created () {
    this.initC4App()
    /*     try {
      const ret = await Auth.store()
      this.$store.dispatch('setC4Theme', ret.doc.theme)
      this.$store.dispatch('setApplicationLogo', ret.doc.logo)
    } catch (err) {
      console.warn(
        'Falling back to default theme. No theme configured for this user.'
      )
    } */
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['initC4App'])
  },
  computed: {
    hasNavigationSlot () {
      return !!this.$slots['navigation-slot']
    },
    ...mapGetters(['appBarVisible', 'loading', 'inWidget', 'dark', 'title', 'inIframe']),
    isNavVisible () {
      if (this.appBarVisible === false) {
        return false
      }
      if (this.inIframe) {
        return false
      }
      const meta = this.$route.meta || {
        hideNav: false
      }
      return !meta.hideNav
    },
    fluid () {
      return (
        'xs_sm_md'.includes(this.$vuetify.breakpoint.name) || this.fullWidth
      )
    }
  }
}
</script>

<style lang="css">
.home-link {
  text-decoration: none;
  color: unset !important;
}
.v-toolbar.topnav, .c4ui-topnav {

  position: absolute;
  top: 0;
  z-index: 1;
}
/* .v-navigation-drawer__border {
  opacity: 0.15;
} */
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

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid rgba(100, 100, 100, 0.2);
}

.v-progress-linear {
  position: fixed;
  z-index: 100;
  top: 0px;
  margin: 0;
}
.embedded .v-progress-linear {
  top: 0px !important;
}
.embedded .v-progress-linear:after {
  content: '';
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

/* .c4-toolbar >>> .v-toolbar__content {
  padding-right: 8px;
  padding-left: 18px;
} */
</style>
