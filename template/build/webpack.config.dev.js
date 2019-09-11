const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const common = require('./webpack.config.common');
const pugLinterConfig = require('./pug.lint.config.js');
const { publicDir } = require('../config.json');

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    index: 'index.html',
    contentBase: publicDir,
    noInfo: true,
    overlay: false,
    historyApiFallback: true,
    hot: true,
    open: true,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-pug-lint-loader',
        options: pugLinterConfig,
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
    ],
  },
  plugins: [
    new StyleLintPlugin({
      files: ['**/*.vue', '**/*.scss'],
      fix: true,
      configFile: './build/stylelint.config.json',
    }),
  ],
});
