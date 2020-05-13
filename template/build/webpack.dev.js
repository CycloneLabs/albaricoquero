/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common');

const config = merge(commonConfig, {
  mode: 'development',

  watch: true,

  devServer: {
    index: 'index.html',
    contentBase: path.resolve('dist'),
    hot: true,
    open: true,
    noInfo: true,
    overlay: false,
    historyApiFallback: true,
  },
});

const cssHmrConfig = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};

module.exports = merge.smart(config, cssHmrConfig);
