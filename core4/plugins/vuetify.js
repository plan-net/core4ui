import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
      },
      dark: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
      }
    }
  }
  // theme: options.config.THEME,
  // iconfont: 'md',
/*   options: {
    customProperties: true, // color: var(--v-primary-base)
    // themeVariations: ['primary', 'accent', 'secondary', 'warning']
    themeVariations: ['primary', 'accent', 'secondary', 'warning' ]
  } */
})
export function getVuetify (theme) {
  const light = {}
  const dark = {}
  Object.keys(theme).forEach(val => {
    light[val] = theme[val]
    dark[val] = theme[val]
  })
  return new Vuetify({
    icons: {
      iconfont: 'md'
    },
    theme: {
      options: {
        customProperties: true,
        minifyTheme: function (css) {
          return process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css
        }
      },
      themes: {
        light,
        dark
      }
    }
  })
}
