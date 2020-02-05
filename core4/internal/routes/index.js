import Login from './auth/Login'
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'
import AuthWrap from './auth/AuthWrap'
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
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false,
        hideNav: true
      }
    },
    {
      path: '/reset/',
      component: AuthWrap,
      children: [
        {
          path: '',
          component: Forgot,
          meta: {
            auth: false,
            hideNav: true
          }
        },
        {
          path: ':token',
          component: Reset,
          meta: {
            auth: false,
            hideNav: true
          },
          beforeEnter: (to, from, next) => {
            // loads password strength dependency, 800kb
            const loader = (a, b, c, d) => {
              a = '//cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js'
              b = document
              c = 'script'
              d = b.createElement(c)
              d.src = a
              d.type = 'text/java' + c
              d.async = true
              a = b.getElementsByTagName(c)[0]
              a.parentNode.insertBefore(d, a)
            }
            loader()
            next()
          }
        }
      ]
    },
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
  router.beforeEach((to, from, next) => {
    /*     const meta = to.meta || {
      auth: true
    } */
    /* !$router.publicPages.includes(to.path) */
    let loggedIn = window.localStorage.getItem('user')
    if (!loggedIn) {
      const token = new URLSearchParams(window.location.search).get('token')
      history.replaceState &&
        history.replaceState(
          null,
          '',
          location.pathname +
            location.search.replace(/[\?&]token=[^&]+/, '').replace(/^&/, '?') +
            location.hash
        )
      if (token != null) {
        window.localStorage.setItem('user', JSON.stringify({ token: token }))
        loggedIn = true
      }
    }
    /*     if (meta.auth && !loggedIn) {
      return next('/login')
    } */
    next()
  })
  $router.instance = router
}

export default $router
