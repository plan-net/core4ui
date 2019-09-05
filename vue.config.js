// vue.config.js
const path = require('path')
module.exports = {
  assetsDir: 'assets',
  lintOnSave: true,
  publicPath: './',
  devServer: {
    port: 8081
  },
  productionSourceMap: false,
  css: {
    extract: false
  },
  chainWebpack: config => {
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: 'assets/[name].css',
        chunkFilename: 'assets/[name].css'
      }])
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'core4ui': path.resolve(__dirname, '.')
      }
    },
    output: {
      filename: 'assets/[name].js',
      chunkFilename: 'assets/[name].js'
    }
  }
}
