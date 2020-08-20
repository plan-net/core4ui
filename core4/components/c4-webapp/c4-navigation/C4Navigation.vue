<template>
  <v-navigation-drawer
    v-model="sidenavOpen"
    app
    fixed
    stateless
    class="c4-navigation"
  >
    <!-- @slot Use this slot for SideNavigation v-list -->

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
  methods: {
    toggleSidenav () {
      this.sidenavOpen = !this.sidenavOpen
    }
  }
}
</script>

<style scoped>
</style>
