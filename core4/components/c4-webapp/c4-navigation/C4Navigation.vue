<template>
  <v-navigation-drawer
    v-model="sidenavOpen"
    app
    width="325"
    fixed
    stateless
    class="c4-navigation px-2"
  >
    <!-- @slot Use this slot for SideNavigation v-list -->
    <v-row
      column
      no-gutters class="c4-navigation-logo-container"
    >
      <v-col
        class="mt-12 pt-8 mb-12"
        cols="12"
        align="center"
      >
        <router-link
          to="/"
          class="home-link"
        >
          <img
            style="max-height: 80px; min-height: 80px; max-width: 270px;"
            :src="$store.getters.logo"
            alt="Logo"
          />
        </router-link>
      </v-col>
    </v-row>
    <slot></slot>

    <!--   <footer
      :class="textColorClass"
      class="px-8 pt-7 pb-3"
      :style="{ 'background-color': this.$vuetify.theme.themes.light.accent }"
    >
      <v-row no-gutters class="pb-5">
        <v-col v-for="item in menu" :key="item.label">
          <v-btn
            :dark="!isAccentLightColor"
            v-if="item.type === 'mail'"
            :href="item.path"
            text
          >
            {{ item.label }}</v-btn
          >
          <v-btn
            :dark="!isAccentLightColor"
            v-else
            :to="{ name: 'content', params: { type: item.label } }"
            text
          >
            {{ item.label }}</v-btn
          >
        </v-col>
      </v-row>
      <v-row no-gutters>
        <p>© {{ new Date().getFullYear() }} Serviceplan Group</p>
      </v-row>
    </footer> -->
    <v-footer
      dark
      padless
      class="c4-navigation-footer"
    >
      <v-card
        class="flex"
        flat
        tile
        :class="textColorClass"
        :style="{ 'background-color': this.$vuetify.theme.themes.light.accent }"
      >
        <v-card-title>
          <v-row
            no-gutters
            class="pb-5"
          >
            <v-col
              v-for="item in menu"
              :key="item.label"
            >
              <v-btn
                :dark="!isAccentLightColor"
                v-if="item.type === 'mail'"
                :href="item.path"
                text
              >
                {{ item.label }}</v-btn>
              <v-btn
                :dark="!isAccentLightColor"
                v-else
                :to="{ name: 'content', params: { type: item.label } }"
                text
              >
                {{ item.label }}</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="py-2 white--text text-center">
          © {{ new Date().getFullYear() }} <strong>Serviceplan Group</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'c4-navigation',
  mounted () {
    this.$bus.$on('toggleSidenav', this.toggleSidenav)
  },
  data () {
    return {
      sidenavOpen: false
    }
  },
  computed: {
    ...mapGetters(['isAccentLightColor', 'menu']),

    textColorClass () {
      return this.isAccentLightColor ? 'black--text' : 'white--text'
    },
    bgColor () {
      const dark = this.$store.getters.dark
      const color = this.$vuetify.theme.themes[dark ? 'dark' : 'light'].accent
      return color
    }
  },
  methods: {
    toggleSidenav () {
      this.sidenavOpen = !this.sidenavOpen
    }
  }
}
</script>

<style scoped lang="scss">
footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}
</style>
