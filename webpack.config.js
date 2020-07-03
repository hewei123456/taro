module.exports = config => {
  config.resolve = {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
      '@components': require('path').resolve(__dirname, 'src/components'),
      '@utils': require('path').resolve(__dirname, 'src/utils'),
      '@request': require('path').resolve(__dirname, 'src/request'),
      '@store': require('path').resolve(__dirname, 'src/store'),
      '@static': require('path').resolve(__dirname, 'src/static')
    }
  }
  return config
}
