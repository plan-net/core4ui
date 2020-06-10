import axios from 'axios'
import router from './routes/index.js'
import Vue from 'vue'

export const axiosInternal = axios.create({
  baseURL: process.env.VUE_APP_APIBASE_CORE || window.APIBASE_CORE
})

axios.defaults.baseURL = process.env.VUE_APP_APIBASE_APP || window.APIBASE_APP

export function setAjaxConfig (config) {
  // helpers
  // const ingnoredErrors = config.IGNORED_ERRORS || []

  // function isErrorIgnoreRoute () {
  //   // remove additions to path from route name eg: /reset/dfbskjhdfgkjsd
  //   let path = router.instance.history.current.path.substring(1)
  //   path = '/' + path.substring(0, path.lastIndexOf('/'))
  //   return router.publicPages.includes(path)
  // }
  // function isIgnoredError (error) {
  //   // app can defined errors which willl be handled by app
  //   let val = false
  //   try {
  //     val = ingnoredErrors.includes(error.response.status)
  //   } catch (err) {
  //
  //   }
  //   return val
  // }
  //
  // function isErrorCode (error, type) {
  //   return error.response.status === type
  // }

  // AXIOS //
  // used in c4ui client
  // used internally by Auth.js because Auth Path is different then api above
  const instances = [axios, axiosInternal]
  instances.forEach(axiosInstance => {
    axiosInstance.defaults.headers.common['Accept'] = 'application/json'

    axiosInstance.interceptors.response.use(
      response => {
        return response.data
      }
      // error => {
      //   // 401 - unauthorized
      //   if (isErrorCode(error, 401)) {
      //     const shouldRedirectToLogin = isErrorIgnoreRoute() === false
      //
      //     if (shouldRedirectToLogin) {
      //       Vue.prototype.$store.dispatch('gotoLogin')
      //     }
      //   }
      //
      //   return Promise.reject(error)
      // }
    )

    axiosInstance.interceptors.request.use(
      request => {
        if (request.url.includes('/login') === false) {
          const user = JSON.parse(window.localStorage.getItem('user'))
          if (user != null) {
            request.headers.Authorization = `Bearer ${user.token}`
          }
        }
        return request
      },
      error => {
        return Promise.reject(error)
      }
    )
  })
}
