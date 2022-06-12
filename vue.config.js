const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    devtool: 'eval',
  },
});
