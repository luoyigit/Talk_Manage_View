const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    port: 8888,
    open: true,
    proxy: {
      '/proxy': {
        target: ' http://localhost:8888/',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/assets/style/variable/index.scss";
          `,
      },
    },
    extract: false,
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('services', resolve('src/services'))
      .set('packages', resolve('src/packages'))
      .set('mixins', resolve('src/mixins'))
      .set('model', resolve('src/model'))
      .set('utils', resolve('src/utils'))
      .set('components', resolve('src/components'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('style', resolve('src/style'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      .set('directive', resolve('src/directive'))
      .set('layout', resolve('src/layout'))
      .set('viewModel',resolve('src/services/models'))
  },
}
