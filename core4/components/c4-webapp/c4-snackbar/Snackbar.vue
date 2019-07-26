<template>
  <v-snackbar
    :timeout="ti"
    :color="snack.type"
    :top="true"
    :center="true"
    :multi-line="false"
    :vertical="false"
    v-model="show"
  >
    {{ snack.text }}
    <v-btn
      dark
      icon
      flat
      @click="show = false"
    >
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  mounted () {
    this.$bus.$on('SHOW_NOTIFICATION', (dto) => {
      this.sncck.type = 'success'
      this.snack = Object.assign({}, this.snack, dto)
      if(dto.timeout == null){
        delete this.snack.timeout
      }
      this.show = true
    })

  },
  computed: {
    ti() {
      return this.snack.timeout || this.timeout 
    }
  },
  data () {
    return {
      show: false,
      timeout: 3000,
      snack: {
        type: 'success', // success // error // info
        text: 'Success'
      }
    }
  }
}
</script>
<style scoped>
</style>
