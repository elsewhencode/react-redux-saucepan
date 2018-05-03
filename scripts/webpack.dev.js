const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');
/* eslint-enable import/no-extraneous-dependencies */
const { ASSETS_PATH } = require('./../src/config');

const srcPath = path.resolve(__dirname, '../src/client');
const buildPath = path.resolve(__dirname, '../dist');

module.exports = {
  context: srcPath,
  target: 'web',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    // the entry point of our app
    './index.js',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
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
        use: [
          { loader: 'eslint-loader' },
          { loader: 'stylelint-custom-processor-loader' },
        ],
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
    // enable HMR
    new webpack.HotModuleReplacementPlugin(),
    // check flow types on each compile
    new FlowWebpackPlugin(),

    // Dev mode doesnt do SSR, so __CLIENT_ is always true
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: false,
      __DEVELOP__: true,
    }),

    new ExtractTextPlugin('app.css'),
  ],
};
