<template>
  <v-navigation-drawer
    v-model="sidenavOpen"
    fixed
    clipped
    stateless
    class="core-navigation-container"
    app
  >
    <div class="pt-3">
      <!-- @slot Use this slot for SideNavigation v-list -->
      <v-layout
        class="sidenav"
        row
      >
        <v-flex>
          <v-list
            dense
            class="pb-0"
          >
            <slot></slot>
          </v-list>
        </v-flex>
      </v-layout>
    </div>
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
