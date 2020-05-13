/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',

  devtool: '#source-map',

  stats: {
    modules: false,
  },

  plugins: [
    new CleanWebpackPlugin(),

    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      compressionOptions: {
        level: 6,
      },
      threshold: 8192,
    }),

    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: [
          'default',
          { calc: false },
        ],
      },
    }),
  ],

  optimization: {
    minimize: true,
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
});
