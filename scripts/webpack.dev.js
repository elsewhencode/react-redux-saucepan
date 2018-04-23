const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 

const { ASSETS_PATH } = require('../config');

const buildPath = path.resolve(__dirname, '../dist');
const srcPath = path.resolve(__dirname, '../src');

module.exports = {
  context: srcPath,
  target: 'web',
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    // the entry point of our app
    './client/index.js',
  ],
  output: {
    filename: 'app.js',
    // the output bundle
    path: buildPath,
    publicPath: ASSETS_PATH,
    // necessary for HMR to know where to load the hot update chunks
    pathinfo: true,
  },
  resolve: {
    extensions: ['json', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] }),
      },
      // Font Definitions
      {
        test: /\.(ttf|otf|woff|eot|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      // eslint checking before processed by babel
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [{ loader: 'eslint-loader' }, { loader: 'stylelint-custom-processor-loader' }],
        exclude: /node_modules/,
      },
      // babel
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: false,
      __DEV__: true,
    }),
    new ExtractTextPlugin('app.css'),
  ],
};
