import Vue from 'vue'

function i18n (code, name = 'default') {
  const defaultError = Vue.prototype.i18n.t('errors.default')
  try {
    const translate = Vue.prototype.i18n.t(`errors.${code}.${name}`)
    return translate.includes('undefined') ? defaultError : translate
  } catch (e) {
    return defaultError
  }
}

function payload (err, actions, html, customErrorContentHtml) {
  let payload = {
    error: err,
    actions: actions, //checkForEmail(actions, customErrorContentHtml || ''),
    close: true,
    customErrorContentHtml
  }
  if (err.json != null) {
    payload.json = err.json
  } else {
    payload.html = html || `${i18n()}`
  }

  return payload
}

const actions = {
  '502' (htmlContent) {
    return [
      {
        main: false,
        name: Vue.prototype.i18n.t('reloadPage'),
        action () {
          Vue.prototype.$store.dispatch('reloadCurrentPage')
        },
      },
    ]
  },
  '400' (htmlContent) {
    return []
  },
  '403' (errContent) {
    return [
      {
        main: false,
        name: Vue.prototype.i18n.t('contact'),
        action () {
          window.location.href = `mailto:${Vue.prototype.$store.getters.contact}?body=${errContent}&subject=ApplicationError`
        },
      },
    ]
  },
  '404' (errContent) {
    return [
      {
        main: false,
        name: Vue.prototype.i18n.t('contact'),
        action () {
          window.location.href = `mailto:${Vue.prototype.$store.getters.contact}?body=${errContent}&subject=ApplicationError`
        },
      },
    ]
  },
  '409' () {
    return [
      {
        main: true,
        name: Vue.prototype.i18n.t('reloadPage'),
        action () {
          Vue.prototype.$store.dispatch('reloadCurrentPage')
        },
      },
    ]
  },
  noInternet () {
    const action = {
      main: true,
      name: Vue.prototype.i18n.t('checkConnectivity'),
      timer: 0,
      action () {
        if (action.timer) clearTimeout(action.timer)

        Vue.prototype.$store.dispatch('setLoading', true)

        action.timer = setTimeout(() => {
          if (navigator.onLine) {
            Vue.prototype.$store.dispatch('hideError')
          }
          Vue.prototype.$store.dispatch('setLoading', false)
        }, 2000)
      },
    }
    return [action]
  },
  default (errContent) {
    //const body = `${encodeURIComponent(htmlContent || '')}`
    return [
      {
        main: false,
        name: Vue.prototype.i18n.t('contact'),
        action () {
          window.location.href = `mailto:${Vue.prototype.$store.getters.contact}?body=${errContent}&subject=ApplicationError`
        },
      },
    ]
  },
}
/*window.addEventListener('offline', function(event){
  Vue.prototype.$store.dispatch(
    'showError',
    payload(
      new Error('No internet connection.'),
      actions['noInternet'](),
      `${i18n('networkError', 'noInternet')}`
    )
  )
});*/
// Check if currently offline
import { check, watch } from 'is-offline';
let onOffCallback = bool => {
  if (bool) {
    Vue.prototype.$store.dispatch(
      'showError',
      payload(
        new Error('No internet connection.'),
        actions['noInternet'](),
        `${i18n('networkError', 'noInternet')}`
      )
    )
  } else {
    Vue.prototype.$store.dispatch('hideError')
  }
};
check().then(onOffCallback);
// Setup a "watcher" to respond to all online/offline changes
let unwatch = watch(onOffCallback);

