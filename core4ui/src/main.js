import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Core4ui from 'core4ui/core4'
import 'core4ui/core4/themes/core4/theme-c4.scss'
import THEME from 'core4ui/core4/themes/core4/theme-vuetify'
import { i18n } from 'core4ui/core4/translations'

Vue.use(Core4ui, {
  router,
  config: {
    DARK: true,
    THEME,
    TITLE: 'Welcome to CORE4OS',
    APP_IDENTIFIER: 'welcome-to-core4os'
  },
  store
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
