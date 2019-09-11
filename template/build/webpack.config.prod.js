const { ProgressPlugin } = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'production',

  devtool: '#source-map',

  optimization: {
    minimize: true,
  },

  plugins: [
    new ProgressPlugin(),
  ],

  stats: {
    modules: false,
  },
});
