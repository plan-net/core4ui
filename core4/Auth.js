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
          short: result.data.realname
        })
        return this.$profile
      })
  },
  async setting () {
    return axiosInternal
      .get('/setting/_general')
      .then(result => {
        return result
      })
  },
  logout () {
    this.$profile = null
    return axiosInternal
      .get('/logout')
      .then(result => {
        return result.data
      })
  },
  store () {
    return axiosInternal
      .put('/store')
      .then(result => {
        return result.data
      })
  },
  checkAvatar () {
    return axiosInternal
      .get('/avatar')
  }
}
