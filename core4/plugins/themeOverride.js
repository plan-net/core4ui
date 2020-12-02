import { axiosInternal } from 'core4ui/core4/internal/axios.config.js'
import _ from 'lodash'

export function applyTheme (conf) {
  this.$Loading.config(conf)
  axiosInternal.interceptors.response.use(
    response => {
      console.log(response)
      try {
        const tester = response.config.baseURL + response.config.url
        console.log(tester)
        if (tester.includes('core4/api/v1/store')) {
          // custom theme
          response.data.data.doc.theme = _.merge(response.data.data.doc.theme, conf.theme)
        }
      } catch (err) {}
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )
}
