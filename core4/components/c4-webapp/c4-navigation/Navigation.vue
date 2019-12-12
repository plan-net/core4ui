<template>
  <v-navigation-drawer
    v-model="sidenavOpen"
    app
    fixed
    stateless
    class="core-navigation-container"
  >
    <!-- @slot Use this slot for SideNavigation v-list -->
    <v-list
      dense
      class="py-0"
    >
      <slot></slot>
    </v-list>
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
