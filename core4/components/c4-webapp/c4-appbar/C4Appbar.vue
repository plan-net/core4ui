<template>
  <v-app-bar
    fixed
    app
    elevation="0"
    :extended="false"
    class="c4-appbar"
    :dark="dark"
  >
    <c4-hamburger />
    <!-- @slot Use this slot for a custom title instead of the default app-name -->
    <router-link
      to="/"
      class="home-link ml-3"
    >
      <c4-logo v-if="!customTitle" :dark="dark"></c4-logo>
    </router-link>
    <portal-target
      slim
      name="c4ui-title-portal"
      @change="handlePortalUpdate"
    >
    </portal-target>
    <v-spacer></v-spacer>
    <c4-user :in-widget="customTitle"></c4-user>
  </v-app-bar>
</template>

<script>
import C4Hamburger from '../c4-navigation/C4Hamburger.vue'
import C4User from '../c4-user/C4User.vue'
import C4Logo from './C4Logo.vue'
import { mapGetters } from 'vuex'
export default {
  methods: {
    handlePortalUpdate (ct) {
      // custom title is set via portal from outside - from widgets application for eaxmple
      this.customTitle = ct
    }
  },
  data () {
    return {
      customTitle: false
    }
  },
  computed: {
    ...mapGetters([
      'dark'
    ])
  },
  components: {
    C4Hamburger,
    C4User,
    // C4Spacer,
    C4Logo
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content {
  padding: 0 16px !important;
}
</style>
