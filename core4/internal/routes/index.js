import Iframe from './iframe/Iframe'
import PageNotFound from './p404/PageNotFound'

const authPages = ['/login', '/forgot', '/reset']

const publicPages = ['/imprint', '/privacy']

let $router = {
  instance: null,
  publicPages: authPages.concat(publicPages)
}

export function setRoutes (router) {
  router.addRoutes([
    {
      path: '/content/:type',
      name: 'content',
      component: Iframe,
      meta: {
        auth: false,
        hideNav: false
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: PageNotFound,
      meta: {
        auth: false,
        hideNav: false
      }
    }
  ])
  function removeURLParameter (url, parameter) {
    // prefer to use l.search if you have a location/link object
    var urlparts = url.split('?')
    if (urlparts.length >= 2) {
      var prefix = encodeURIComponent(parameter) + '='
      var pars = urlparts[1].split(/[&;]/g)

      // reverse iteration as may be destructive
      for (var i = pars.length; i-- > 0;) {
        // idiom for string.startsWith
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1)
        }
      }

      return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
    }
    return url
  }
  router.beforeEach((to, from, next) => {
    // Wenn token in der url update localstorage user und remove token + h
    let url
    const token = new URLSearchParams(window.location.search).get('token')
    if (token != null) {
      window.localStorage.setItem('user', JSON.stringify({ token: token }))
      url = removeURLParameter(window.location.href, 'token')
      url = removeURLParameter(url, 'h')
      window.location.href = url
    } else {
      next()
    }
  })
  $router.instance = router
}

export default $router
