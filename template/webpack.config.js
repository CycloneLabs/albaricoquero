const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const config = require(__dirname + '/config.json');

module.exports = {
  entry: {
    bundle: './js/main.js',
    style: './scss/style.scss',
  },

  output: {
    filename: 'bundle/[name].js',
    path: path.resolve(__dirname, config.publicDir),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        })
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: [
            {
              test: /\.css$/,
              use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
            },
            {
              test: /\.scss$/,
              use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
          ]
        }
      },

      {
        test: /\.pug$/,
        loader: 'pug-loader',
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
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  devServer: {
    index: 'index.html',
    contentBase: config.publicDir,
    noInfo: true,
    overlay: false,
    historyApiFallback: true,
  },

  devtool: '#eval-source-map',

  plugins: [
    new CopyWebpackPlugin([
      {from: 'image', to: 'image'},
      {from: 'root', to: ''},
    ]),

    new CleanWebpackPlugin(path.resolve(__dirname, config.publicDir)),

    new HtmlWebpackExcludeAssetsPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './view/index.pug',
      apiUrl: `'${config.apiUrl}'`,
      excludeAssets: [/.js/, /.css/],
    }),

    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './view/login.pug',
      apiUrl: `'${config.apiUrl}'`,
      excludeAssets: [/.js/, /.css/],
    }),

    new ExtraneousFileCleanupPlugin({
      extensions: ['.js'],
      paths: ['/bundle'],
    }),

    new ExtractTextPlugin('bundle/[name].css')
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ])
} else {
  module.exports.module.rules = (module.exports.module.rules || []).concat([
    {
      enforce: "pre",
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
      options: {
        formater: require('eslint-friendly-formatter'),
      }
    }
  ])
}
