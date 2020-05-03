module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.externals({
      ...config.externals,
      uws: 'uws'
    })
  }
}
