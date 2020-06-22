module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.externals({
      ...config.externals,
      uws: 'uws'
    })
  },
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV === 'development'
}
