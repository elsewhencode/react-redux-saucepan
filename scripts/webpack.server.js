const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
/* eslint-enable import/no-extraneous-dependencies */
const srcPath = path.resolve(__dirname, '../src/server');
const { ASSETS_PATH } = require('../config');
const manifest = require('../dist/manifest.json');

module.exports = {
  target: 'node',
  cache: false,
  context: srcPath,
  devtool: 'source-map',
  mode: 'production',
  entry: {
    index: [
      // entry point of the app for server-side
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
        // This plugin should be used only on production
        // builds without style-loader in the loaders chain
        use: ['css-loader/locals'],
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
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [{ loader: 'eslint-loader' }, { loader: 'stylelint-custom-processor-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false, // .babelrc takes only one target.
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            [
              '@babel/plugin-transform-runtime',
              {
                polyfill: false,
                regenerator: true,
              },
            ],
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current',
                },
              },
            ],
            '@babel/preset-flow',
            '@babel/preset-react',
          ],
        },
      },
    ],
    noParse: /\.min\.js/,
  },
  externals: nodeExternals(),
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },

  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'app.[chunkhash].css',
    // }),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: true,
      __DEVELOP__: false,
      __ASSETS__: JSON.stringify(manifest),
    }),

    new webpack.DefinePlugin({
      // Needed for reducing React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
