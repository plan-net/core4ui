import C4Webapp from './components/c4-webapp/C4Webapp'
import C4Page from './components/c4-page/C4Page'
import C4Card from './components/c4-card/C4Card'
import C4Dialog from './components/c4-dialog/C4Dialog'
import C4Numbers from './components/c4-numbers/C4Numbers'
import C4Notification from './components/c4-notification/C4Notification'
import { setRoutes } from './internal/routes/index.js'
import { setAjaxConfig } from './internal/axios.config.js'
// import { setCookieConfig } from './internal/cookie.service.js'
import { setStore } from './store'
import C4DataTable from './components/c4-table/C4Table'
import C4DateRange from './components/c4-daterange/C4DateRange'
// import C4DataTablePlus from './components/c4-table-plus/C4TablePlus'
import C4Empty from './components/c4-empty/C4Empty'
import bus from './event-bus'
import helper from './helper'
// import './plugins/vee-validate'
import VeeValidate, { Validator } from 'vee-validate'
import en from 'vee-validate/dist/locale/en'
import Router from 'vue-router'
import moment from 'moment'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import './styles/typography.scss'
import './styles/index.scss'
import './styles/theme-dark.scss'
import './styles/theme-light.scss'

import numbro from 'numbro'
import deDE from 'numbro/languages/de-DE.js'

import { getVuetify } from './plugins/vuetify'
// import Vuetify from 'vuetify/lib'
// import 'vuetify/dist/vuetify.min.css'

import { i18n, veeValidateDictionary } from './translations'
// Vee-Validator
// app wide styles, fonts

numbro.registerLanguage(deDE)
numbro.setLanguage(deDE.languageTag)

const install = (Vue, options) => {
  Vue.config.productionTip = false

  moment.locale('de')
  Vue.prototype.i18n = i18n
  Vue.prototype.$bus = bus
  Vue.prototype.$helper = helper
  Vue.prototype.$store = options.store
  Vue.prototype.$numbro = numbro

  /// /////////////////
  Vue.use(Router)
  Vue.use(VeeValidate, {
    mode: 'eager',
    aria: false,
    locale: 'en'
  })
  Validator.localize('en', en)
  Validator.localize(veeValidateDictionary)
  // 1. setup store (holds all informations)
  setStore(options.store)
  options.store.dispatch('initializeApp', options.config)
  // 2.
  setRoutes(options.router)
  // 3
  setAjaxConfig(options.config)
  // setCookieConfig(options.config.API)

  Vue.component('c4-dialog', C4Dialog)
  Vue.component('c4-notification', C4Notification)
  Vue.component('c4-numbers', C4Numbers)
  Vue.component('c4-card', C4Card)
  Vue.component('c4-page', C4Page)
  Vue.component('c4-datatable', C4DataTable)
  Vue.component('c4-webapp', C4Webapp)
  Vue.component('c4-empty', C4Empty)
  Vue.component('c4-daterange', C4DateRange)
  /*   console.log(vuetify)
  Object.keys(options.config.THEME).forEach(val => {
    vuetify.theme.themes.light[val] = options.config.THEME[val]
    vuetify.theme.themes.dark[val] = options.config.THEME[val]
    return val
  }) */
  const vuetify = getVuetify(options.config.THEME)
  new Vue({
    i18n,
    vuetify,
    router: options.router,
    store: options.store,
    render: h => h(options.App)
  }).$mount('#app')
}

export default {
  install
}

export { C4Webapp }
