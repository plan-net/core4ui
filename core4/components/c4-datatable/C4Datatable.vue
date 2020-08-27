<template>
  <component :is="selectedComponent">
    <v-data-table
      :class="config.className"
      :height="internalHeight"
      :headers="headers"
      :items="rows"
      :options.sync="options"
      :fixed-header="options.option.fixed_header"
      :hide-default-header="options.option.hide_header"
      :hide-default-footer="!options.option.footer"
      :multi-sort="true"
      :dense="options.option.dense"
      item-key="id"
      :items-per-page="options.itemsPerPage"
      :server-items-length="options.paging.total_count"
      :loading="loading"
      :loading-text="translation.dataLoading"
      :footer-props="footerProps"
      v-nowrap="headers"
      @click:row="$emit('click-row', $event)"
    >

      <!-- Toolbar -->
      <template v-slot:top>
        <toolbar
          :url="config.url"
          :fullscreen="selectedComponent === 'FullscreenWrapper'"
          :dense="options.option.dense"
          :translation="translation"
          :advanced="options.option.advanced_options"
          :column="column"
          :search="options.option.search"
          :title="config.title || ''"
          @search="onSearch"
          @maximize="onMaximize"
          @dense="onDense"
          @sort="onSort"
        >
        </toolbar>
      </template>

      <!-- Footer-->
      <template
        v-slot:footer
        v-if="!options.option.footer && options.option.info"
      >
        <td :colspan="headers.length">
          <div v-html="options.option.info"></div>
        </td>
      </template>
    </v-data-table>
  </component>
</template>

<script>
// import debounce from 'debounce'
import { debounce } from './helper/debounce.js'
import { clone } from './helper/helper.js'

import RegularWrapper from './components/RegularWrapper'
import FullscreenWrapper from './components/FullscreenWrapper'
import Toolbar from './components/options/Toolbar'

import Nowrap from './directives/Nowrap'
// import Resize from './directives/Resize'

import apiService from './api/service'
import { initialTranslation, OPTIONS } from './helper/obj.js'

export default {
  name: 'data-table',
  components: {
    RegularWrapper,
    FullscreenWrapper,
    Toolbar
  },
  directives: {
    // Resize,
    Nowrap
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    labels: {
      type: Object,
      default: () => {
      }
    }
  },
  data: () => ({
    selectedComponent: 'RegularWrapper',

    startWatch: false,
    loading: false,

    filter: '',

    // config related to vuetify datatable
    options: Object.assign({}, OPTIONS),
    rows: [],
    column: []
  }),
  mounted () {
    this.getTableFromApi = debounce(this.getTableFromApi, 500)
    this.getTableFromApi()

    // trigger update after payload change
   // this.$bus.$on('update-datatable', this.getTableFromApi)
  },
  watch: {
    options: {
      handler (newVal, oldVal) {
        if (this.startWatch) this.getTableFromApi()
      },
      deep: true
    }
  },
  computed: {
    footerProps () {
      const { itemsPerPageAllText, itemsPerPageText } = this.translation

      return Object.assign(
        { showFirstLastPage: true },
        { itemsPerPageAllText, itemsPerPageText }
      )
    },
    translation () {
      return Object.assign({}, initialTranslation, this.labels)
    },
    headers () {
      return this.column.filter(item => !item.hide)
    },
    internalHeight () {
      return this.options.option.fixed_header === true ? (this.options.option.height || 555) : null
    }
  },
  methods: {

    onDense () {
      this.getTableFromApi({ dense: !this.options.option.dense })
    },
    onMaximize () {
      if (this.selectedComponent === 'RegularWrapper') {
        this.selectedComponent = 'FullscreenWrapper'
      } else {
        this.selectedComponent = 'RegularWrapper'
      }
    },
    onSearch (data) {
      this.filter = data.filter
      this.getTableFromApi(data)
    },
    onSort (data) {
      this.getTableFromApi(data)
    },
    getTableFromApi (params) {
      this.loading = true

      let cloneOptions = clone(this.options) // lose connection to the object in data-table vuetify component
      let updatedWithParam = Object.assign(cloneOptions, { filter: this.filter }, params)

      return apiService.getTable(this.config.url, updatedWithParam, this.config.payload)
        .then(data => {
          this.startWatch = false

          Object.assign(this.options, {
            action: data.action,
            itemsPerPage: data.itemsPerPage,
            option: data.option,
            page: data.page,
            paging: data.paging,
            sort: data.sort,
            sortBy: data.sortBy,
            sortDesc: data.sortDesc
          })

          this.column = data.column
          this.rows = data.body

          this.$nextTick(() => {
            this.startWatch = true
          })
        })
        .catch(data => {
          // ToDo: error handling
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  }
}
</script>

<style scoped lang="css">
div >>> tbody tr td {
  cursor: pointer;
}
</style>

<style scoped lang="scss">
.shadowed {
  position: relative;
  &:after {
    content: "";
    display: block;
    right: 0;
    width: 70px;
    top: 0;
    bottom: 0;
    background: rgb(150, 150, 150);
    background: linear-gradient(
      90deg,
      rgba(150, 150, 150, 0) 50%,
      rgba(0, 0, 0, 0.87) 100%
    );
    position: absolute;
    z-index: 2000;
  }
}
</style>
