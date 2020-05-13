/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const pugLintConfig = require('./.pug-lintrc.js');

module.exports = {
  target: 'web',

  devtool: '#eval-source-map',

  entry: {
    main: path.resolve('src/index/index.ts'),
  },

  output: {
    filename: '[name].js',
    chunkFilename: 'js/[name].[id].bundle.js',
    path: path.resolve('dist'),
    globalObject: 'this',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'ts-loader',
          },
          esModule: true,
        },
      },

      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          {
            use: ['pug-loader'],
          },
        ],
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
      },

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },

      {
        test: /\.(svg)$/,
        loader: 'url-loader',
        include: [path.resolve('node_modules')],
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              esModule: false,
              spriteFilename: (svgPath) => `sprite${svgPath.substr(-4)}`,
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  convertStyleToAttrs: true,
                  removeEmptyAttrs: true,
                  removeUselessStrokeAndFill: true,
                },
              ],
            },
          },
        ],
      },

      {
        test: /\.(png|ttf|woff2|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      },

      {
        enforce: 'pre',
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-pug-lint-loader',
        options: pugLintConfig,
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

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, './..'), 'src', 'src/index'],
    extensions: ['*', '.js', '.ts', '.vue', '.json'],
  },

  plugins: [
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index/index.pug',
    }),

    new StyleLintPlugin({
      files: ['**/*.vue', '**/*.scss'],
      fix: true,
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),

    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
  ],
};
