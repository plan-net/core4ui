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
      'menu'
    ]),
    path () {
      const type = this.$route.params.type
      console.log(this.menu.find(val => val.label === type))
      const path = (this.menu.find(val => val.label === type) || {}).path
      return path
    }
  }
}
</script>
<style lang="scss" scoped>
  div {
    position: absolute;
    left: 0;
    right: 0;
    top: 55px;
    bottom: 0;
    padding: 0 0 0 0;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
