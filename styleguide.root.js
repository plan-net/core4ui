export default previewComponent => {
  // https://vuejs.org/v2/guide/render-function.html
  return {
    render (createElement) {
      // v-app to support vuetify plugin
      return createElement(
        'v-app',
        {
          props: {
            id: 'v-app'
          }
        },
        [createElement(previewComponent)]
      )
    }
  }
}
