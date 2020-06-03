import Vue from 'vue'

function i18n (code, name='default') {
  const defaultError = Vue.prototype.i18n.t('errors.default')

  try {
    const translate = Vue.prototype.i18n.t(`errors.${code}.${name}`)
    return translate.includes('undefined') ? defaultError : translate
  } catch (e) {
    return defaultError
  }
}

function payload (err, actions, close=false, html=`${i18n()}`) {
  let payload = {
    error: err,
    status_code: err.response.status,
    actions: actions,
    close: close
  }

  if (err.json != null) {
    payload.json = err.json
  } else {
    payload.html = html
  }

  return payload
}



export default {
  show (err, vm, info) {
    // err: error trace
    // vm: component in which error occurred
    // info: Vue specific error information such as lifecycle hooks, events etc.

    if (err.isAxiosError) {
      if (Vue.prototype.$store.getters.loading) {
        Vue.prototype.$store.dispatch('setLoading', false)
      }

      let actions = []

      if (err.response && err.response.status) {
        switch (err.response.status){
          case 503:
          // error will be handled by 502 case, because missed break instruction
          case 502:
            actions.push(
              {
                main: false,
                name: Vue.prototype.i18n.t('reloadPage'),
                action () {
                  Vue.$router.go().catch(() => {
                    location.reload()
                  })
                }
              },
              {
                main: true,
                name: Vue.prototype.i18n.t('toTheMainPage'),
                action () {
                  Vue.$router.push({path: '/'}).catch(() => {
                    window.location.assign('/')
                  })
                }
              }
            )

            Vue.prototype.$store.dispatch('showError', payload(err, actions, false, `${i18n('502')}`))
            break
          case 400:
            Vue.prototype.$store.dispatch('showError', payload(err, actions, true, `${i18n('400')}`))
            break
          case 401:
            Vue.prototype.$store.dispatch('gotoLogin')
            break
          case 403:
            actions.push(
              {
                main: false,
                name: Vue.prototype.i18n.t('contact'),
                action () {
                  window.location.href = `mailto:${Vue.prototype.$store.getters.contact}`
                }
              },
              {
                main: true,
                name: Vue.prototype.i18n.t('toTheMainPage'),
                action () {
                  Vue.$router.push({path: '/'}).catch(() => {
                    window.location.assign('/')
                  })
                }
              }
            )

            Vue.prototype.$store.dispatch('showError', payload(err, actions, true, `${i18n('403')}`))
            break
          case 404:
            Vue.$router.push('notfound')
            break
          case 409:
            actions.push(
              {
                main: false,
                name: Vue.prototype.i18n.t('reloadPage'),
                action () {
                  Vue.$router.go().catch(() => {
                    location.reload()
                  })
                }
              },
              {
                main: true,
                name: Vue.prototype.i18n.t('toTheMainPage'),
                action () {
                  Vue.$router.push({path: '/'}).catch(() => {
                    window.location.assign('/')
                  })
                }
              }
            )

            Vue.prototype.$store.dispatch('showError', payload(err, actions, false, `${i18n('409')}`))

            break
          default:
            // cases: 4xx, 5xx, 500, 405, 406
            // mail = `<a href="mailto:${Vue.prototype.$store.getters.contact}">${Vue.prototype.$store.getters.contact}</a>`
            actions.push(
              {
                main: false,
                name: Vue.prototype.i18n.t('contact'),
                action () {
                  window.location.href = `mailto:${Vue.prototype.$store.getters.contact}`
                }
              },
              {
                main: true,
                name: Vue.prototype.i18n.t('toTheMainPage'),
                action () {
                  Vue.$router.push({path: '/'}).catch(() => {
                    window.location.assign('/')
                  })
                }
              }
            )

            Vue.prototype.$store.dispatch('showError', payload(err, actions))
        }
      } else {
        if (!navigator.onLine) {
          // No internet connection
          actions.push(
            {
              main: true,
              name: Vue.prototype.i18n.t('checkConnectivity'),
              action () {
                Vue.prototype.$store.dispatch('setLoading', true)

                setTimeout(() => {
                  if (navigator.onLine) {
                    Vue.prototype.$store.dispatch('hideError')
                  }

                  Vue.prototype.$store.dispatch('setLoading', false)
                }, 2000)
              }
            }
          )

          Vue.prototype.$store.dispatch('showError', payload(err, actions, false, `${i18n('networkError', 'noInternet')}`))
        } else {
          actions.push(
            {
              main: false,
              name: Vue.prototype.i18n.t('contact'),
              action () {
                window.location.href = `mailto:${Vue.prototype.$store.getters.contact}`
              }
            },
            {
              main: true,
              name: Vue.prototype.i18n.t('toTheMainPage'),
              action () {
                Vue.$router.push({path: '/'}).catch(() => {
                  window.location.assign('/')
                })
              }
            }
          )

          Vue.prototype.$store.dispatch('showError', payload(err, actions, true, `${i18n('networkError')}`))
        }
      }
    }
  }
}
