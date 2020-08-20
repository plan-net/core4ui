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
      <c4-logo></c4-logo>
      <!--       <portal-target name="title-portal">
      </portal-target> -->

    </router-link>
    <v-spacer></v-spacer>
    <c4-user></c4-user>
  </v-app-bar>
</template>

<script>
import C4Hamburger from '../c4-navigation/C4Hamburger.vue'
import C4User from '../c4-user/C4User.vue'
import C4Logo from './C4Logo.vue'
import { mapGetters } from 'vuex'
export default {
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
