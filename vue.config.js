const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    devtool: 'eval',
    module: {
      rules: [
        // ... other rules omitted
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                // enable CSS Modules
                modules: true,
                // customize generated class names
                localIdentName: '[local]_[hash:base64:8]',
              },
            },
          ],
        },
      ],
    },
  },
  pluginOptions: {},
});
