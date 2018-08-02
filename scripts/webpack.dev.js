const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const FlowWebpackPlugin = require('flow-webpack-plugin');
/* eslint-enable import/no-extraneous-dependencies */
const { ASSETS_PATH } = require('./../config');

const srcPath = path.resolve(__dirname, '../src/client');
const buildPath = path.resolve(__dirname, '../dist');

module.exports = {
  context: srcPath,
  target: 'web',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    // the entry point of our app
    './index.jsx',
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
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 'style-loader' only in dev mode
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{ loader: 'eslint-loader' }, { loader: 'stylelint-custom-processor-loader' }],
      },
      // babel
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: true, // default is true. But jus a reminder that .babelrc is in use
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // Dev mode doesnt do SSR, so __CLIENT_ is always true
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: false,
      __DEVELOP__: true,
    }),
    // enable HMR
    new webpack.HotModuleReplacementPlugin(),
    // check flow types on each compile
    new FlowWebpackPlugin(),

    // new ExtractTextPlugin('app.css'),
  ],
};
