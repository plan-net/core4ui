import axios from 'axios'

export default {
  get (url, params = {}) {
    console.info('it works')
    const user = JSON.parse(localStorage.getItem('user'))
    if (user == null) {
      return {
        token: -1
      }
    }
    return axios
      .post(`${url}?token=${user.token}`, Object.assign(params, {}))
      .then((val) => {
        return val.data
      })
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  },
  download (url, reset = 0) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user == null) {
      return null
    }
    return window.open(
      `${process.env.VUE_APP_APIBASE_APP}${url}?token=${
        user.token
      }&download=1&reset=${reset | 0}`,
      '_self',
      ''
    )
  }
}
