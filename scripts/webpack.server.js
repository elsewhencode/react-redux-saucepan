const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(__dirname, '../dist');
const { ASSETS_PATH } = require('../config');

module.exports = {
  target: 'node',
  cache: false,
  context: srcPath,
  devtool: 'source-map',
  entry: {
    index: [
      // entry point of the app
      './src/server/index',
    ],
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: ASSETS_PATH,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] }),
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
        use: [{ loader: 'eslint-loader' }, { loader: 'stylelint-custom-processor-loader' }],
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
    extensions: ['.json', '.js'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: true,
      __DEV__: false,
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
