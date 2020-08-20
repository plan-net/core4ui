import axios from 'axios'
import Vue from 'vue'

export const axiosInternal = axios.create({
  baseURL: process.env.VUE_APP_APIBASE_CORE || window.APIBASE_CORE
})

axios.defaults.baseURL = process.env.VUE_APP_APIBASE_APP || window.APIBASE_APP

export function setAjaxConfig (config) {
  const instances = [axios, axiosInternal]
  instances.forEach(axiosInstance => {
    axiosInstance.interceptors.response.use(
      response => {
        return response.data
      },
      error => {
        const errorCode = error.response.status
        if (errorCode === 401) {
          Vue.prototype.$store.dispatch('gotoLogin')
        }
        return Promise.reject(error)
      }
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
