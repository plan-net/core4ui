<template>
  <div>
    <iframe
      :src="path"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {

  },
  computed: {
    ...mapGetters([
      'menu', 'dark'
    ]),
    path () {
      const dark = new URLSearchParams(this.$vuetify.theme.themes.dark).toString().split('&').join('xyz')
      const light = new URLSearchParams(this.$vuetify.theme.themes.light).toString().split('&').join('xyz')
      const type = this.$route.params.type
      let path = (this.menu.find(val => val.label === type) || {}).path
      if (this.$route.params.type === 'Profile') {
        path = '/core4/api/v1/profile'
      }
      if (path) {
        const user = JSON.parse(window.localStorage.getItem('user') || {})
        const token = `?token=${user.token || -1}`
        return `${path}${token}&dark=${this.dark}&themeDark=${dark}&themeLight=${light}`
      }
      return null
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0 0 0 0;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
