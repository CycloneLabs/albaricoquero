const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const { publicDir } = require(path.resolve(__dirname, 'config.json'));

module.exports = {
  mode: process.env.NODE_ENV,

  entry: {
    bundle: './js/main.js',
  },

  output: {
    filename: 'bundle/[name].js',
    chunkFilename: '[name].[id].lazy.js',
    path: path.resolve(__dirname, publicDir),
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },

      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          {
            use: ['raw-loader', 'pug-plain-loader']
          },
        ],
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpg|svg|ttf)$/,
        loader: 'url-loader',
      },
    ]
  },

  resolve: {
    modules: [__dirname, 'node_modules', __dirname + '/component'],
    extensions: ['*', '.js', '.vue', '.json']
  },

  devServer: {
    index: 'index.html',
    contentBase: publicDir,
    noInfo: true,
    overlay: false,
    historyApiFallback: true,
  },

  devtool: '#eval-source-map',

  plugins: [
    new VueLoaderPlugin(),

    new CopyWebpackPlugin([
      { from: 'image', to: 'image' },
      { from: 'root', to: '' },
    ]),

    new CleanWebpackPlugin(path.resolve(__dirname, publicDir)),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './view/index.pug',
      excludeAssets: [/.js/],
    }),

    new HtmlWebpackExcludeAssetsPlugin(),

    new ExtraneousFileCleanupPlugin({
      extensions: ['.js'],
      paths: ['/bundle'],
    }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  module.exports.module.rules = [
    {
      enforce: 'pre',
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-pug-lint-loader',
      options: require('./.pug-lintrc.js'),
    },
    {
      enforce: 'pre',
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        fix: true,
        formater: require('eslint-friendly-formatter'),
      }
    }
  ].concat(module.exports.module.rules || []);

   module.exports.plugins = (module.exports.plugins || []).concat([
    new StyleLintPlugin({
      files: ['**/*.vue'],
      fix: true,
    }),
  ]);
} else {
  module.exports.devtool = '#source-map';
  module.exports.optimization = {
    minimize: true,
  };
}
