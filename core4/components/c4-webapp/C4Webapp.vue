  <template>
  <v-app>
    <template v-if="isNavVisible">
        <c4-navigation>
          <slot name="navigation-slot"></slot>
        </c4-navigation>
        <!-- TODO refactor to compoinent-->
        <v-app-bar
          fixed
          app
          dense
          elevate-on-scroll
          :extended="false"
          class="c4-toolbar"
        >
          <v-btn
            class=""
            text
            icon
            @click="$bus.$emit('toggleSidenav')"
            v-if="navButtonVisible"
          >
            <toolbar-side-icon class=""></toolbar-side-icon>
          </v-btn>
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
          <!-- <div class="flex-grow-1"></div> -->
          <v-spacer class="c4-dotted"></v-spacer>
          <c4-user></c4-user>
        </v-app-bar>
    </template>

    <v-content class="core-background">
      <v-container
        :fluid="fluid" class="pa-0"
      >
        <router-view />
        <c4-snackbar></c4-snackbar>
        <error-dialog></error-dialog>
      </v-container>
    </v-content>
    <v-progress-linear
      indeterminate
      v-if="loading"
    ></v-progress-linear>
  </v-app>
</template>
<script>

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
  },
  destroyed () {
  },
  data () {
    return {
      drawer: null,
      alertMessage: null,
      alertOpen: false
    }
  },
  methods: {
    ...mapActions([
      'fetchProfile',
      'logout',
      'setTitle'
    ])
  },
  computed: {
    ...mapGetters([
      'appBarVisible',
      'profile',
      'loading',
      'inWidget',
      'dark',
      'title'
    ]),
    isNavVisible () {
      if (this.appBarVisible === false) {
        return false
      }
      const meta = this.$route.meta || {
        hideNav: false
      }
      return !meta.hideNav
    },
    fluid () {
      return ('xs_sm_md').includes(this.$vuetify.breakpoint.name) || (this.fullWidth)
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

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid rgba(100, 100, 100, 0.2);
}

.v-progress-linear {
  position: absolute;
  z-index: 10;
  top: 0;
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
