const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { publicDir } = require('../config.json');

const srcPath = path.resolve('./');

const entryPoints = {
  main: path.resolve(srcPath, 'src/main.js'),
  critical: path.resolve(srcPath, 'src/app/scss/critical.scss'),
};

const outputPath = path.resolve(srcPath, publicDir);

const resolvedModules = [
  srcPath,
  path.resolve(srcPath, 'src'),
  path.resolve(srcPath, 'src/app'),
  path.resolve(srcPath, 'node_modules'),
];

module.exports = {
  mode: process.env.NODE_ENV,

  entry: entryPoints,

  output: {
    filename: 'bundle/[name].js',
    chunkFilename: '[name].[id].lazy.js',
    path: outputPath,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './build',
              },
            },
          },
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
        exclude: /node_modules/,
      },

      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          esModule: false,
          spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`,
        },
      },

      {
        test: /\.svg$/,
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

      {
        test: /\.(ttf|woff2|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts',
          publicPath: '/fonts/',
        },
      },
    ],
  },

  resolve: {
    modules: resolvedModules,
    extensions: ['*', '.js', '.vue', '.json'],
  },

  devtool: '#eval-source-map',

  plugins: [
    new VueLoaderPlugin(),

    new CopyWebpackPlugin([
      { from: './config.json', to: '' },
    ]),

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
      excludeAssets: [/.js/, /.css/],
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),

    new HtmlWebpackExcludeAssetsPlugin(),

    new SpriteLoaderPlugin(),
  ],
};
