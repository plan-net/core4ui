<template>
  <v-app-bar
    fixed
    app
    elevation="0"
    :extended="false"
    class="c4-appbar"
    :dark="dark"
  >
    <c4-hamburger v-if="showHamburger"/>
    <template v-if="!customTitle && showHamburger">
      <!-- @slot Use this slot for a custom title instead of the default app-name -->
      <router-link to="/" class="home-link ml-3">
        <c4-logo :dark="dark"></c4-logo>
      </router-link>
    </template>

    <router-link to="/" class="home-link pl-3" >
      <portal-target tag="span" ref="portal" name="c4ui-title-portal" @change="handlePortalUpdate">
      </portal-target>
    </router-link>

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
  props: {
    /**
     * Controls visibility of hamburger menu.
     */
    showHamburger: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  methods: {
    handlePortalUpdate (ct) {
      // custom title is set via portal from outside - from widgets application for eaxmple
      this.customTitle = ct
    }
  },
  async updated () {
    await this.$nextTick()
    console.log(this.$refs.portal, '---------------')
    console.log(this.customTitle)
  },
  data () {
    return {
      customTitle: false
    }
  },
  computed: {
    ...mapGetters(['dark'])
  },
  components: {
    C4Hamburger,
    C4User,
    // C4Spacer,
    C4Logo
  },
  async mounted () {
    // await this.$nextTick()
    // this.customTitle = this.$el.querySelectorAll('.vue-portal-target > *').length > 0
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content {
  padding: 0 16px !important;
}
</style>
