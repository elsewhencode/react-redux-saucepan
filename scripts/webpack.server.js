const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');

/* eslint-enable import/no-extraneous-dependencies */
const srcPath = path.resolve(__dirname, '../src/server');
const { ASSETS_PATH } = require('../config');

module.exports = {
  target: 'node',
  cache: false,
  context: srcPath,
  devtool: 'source-map',
  entry: {
    index: [
      // entry point of the app for serverside
      './index',
    ],
  },
  output: {
    filename: '[name].js',
    publicPath: ASSETS_PATH,
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
        test: /\.(eot|ttf|woff|woff2|otf)$/,
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
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          { loader: 'eslint-loader' },
          { loader: 'stylelint-custom-processor-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
    noParse: /\.min\.js/,
  },
  externals: nodeExternals(),
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.js', '.json'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    // check flow types on each compile
    new FlowWebpackPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: true,
      __DEVELOP__: false,
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.DefinePlugin({
      // Needed for reducing React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
