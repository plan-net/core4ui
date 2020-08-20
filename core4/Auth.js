import { axiosInternal } from './internal/axios.config.js'
export default {

  async profile () {
    if (this.$profile != null) {
      return Promise.resolve(this.$profile)
    }
    return axiosInternal
      .get('/profile')
      .then(result => {
        this.$profile = Object.assign(result.data, {
          short: result.data.realname// iHelper.shortName(result.data.realname)
        })
        return this.$profile
      })
      .catch(error => {
        throw new Error(`ApiService ${error}`)
      })
  },
  async version () {
    if (window.__VERSION__ != null) {
      return window.__VERSION__
    }
    return 'No version set.'
    /*     return axios
      .get('/_info?version')
      .then(result => {
        return result
      })
      .catch(error => {
        throw new Error(`ApiService ${error}`)
      })  */
  },
  async setting () {
    return axiosInternal
      .get('/setting/_general')
      .then(result => {
        return result
      })
      .catch(error => {
        throw new Error(`ApiService ${error}`)
      })
  },
  logout () {
    this.$profile = null
    return axiosInternal
      .get('/logout')
      .then(result => {
        return result.data
      })
      .catch(error => Promise.reject(error))
  }
}
