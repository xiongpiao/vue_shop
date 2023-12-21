const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    open: true,
    client:{
      webSocketURL:'ws://192.168.52.155:8080/ws'
    },
    proxy: {
      '/API': {
        target: 'http://localhost:8081',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          ['^/API']: ''
        },
        ws: false
      },
    },
  },
  transpileDependencies: true
})

