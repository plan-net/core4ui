import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import de from 'vuetify/lib/locale/de'
import en from 'vuetify/lib/locale/en'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

let vuetify

export function getVuetify (theme) {
  if (vuetify != null) {
    return vuetify
  }
  const v = new Vuetify({
    icons: {
      iconfont: 'mdi' // default - only for display purposes
    },
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
  return v
}
