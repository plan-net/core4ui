<template>
  <v-navigation-drawer
    v-model="sidenavOpen"
    app
    fixed
    stateless
    class="c4-navigation"
  >
    <!-- @slot Use this slot for SideNavigation v-list -->
    <v-row
      column
      no-gutters
    >
      <v-col
        class="mt-12 pt-8 mb-12"
        cols="12"
      >
         <img
          class="client"
          style="max-height: 80px;"
          :src="logo"
          alt=""
        >
      </v-col>
    </v-row>
    <slot></slot>
  </v-navigation-drawer>
</template>

<script>
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
    logo () {
      return this.$store.getters.logo
    }
  },
  methods: {
    toggleSidenav () {
      this.sidenavOpen = !this.sidenavOpen
    }
  }
}
</script>

<style scoped>
</style>