// The "watcher" will be active until it's deactivated
// unwatch();
export default {
  show (err, vm, info) {
    // err: error trace
    // vm: component in which error occurred
    // info: Vue specific error information such as lifecycle hooks, events etc.

    // ToDo: find a solution for differentiating regular errors from our errors
    // Somehow axios error equals to InternalError. In this case "instanceof" check can't be used
    // if (err instanceof EvalError) {console.log(err)}
    // if (err instanceof RangeError) {console.log(err)}
    // if (err instanceof ReferenceError) {console.log(err)}
    // if (err instanceof SyntaxError) {console.log(err)}
    // if (err instanceof TypeError) {console.log(err)}
    // if (err instanceof URIError) {console.log(err)}
    // if (err instanceof InternalError ) {console.log(err)}

    // All of axios error can be differentiate by isAxiosError build in prop
    if (err.isAxiosError) {
      if (Vue.prototype.$store.getters.loading) {
        Vue.prototype.$store.dispatch('setLoading', false)
      }
      const isHTML = (str) => {
        var doc = new DOMParser().parseFromString(str, 'text/html')
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1)
      }
      const getMarkers = str => {
        const markers = {
          start: '(',
          end: ')',
        }
        if (str.includes('[[') && str.includes(']]')) {
          return {
            start: '[[',
            end: ']]',
          }
        }
        return {
          start: '(',
          end: ')',
        }
      }
      const getHtmlToRender = (str, ignoreHTML = false) => {
        const markers = getMarkers(str)
        const start = str.indexOf(markers.start) + 2
        const end = str.indexOf(markers.end)
        if (start >= 0 && end >= 2) {
          let extracted = str.substring(start, end)
          if (ignoreHTML) {
            extracted = `<span>${extracted}</span>`
          }
          const isValidHtml = isHTML(extracted)
          if (isValidHtml) { // message doesnt contain html, but anyway
            return extracted
          }
        }
        return null

      }

      if (err.response) {
        let errorContentShort = 'Error'
        try {
          errorContentShort = JSON.stringify(err.response.data.error).substring(0, 1799) + '...'
        }catch(err){

        }
        const errorCode = err.response.status.toString()
        const htmlContent = getHtmlToRender(err.response.data.error, err.response.renderWithoutHTML)
        switch (errorCode) {
          case '503':
          // error will be handled by 502 case, because missed "break" instruction
          case '502':
            Vue.prototype.$store.dispatch(
              'showError',
              payload(err, actions[errorCode](htmlContent), `${i18n(errorCode)}`, htmlContent)
            )
            break
          case '400':
            Vue.prototype.$store.dispatch(
              'showError',
              payload(err, actions[errorCode](htmlContent), `${i18n(errorCode)}`, htmlContent)
            )
            break
          case '401':
            Vue.prototype.$store.dispatch('gotoLogin')
            break
          case '403':
            Vue.prototype.$store.dispatch(
              'showError',
              payload(err, actions[errorCode](errorContentShort), `${i18n(errorCode)}`, htmlContent)
            )
            break
          case '404':
            //Vue.prototype.$store.dispatch("gotoNotFoundPage");
            Vue.prototype.$store.dispatch(
              'showError',
              payload(err, actions[errorCode](errorContentShort), `${i18n(errorCode)}`, htmlContent)
            )
            break
          case '409':
            Vue.prototype.$store.dispatch(
              'showError',
              payload(err, actions[errorCode](htmlContent), `${i18n(errorCode)}`, htmlContent)
            )
            break
          default:
            // cases: 4xx, 5xx, 500, 405, 406
            // mail = `<a href="mailto:${Vue.prototype.$store.getters.contact}">${Vue.prototype.$store.getters.contact}</a>`
            const errorText = `${i18n()}`.replace('<email>', Vue.prototype.$store.getters.contact)

            Vue.prototype.$store.dispatch(
              'showError',
              payload(err, actions['default'](errorContentShort), errorText, htmlContent)
            )
        }
      } else {
        if (!navigator.onLine) {
          // no internet connection
          Vue.prototype.$store.dispatch(
            'showError',
            payload(
              err,
              actions['noInternet'](htmlContent),
              `${i18n('networkError', 'noInternet')}`
            )
          )
        } else {
          // all of possible not xhr errors
          Vue.prototype.$store.dispatch(
            'showError',
            payload(err, actions['default'](htmlContent), `${i18n('networkError')}`)
          )
        }
      }
    }
  }
}
