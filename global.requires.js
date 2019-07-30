// styleguide/global.requires.js
import Vue from 'vue'
import Core4ui from './core4'
import './core4/themes/core4/theme-c4.scss'
import THEME from './core4/themes/core4/theme-vuetify'
// import { i18n } from './core4/translations'
import SideNavigation from './core4/internal/components/SideNavigation.vue'
import DummyRoute from './core4/internal/components/DummyRoute.vue'
import Router from 'vue-router'
import Vuex from 'vuex'

Vue.component('side-navigation', SideNavigation)
Vue.mixin({
  data () {
    return {
      c4NumbersModel: {
        item1: 10000000,
        item2: 1000,
        item3: 100
      },
      c4DataTable: {
        items: [
          { name: 'Element', age: 2 }
        ],
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Age', value: 'age' }
        ]
      },
      c4Dialog: {
        open1: false,
        open2: false,
        open3: false
      },
      c4Notification: {
        name: 'NotficationName',
        show: true,
        type: 'success',
        message: 'Notification Message',
        dismissible: true,
        timeout: 10000,
        timeoutHandler: function () {
          console.log('timeoutHandler')
        }
      },
      c4DateRange: {
        model: {
          startDate: null,
          endDate: null
        },
        rangeOptions: {
          minDate: '2017-01',
          maxDate: '2021-01',
          format: 'MM.DD.YYYY'
        },
        rangeOptionsLabels: {
          start: 'Calendarweek Start',
          end: 'Calendarweek End',
          close: 'OK'
        }
      }
    }
  }
})
Vue.use(Vuex)
const router = new Router({
  routes: [{
    path: '/',
    name: 'dummy',
    component: DummyRoute,
    meta: {
      title: 'DummyTitle'
    }
  }]
})

const store = new Vuex.Store({
  strict: false,
  modules: {
  }
})

Vue.use(Core4ui, {
  router,
  config: {
    THEME,
    TITLE: 'Starter',
    IGNORED_ERRORS: [],
    APP_IDENTIFIER: 'starter'
  },
  store
})
/*
Vue.use(PnbiBase, {
  router,
  config: {
    TITLE: 'DEMO'
  },
  store
}) */
