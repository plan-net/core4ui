
import { setRoutes } from './internal/routes/index.js'
import { setAjaxConfig } from './internal/axios.config.js'

import C4Webapp from './components/c4-webapp/C4Webapp'
import C4Page from './components/c4-page/C4Page'
import C4Card from './components/c4-card/C4Card'
import C4Numbers from './components/c4-numbers/C4Numbers'
import C4Notification from './components/c4-notification/C4Notification'
import { setStore } from './store'
import C4DataTable from './components/c4-table/C4Table'
import C4Empty from './components/c4-empty/C4Empty'
import C4DataTablePlus from './components/c4-datatable/C4Datatable'
import bus from './event-bus'
import Vue from 'vue'
import PortalVue from 'portal-vue'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

import './styles/index.css'
import './styles/theme-dark.scss'
import './styles/theme-light.scss'

import { getVuetify } from './plugins/vuetify'

import error from './httpError'

import { i18n } from './translations'
Vue.use(PortalVue)

const install = (Vue, options) => {
  Vue.config.productionTip = false

  Vue.prototype.i18n = i18n
  Vue.prototype.$bus = bus
  Vue.prototype.$store = options.store
  Vue.$router = options.router
  Vue.prototype.raiseError = error.show

  /// /////////////////
  // Vue.use(Router)
  setStore(options.store)
  options.store.dispatch('initializeApp', options.config)
  // 2.
  setRoutes(options.router)
  // 3
  setAjaxConfig(options.config)
  // setCookieConfig(options.config.API)

  Vue.component('c4-notification', C4Notification)
  Vue.component('c4-numbers', C4Numbers)
  Vue.component('c4-card', C4Card)
  Vue.component('c4-page', C4Page)
  Vue.component('c4-datatable', C4DataTable)

  Vue.component('c4-datatable-plus', C4DataTablePlus)
  Vue.component('c4-webapp', C4Webapp)
  Vue.component('c4-empty', C4Empty)

  Vue.config.errorHandler = function (err, vm, info) {
    console.error(err)
    error.show(err, vm, info)
  }

  window.onerror = function (message, source, line, column, error) {
    console.error(message, source, line, column, error)
  }

  new Vue({
    i18n,
    vuetify: getVuetify(options.config.THEME),
    router: options.router,
    store: options.store,
    render: (h) => h(options.App)
  }).$mount('#app')
}

export default {
  install
}

export { C4Webapp }
