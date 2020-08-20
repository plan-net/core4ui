import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import de from 'vuetify/lib/locale/de'
import en from 'vuetify/lib/locale/en'
Vue.use(Vuetify)

let vuetify

export function getVuetify (theme) {
  if (vuetify != null) {
    return vuetify
  }
  /*   const light = {}
  const dark = {}
  Object.keys(theme).forEach(val => {
    light[val] = theme[val]
    dark[val] = theme[val]
  }) */
  const v = new Vuetify({
    /*     icons: {
      iconfont: 'mdi'
    }, */
    lang: {
      locales: {
        en, de
      },
      current: 'en'
    },
    theme: {
      options: {
        customProperties: true,
        minifyTheme: function (css) {
          return process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css
        }
      }
      /*       themes: {
        light,
        dark
      } */
    }
  })
  vuetify = v
  console.log(v)
  return v
}
