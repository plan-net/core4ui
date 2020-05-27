import Vue from 'vue'

export default {
  show (err, vm, info) {
    // err: error trace
    // vm: component in which error occurred
    // info: Vue specific error information such as lifecycle hooks, events etc.

    if (err.isAxiosError) {
      if (Vue.prototype.$store.getters.loading) {
        Vue.prototype.$store.dispatch('setLoading', false)
      }

      switch (err.response.status){
        case '503':
        // error will be handled by 502 case, because missed break instruction
        case '502':

          break
        case '400':

          break
        case '401':
          Vue.prototype.$store.dispatch('gotoLogin')
          break
        case '403':

          break
        case '404':

          break
        case '409':

          break
        default:
          // cases: 4xx, 5xx, 500, 405, 406
          const mail = `<a href="mailto:${Vue.prototype.$store.getters.contact}">${Vue.prototype.$store.getters.contact}</a>`

          const dto = { status_code: err.response.status }

          if (err.json != null) {
            dto.json = err.json
          } else {
            dto.html = `${Vue.prototype.i18n.t('httpErrors.500.default')} ${mail}`
          }

          Vue.prototype.$store.dispatch('showError', dto)
      }
    }
  }
}
