<template>
  <v-dialog persistent v-model="dialog" max-width="500px">
    <v-card>

      <v-card-title>{{translation.downloadTitle}}</v-card-title>

      <v-card-text>
        <v-switch v-model="reset"
                  class="mx-2 mp-4"
                  color="primary"
                  :label="translation.downloadSwitchLabel">
        </v-switch>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary"
               text
               small
               @click="cancel">
          {{translation.cancel}}
        </v-btn>
        <v-btn color="primary"
               text
               small
               @click="download">
          {{translation.download}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import apiService from '../../api/service'

export default {
  name: 'Download',
  props: {
    url: String,
    dialog: Boolean,
    translation: Object
  },
  data () {
    return {
      reset: false
    }
  },
  methods: {
    cancel () {
      this.beforeLeaveDialog()
    },
    download () {
      apiService.downloadTable(this.url, this.reset)
      this.beforeLeaveDialog()
    },
    beforeLeaveDialog () {
      this.reset = false
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>
</style>
