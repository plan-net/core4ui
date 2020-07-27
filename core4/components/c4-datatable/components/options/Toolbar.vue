<template>
  <v-toolbar dense
             flat
             :extended="extended"
             :extension-height="extensionHeight">

    <!-- Search -->
    <template v-if="searchActive">
      <search :searchActive="searchActive" @closeInput="onSearch"></search>
    </template>
    <template v-else>
      <v-toolbar-title v-if="title">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Search input activator btn-->
      <v-btn small icon v-if="search" @click="searchActive = true">
        <v-icon>search</v-icon>
      </v-btn>
    </template>

    <v-divider v-if="search" class="mx-4" vertical></v-divider>

    <!-- Advanced-options -->
    <v-tooltip bottom v-if="advanced">
      <template v-slot:activator="{ on }">
        <v-btn small icon @click="onAdvanced(false)">
          <v-icon v-on="on" small>sort</v-icon>
          <advanced-options v-if="advancedActive"
                            :dialog="advancedActive"
                            :translation="translation"
                            :column="column"
                            @closeDialog="onAdvanced">
          </advanced-options>
        </v-btn>
      </template>
      <span>{{translation.advancedOptions}}</span>
    </v-tooltip>

    <!-- Download -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small icon v-on="on" @click="onDownload">
          <v-icon small>cloud_download</v-icon>
          <download v-if="downloadActive"
                    :url="url"
                    :dialog="downloadActive"
                    :translation="translation"
                    @closeDialog="downloadActive = !downloadActive">
          </download>
        </v-btn>
      </template>
      <span>{{translation.download}}</span>
    </v-tooltip>

    <!-- Dense -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small icon  v-on="on" @click="onDense">
          <v-icon small v-show="dense">format_line_spacing</v-icon>
          <v-icon small v-show="!dense">format_align_justify</v-icon>
        </v-btn>
      </template>
      <span>{{translation.dense}}</span>
    </v-tooltip>

    <!-- Fullscreen -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small icon v-on="on" @click="onMaximize">
          <v-icon small v-show="fullscreen">fullscreen_exit</v-icon>
          <v-icon small v-show="!fullscreen">fullscreen</v-icon>
        </v-btn>
      </template>
      <span v-show="fullscreen" >{{translation.fullscreen_exit}}</span>
      <span v-show="!fullscreen">{{translation.fullscreen}}</span>
    </v-tooltip>

  </v-toolbar>
</template>

<script>
import Search from './Search'
import Download from './Download'
import AdvancedOptions from './AdvancedOptions'

export default {
  name: 'Toolbar',
  components: {
    Search,
    Download,
    AdvancedOptions
  },
  props: {
    title: String,
    url: String,
    fullscreen: Boolean,
    dense: Boolean,
    advanced: Boolean,
    translation: Object,
    column: Array,
    search: Boolean
  },
  data () {
    return {
      extended: false,
      extensionHeight: 48,

      searchActive: false,
      downloadActive: false,
      advancedActive: false
    }
  },
  methods: {
    onSearch (data) {
      let { type, text = '' } = data

      this.$emit('search', { filter: text })
      if (type === 'esc' || type === 'clear') this.searchActive = false
    },
    onMaximize () {
      this.$emit('maximize')
    },
    onDense () {
      this.$emit('dense')
    },
    onDownload () {
      this.downloadActive = !this.downloadActive
    },
    onAdvanced (data) {
      if (data) this.$emit('sort', data)
      this.advancedActive = !this.advancedActive
    }
  }
}
</script>

<style scoped>
</style>
