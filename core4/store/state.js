import Auth from '../Auth'
import bus from '../event-bus.js'
import router from '../internal/routes/index.js'
import { axiosInternal } from '../internal/axios.config.js'
import { getVuetify } from '../plugins/vuetify'
export function inIframe () {
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}
const state = {
  loading: false,
  title: 'CORE4OS',
  dark: false,
  inWidget: false,
  appBarVisible: true,
  menu: [],
  version: '',
  contact: '@',
  logo: {
    light: 'data:image/svg+xml;base64,',
    dark: false
  },
  theme: {
    primary: '#AC2A41',
    accent: '#0D2D5B',
    secondary: '#000000',
    error: '#EC583E',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  profile: {
    error: null,
    authenticated: false,
    name: null,
    realname: null,
    email: null
  }
}

const actions = {
  setApplicationLogo ({ commit }, logo) {
    const light = logo.light
    const dark = logo.dark || false
    commit('set_app_logo', { light, dark })
  },
  setC4Theme ({ commit }, theme) {
    let light = {}
    let dark = {}
    if (theme.light == null) {
      Object.keys(theme).forEach(val => {
        light[val] = theme[val]
        dark[val] = theme[val]
      })
    } else {
      light = theme.light
      dark = theme.dark
    }
    getVuetify().framework.theme.themes.light = light
    getVuetify().framework.theme.themes.dark = dark
  },
  showNotification ({ commit }, payload) {
    bus.$emit('SHOW_NOTIFICATION', payload)
  },
  async fetchProfile ({ commit, dispatch, state }) {
    const profile = await Auth.profile()
    const dto = {
      authenticated: true,
      name: profile.name,
      realname: profile.realname,
      email: profile.email,
      perm: profile.perm,
      role: profile.role,
      avatar: '//cdn.vuetifyjs.com/images/john.jpg'
    }
    commit('set_profile', dto)
    return dto
  },
  fetchSettings ({ commit, dispatch, state }) {
    console.warn('fetchSettings is deprected')
    dispatch('initC4App')
  },
  async initC4App ({ commit, dispatch, state }) {
    const setting = await Auth.setting()
    commit('set_menu', setting.data.menu)
    commit('set_profile', { authenticated: true })
    if (state.hasOwnTheme === false) {
      commit('set_dark', setting.data.dark)
    }
    commit('set_contact', setting.data.contact)

    const version = await Auth.version()
    commit('set_version', version)
    return true
  },
  async gotoStart ({ commit, dispatch }) {
    router.instance.push('/')
    commit('set_profile', { authenticated: true })
    await dispatch('initC4App')
  },
  gotoMainPage () {
    router.instance.push('/').catch(() => {
      window.location.assign('/')
    })
  },
  reloadCurrentPage () {
    router.instance.go().catch(() => {
      location.reload()
    })
  },
  gotoNotFoundPage () {
    router.instance.push({ name: 'notfound' })
  },
  gotoLogin ({ commit }) {
    window.localStorage.clear()
    commit('clear_profile')
    window.setTimeout(() => {
      window.location.assign('/core4/api/v1/login')
    }, 200)
  },
  logout ({ dispatch }) {
    Auth.logout()
      .then(function () {
        dispatch('gotoLogin')
      })
      .catch(err => {
        dispatch('gotoLogin')
        return Promise.reject(err)
      })
  },
  setLoading ({ commit }, payload) {
    commit('set_loading', payload)
  },
  setTitle ({ commit }, payload) {
    commit('set_title', payload)
  },
  initializeApp ({ commit, dispatch }, payload) {
    dispatch('setTitle', payload.TITLE)
    if (payload.DARK != null) {
      commit('set_dark', payload.DARK)
      // state.hasOwnTheme = true // do not show theme switch
    }
  },
  setWidgetTitle ({ commit, dispatch }, payload) {
    commit('set_title', payload)
  },
  resetWidgetTitle ({ commit, dispatch }, payload) {
    commit('set_title', payload)
  },
  setInWidget ({ commit, dispatch }, payload) {
    commit('set_in_widget', true)
  },
  resetInWidget ({ commit, dispatch }) {
    commit('set_in_widget', false)
  },
  showAppbar ({ commit, dispatch }) {
    commit('show_appbar')
  },
  hideAppbar ({ commit, dispatch }) {
    commit('hide_appbar')
  },
  toggleDark ({ commit, getters }, forceVariant = null) {
    let dark
    if (forceVariant != null) {
      dark = forceVariant === 'dark'
    } else {
      dark = !getters.dark
    }
    commit('set_dark', dark)
    return axiosInternal
      .post('/setting/_general', { data: { dark } })
      .then(() => {})
      .catch(error => Promise.reject(error))
  }
}

const mutations = {
  set_app_logo (state, logo) {
    state.logo.light = logo.light
    state.logo.dark = logo.dark
  },
  set_contact (state, payload) {
    state.contact = payload
  },
  set_menu (state, payload) {
    state.menu = payload
  },
  set_version (state, payload) {
    state.version = payload
  },
  set_in_widget (state, payload) {
    state.inWidget = payload
  },
  set_dark (state, dark) {
    if (dark != null) {
      getVuetify().framework.theme.dark = dark
      state.dark = dark
    }
  },
  set_profile (state, payload) {
    state.profile = Object.assign({}, state.profile, payload)
  },
  clear_profile (state, payload) {
    state.profile = {
      authenticated: false,
      name: null
    }
  },
  set_loading (state, payload) {
    state.loading = payload
  },
  show_appbar (state) {
    state.appBarVisible = true
  },
  hide_appbar (state) {
    state.appBarVisible = false
  },
  set_title (state, payload) {
    state.title = payload
    document.title = payload
    document.querySelector('body').classList.add(
      payload
        .toLowerCase()
        .split(' ')
        .join('-')
    )
  },
  initialize_app (state, payload) {
    state.title = payload.title
  }
}

const getters = {
  logo (state) {
    if (state.dark && state.logo.dark !== false) {
      return state.logo.dark
    }
    return state.logo.light
  },
  contact (state) {
    return state.contact
  },
  profile (state) {
    return state.profile
  },
  authenticated (state) {
    return state.profile.authenticated
  },
  loading (state) {
    return state.loading
  },
  inWidget (state) {
    return state.inWidget
  },
  appBarVisible (state) {
    return state.appBarVisible
  },
  title (state) {
    return state.title
  },
  dark (state) {
    return state.dark
  },
  version (state) {
    return state.version
  },
  isAccentLightColor (state) {
    const dark = state.dark
    const color = getVuetify().framework.theme.themes[dark ? 'dark' : 'light'].accent
    const hex = color.replace('#', '')
    const cr = parseInt(hex.substr(0, 2), 16)
    const cg = parseInt(hex.substr(2, 2), 16)
    const cb = parseInt(hex.substr(4, 2), 16)
    const brightness = ((cr * 299) + (cg * 587) + (cb * 114)) / 1000
    return brightness > 155
  },
  menu (state) {
    const debug = process.env.NODE_ENV !== 'production'
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user == null) {
      return [
        {
          path: '',
          label: ''
        }
      ]
    }
    return (state.menu || []).map(item => {
      const path = debug ? 'http://0.0.0.0:5001' : ''
      const label = Object.keys(item)[0]
      return {
        path: `${path}${item[label]}?token=${user.token}`,
        label
      }
    }).filter(val => val.label.toLowerCase() !== 'profile')
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
