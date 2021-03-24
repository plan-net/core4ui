import axios from 'axios'

export default {
  get (url, params = {}) {
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
  },
  download (url, reset = 0) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user == null) {
      return null
    }
    return window.open(
      `${url}?download=1&reset=${reset | 0}&token=${user.token}`,
      '_self',
      ''
    )
  }
}
