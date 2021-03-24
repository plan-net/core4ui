<template>
  <v-dialog v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition">
    <slot></slot>
  </v-dialog>
</template>

<script>
export default {
  name: 'FullscreenWrappper',
  data () {
    return {
      dialog: true
    }
  }
}
</script>

<style scoped>
</style>
