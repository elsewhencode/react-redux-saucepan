const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');

/* eslint-enable import/no-extraneous-dependencies */
const { ASSETS_PATH } = require('../config');

const srcPath = path.resolve(__dirname, '../src/client');

module.exports = {
  context: srcPath,
  target: 'web',
  entry: {
    app: ['./index.js'],
  },
  output: {
    filename: 'app.js',
    publicPath: ASSETS_PATH,
  },
  resolve: {
    extensions: ['.js', '.json'],
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
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    // check flow types on each compile
    new FlowWebpackPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: true,
      __DEV__: false,
    }),
    // Any dev code which is 'develop' will be considered as dead code and will be eliminated
    new webpack.DefinePlugin({
      // <-- key to reducing React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin('app.css'),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new ManifestPlugin(),
  ],
};
